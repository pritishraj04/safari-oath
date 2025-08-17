"use client"

import { X } from "lucide-react"

interface KnowMorePopupProps {
  isOpen: boolean
  onClose: () => void
}

export function KnowMorePopup({ isOpen, onClose }: KnowMorePopupProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full mx-4 p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">About Green Oath</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <div className="space-y-4 text-gray-600">
          <p>
            Green Oath is a conservation initiative by Rajgir Zoo Safari that empowers visitors to make meaningful
            environmental commitments.
          </p>

          <p>
            Through our interactive pledge system, you can choose from various conservation actions and receive a
            personalized certificate celebrating your commitment to protecting our planet.
          </p>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">Our Mission</h4>
            <p className="text-green-700 text-sm">
              To inspire and enable individuals to take concrete actions for environmental conservation, creating a
              community of nature guardians committed to preserving biodiversity for future generations.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-full transition-colors duration-200"
        >
          Start Your Journey
        </button>
      </div>
    </div>
  )
}
