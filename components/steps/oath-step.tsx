"use client"

import { ArrowRight } from "lucide-react"

interface OathStepProps {
  onNext: () => void
}

export function OathStep({ onNext }: OathStepProps) {
  return (
    <div className="text-center max-w-4xl mx-auto relative">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Let's take an oath</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-6">Oath for Sustainability & Conservation.</h3>

        <div className="max-w-2xl mx-auto text-gray-600 leading-relaxed mb-12 text-base">
          <p>
            I pledge to respect and protect the rich biodiversity of our zoo safari. I will act responsibly, minimize
            waste, and support eco-friendly practices. I commit to conserving wildlife, safeguarding habitats, and
            inspiring others to cherish and protect nature for future generations.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center mb-12">
        <button
          onClick={onNext}
          className="w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 mb-4"
        >
          <ArrowRight className="w-6 h-6 text-white" />
        </button>
        <p className="text-gray-600 text-sm">Click on the button to choose your pledge</p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between w-full max-w-4xl mx-auto mt-16">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">O</span>
          </div>
          <div className="flex items-baseline">
            <span className="text-lg font-bold text-teal-600">GREEN</span>
            <span className="text-lg font-bold text-green-500 ml-1">OATH</span>
          </div>
          <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center">
            <div className="text-xs text-center font-semibold text-gray-700">
              <div>RAJGIR</div>
              <div>ZOO SAFARI</div>
            </div>
          </div>
          <div className="w-16 h-12 bg-gray-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">Nature Safari</span>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500 mt-4 text-center">
        ©RAJGIR ZOO SAFARI. Bihar Sarkar. All Rights Reserved. Design and developed by Fillip Technologies & Polardot.in
      </div>
    </div>
  )
}
