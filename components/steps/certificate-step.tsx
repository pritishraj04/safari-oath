"use client"

import { CheckCircle, Download, Share2, ArrowLeft, X } from "lucide-react"
import { PLEDGES } from "@/lib/constants"
import { useState } from "react"

interface CertificateStepProps {
  selectedPledges: number[]
  capturedImage: string | null
  onRestart: () => void
}

export function CertificateStep({ selectedPledges, capturedImage, onRestart }: CertificateStepProps) {
  const [showDownloadModal, setShowDownloadModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)

  const downloadPledgeCard = async (pledgeIndex: number) => {
    const pledge = PLEDGES[pledgeIndex]
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    if (!ctx) return

    // Set canvas dimensions
    canvas.width = 400
    canvas.height = 600

    try {
      // Load pledge background image
      const pledgeImg = new Image()
      pledgeImg.crossOrigin = "anonymous"

      await new Promise((resolve, reject) => {
        pledgeImg.onload = resolve
        pledgeImg.onerror = reject
        pledgeImg.src = pledge.image || "/placeholder.svg"
      })

      // Draw pledge background
      ctx.drawImage(pledgeImg, 0, 0, canvas.width, canvas.height)

      // Add user photo if available
      if (capturedImage) {
        const userImg = new Image()
        userImg.crossOrigin = "anonymous"

        await new Promise((resolve, reject) => {
          userImg.onload = resolve
          userImg.onerror = reject
          userImg.src = capturedImage
        })

        // Draw user photo as a circle in top-left corner
        const photoSize = 80
        const photoX = 20
        const photoY = 20

        ctx.save()
        ctx.beginPath()
        ctx.arc(photoX + photoSize / 2, photoY + photoSize / 2, photoSize / 2, 0, Math.PI * 2)
        ctx.clip()
        ctx.drawImage(userImg, photoX, photoY, photoSize, photoSize)
        ctx.restore()

        // Add white border around photo
        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = 4
        ctx.beginPath()
        ctx.arc(photoX + photoSize / 2, photoY + photoSize / 2, photoSize / 2, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Add pledge title at bottom
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
      ctx.fillRect(0, canvas.height - 100, canvas.width, 100)

      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 24px Arial"
      ctx.textAlign = "center"
      ctx.fillText(pledge.title, canvas.width / 2, canvas.height - 60)

      // Add Green Oath branding
      ctx.font = "16px Arial"
      ctx.fillText("Green Oath Certificate", canvas.width / 2, canvas.height - 30)

      // Download the image
      const link = document.createElement("a")
      link.download = `green-oath-${pledge.title.toLowerCase().replace(/\s+/g, "-")}.png`
      link.href = canvas.toDataURL()
      link.click()
    } catch (error) {
      console.error("Error generating pledge card:", error)
    }
  }

  const sharePledgeCard = async (pledgeIndex: number) => {
    const pledge = PLEDGES[pledgeIndex]

    if (navigator.share) {
      try {
        await navigator.share({
          title: `My ${pledge.title} Pledge`,
          text: `I've committed to ${pledge.title} as part of my Green Oath for environmental conservation!`,
          url: window.location.href,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      const shareText = `I've committed to ${pledge.title} as part of my Green Oath for environmental conservation! ${window.location.href}`
      navigator.clipboard.writeText(shareText)
      alert("Share link copied to clipboard!")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mr-4">
              <span className="text-white font-bold text-xl">O</span>
            </div>
            <div>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-teal-600">GREEN</span>
                <span className="text-3xl font-bold text-green-500 ml-1">OATH</span>
              </div>
              <p className="text-sm text-gray-600 text-left">One promise, a lifetime of nature</p>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-4">Congratulations!</h1>
          <p className="text-lg text-gray-600 mb-2">You've completed your conservation journey</p>

          {capturedImage && (
            <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-4 border-green-200 shadow-lg">
              <img src={capturedImage || "/placeholder.svg"} alt="Your photo" className="w-full h-full object-cover" />
            </div>
          )}

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 inline-block">
            <h2 className="text-xl font-bold text-green-800 mb-2">Conservation Certificate</h2>
            <p className="text-green-600 text-sm mb-2">
              {selectedPledges.length} Pledge{selectedPledges.length !== 1 ? "s" : ""} Completed
            </p>
            <p className="text-xs text-gray-500">Issued by Rajgir Zoo Safari • {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Individual Pledge Achievement Displays */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {selectedPledges.map((pledgeIndex) => {
            const pledge = PLEDGES[pledgeIndex]

            return (
              <div key={pledgeIndex} className="relative group">
                {/* Full PNG Card */}
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  <img
                    src={pledge.image || "/placeholder.svg"}
                    alt={pledge.title}
                    className="w-full h-80 object-cover"
                  />

                  {/* Minimal overlay with just the title */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4">
                    <h3 className="text-white font-semibold text-lg mb-1">{pledge.title}</h3>
                  </div>

                  {/* Achievement checkmark */}
                  <div className="absolute top-4 right-4">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={() => setShowDownloadModal(true)}
            className="flex items-center justify-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-medium transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Certificate
          </button>

          <button
            onClick={() => setShowShareModal(true)}
            className="flex items-center justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-medium transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share Achievement
          </button>

          <button
            onClick={onRestart}
            className="flex items-center justify-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-full font-medium transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Take Another Oath
          </button>
        </div>

        {/* Footer */}
        <div className="text-xs text-gray-500 text-center">
          ©RAJGIR ZOO SAFARI. Bihar Sarkar. All Rights Reserved. Design and developed by Fillip Technologies &
          Polardot.in
        </div>
      </div>

      {showDownloadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Download Pledge Cards</h3>
                <button
                  onClick={() => setShowDownloadModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-gray-600 mb-6 text-sm">
                Download individual pledge cards with your photo as PNG images.
              </p>

              <div className="space-y-3">
                {selectedPledges.map((pledgeIndex) => {
                  const pledge = PLEDGES[pledgeIndex]
                  return (
                    <div key={pledgeIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <img
                          src={pledge.image || "/placeholder.svg"}
                          alt={pledge.title}
                          className="w-12 h-12 rounded-lg object-cover mr-3"
                        />
                        <div>
                          <h4 className="font-medium text-gray-800 text-sm">{pledge.title}</h4>
                          <p className="text-xs text-gray-500">PNG Card</p>
                        </div>
                      </div>
                      <button
                        onClick={() => downloadPledgeCard(pledgeIndex)}
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Share Your Pledges</h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-gray-600 mb-6 text-sm">
                Share your environmental commitments with friends and family.
              </p>

              <div className="space-y-3">
                {selectedPledges.map((pledgeIndex) => {
                  const pledge = PLEDGES[pledgeIndex]
                  return (
                    <div key={pledgeIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <img
                          src={pledge.image || "/placeholder.svg"}
                          alt={pledge.title}
                          className="w-12 h-12 rounded-lg object-cover mr-3"
                        />
                        <div>
                          <h4 className="font-medium text-gray-800 text-sm">{pledge.title}</h4>
                          <p className="text-xs text-gray-500">Environmental Pledge</p>
                        </div>
                      </div>
                      <button
                        onClick={() => sharePledgeCard(pledgeIndex)}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
