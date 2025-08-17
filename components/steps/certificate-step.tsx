"use client"

import { CheckCircle, Download, Share2, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { PLEDGES, getAchievementContent } from "@/lib/constants"

interface CertificateStepProps {
  selectedPledges: number[]
  capturedImage: string | null
  onRestart: () => void
}

export function CertificateStep({ selectedPledges, capturedImage, onRestart }: CertificateStepProps) {
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
        <div className="space-y-8 mb-12">
          {selectedPledges.map((pledgeIndex, index) => {
            const pledge = PLEDGES[pledgeIndex]
            const achievement = getAchievementContent(pledgeIndex)

            return (
              <div
                key={pledgeIndex}
                className="relative overflow-hidden rounded-3xl shadow-xl transform hover:scale-[1.02] transition-all duration-300"
              >
                {/* Background with pledge theme */}
                <div className={cn("absolute inset-0 bg-gradient-to-br", achievement.color)}>
                  <div className="absolute inset-0 bg-black/5"></div>
                  {/* Decorative elements */}
                  <div className="absolute top-8 right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-8 left-8 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
                </div>

                <div className="relative z-10 p-8 flex items-center">
                  {/* Achievement Icon */}
                  <div className="flex-shrink-0 mr-8">
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30 shadow-lg">
                      <span className="text-4xl">{achievement.icon}</span>
                    </div>
                  </div>

                  {/* Achievement Content */}
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <span className="bg-white/20 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1 rounded-full border border-white/30">
                        {achievement.badge}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-800 mb-1">{achievement.title}</h3>
                    <p className="text-lg text-gray-700 mb-3 font-medium">{achievement.subtitle}</p>
                    <p className="text-gray-600 mb-4 leading-relaxed">{achievement.message}</p>

                    <div className="flex items-center space-x-6">
                      <div className="bg-white/30 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/40">
                        <p className="text-sm font-semibold text-gray-800">Impact</p>
                        <p className="text-xs text-gray-700">{achievement.impact}</p>
                      </div>

                      <div className="bg-white/30 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/40">
                        <p className="text-sm font-semibold text-gray-800">Pledge #{index + 1}</p>
                        <p className="text-xs text-gray-700">{pledge.title}</p>
                      </div>
                    </div>
                  </div>

                  {/* Achievement Badge */}
                  <div className="flex-shrink-0 ml-8">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button className="flex items-center justify-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-medium transition-all duration-200 hover:scale-105 shadow-lg">
            <Download className="w-5 h-5 mr-2" />
            Download Certificate
          </button>

          <button className="flex items-center justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-medium transition-all duration-200 hover:scale-105 shadow-lg">
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
    </div>
  )
}
