"use client"

import { useState } from "react"
import { StepIndicator } from "@/components/ui/step-indicator"
import { KnowMorePopup } from "@/components/ui/know-more-popup"
import { WelcomeStep } from "@/components/steps/welcome-step"
import { OathStep } from "@/components/steps/oath-step"
import { PledgeStep } from "@/components/steps/pledge-step"
import { CameraStep } from "@/components/steps/camera-step"
import { CertificateStep } from "@/components/steps/certificate-step"

export default function OathApp() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedPledges, setSelectedPledges] = useState<number[]>([])
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showKnowMorePopup, setShowKnowMorePopup] = useState(false)
  const [currentPledgeIndex, setCurrentPledgeIndex] = useState(0)

  const nextStep = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentStep((prev) => Math.min(prev + 1, 5))
      setIsAnimating(false)
    }, 150)
  }

  const prevStep = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentStep((prev) => Math.max(prev - 1, 1))
      setIsAnimating(false)
    }, 150)
  }

  const togglePledge = (index: number) => {
    setSelectedPledges((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const selectAllPledges = () => {
    setSelectedPledges(selectedPledges.length === 10 ? [] : Array.from({ length: 10 }, (_, i) => i))
  }

  const captureImage = (imageSrc: string) => {
    setCapturedImage(imageSrc)
  }

  const restartJourney = () => {
    setCurrentStep(1)
    setSelectedPledges([])
    setCapturedImage(null)
    setCurrentPledgeIndex(0)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Step Indicator - only show for steps 2-4 */}
        {currentStep >= 2 && currentStep <= 4 && <StepIndicator currentStep={currentStep} totalSteps={4} />}

        {/* Step Content */}
        <div className="transition-all duration-300 ease-in-out">
          {currentStep === 1 && <WelcomeStep onNext={nextStep} onShowKnowMore={() => setShowKnowMorePopup(true)} />}

          {currentStep === 2 && <OathStep onNext={nextStep} />}

          {currentStep === 3 && (
            <PledgeStep
              selectedPledges={selectedPledges}
              onTogglePledge={togglePledge}
              onSelectAll={selectAllPledges}
              onNext={nextStep}
              currentIndex={currentPledgeIndex}
              setCurrentIndex={setCurrentPledgeIndex}
            />
          )}

          {currentStep === 4 && (
            <CameraStep
              capturedImage={capturedImage}
              onCapture={captureImage}
              onRetake={() => setCapturedImage(null)}
              onNext={nextStep}
            />
          )}

          {currentStep === 5 && (
            <CertificateStep
              selectedPledges={selectedPledges}
              capturedImage={capturedImage}
              onRestart={restartJourney}
            />
          )}
        </div>

        {/* Know More Popup */}
        <KnowMorePopup isOpen={showKnowMorePopup} onClose={() => setShowKnowMorePopup(false)} />
      </div>
    </div>
  )
}
