"use client"

import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface WelcomeStepProps {
  onNext: () => void
  onShowKnowMore: () => void
}

export function WelcomeStep({ onNext, onShowKnowMore }: WelcomeStepProps) {
  const [imagesLoaded, setImagesLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setImagesLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="text-center max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-xl">O</span>
            </div>
            <div>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-teal-600">GREEN</span>
                <span className="text-2xl font-bold text-green-500 ml-1">OATH</span>
              </div>
              <p className="text-xs text-gray-600 text-left">One promise, a lifetime of nature</p>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-12">{"Let's do our bit. Let's save our Planet."}</h1>

      <div className="relative mb-12 h-80 flex items-center justify-center">
        {/* Air Card */}
        <div
          className={cn(
            "absolute transition-all duration-700 ease-out",
            imagesLoaded ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0",
          )}
        >
          <div className="w-64 h-72 bg-gradient-to-b from-blue-400 to-blue-600 rounded-3xl shadow-xl transform -rotate-12 translate-x-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-300 to-blue-500">
              <div className="absolute top-8 left-8 right-8">
                <div className="w-16 h-12 bg-white rounded-full opacity-80 mb-2"></div>
                <div className="w-12 h-8 bg-white rounded-full opacity-60 ml-8"></div>
                <div className="w-20 h-10 bg-white rounded-full opacity-70 ml-4 mt-2"></div>
              </div>
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-white font-bold text-lg mb-2">{"let's save"}</h3>
                <h3 className="text-white font-bold text-lg">our air</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Water Card */}
        <div
          className={cn(
            "absolute transition-all duration-700 ease-out delay-200 z-10",
            imagesLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          )}
        >
          <div className="w-64 h-72 bg-gradient-to-b from-teal-400 to-teal-600 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-teal-300 to-teal-500">
              <div className="absolute top-12 left-8 right-8">
                <div className="w-8 h-16 bg-green-600 rounded-t-full opacity-70"></div>
                <div className="w-6 h-12 bg-green-500 rounded-t-full ml-4 -mt-2 opacity-80"></div>
                <div className="w-10 h-20 bg-green-700 rounded-t-full ml-8 -mt-4 opacity-60"></div>
              </div>
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-white font-bold text-lg mb-2">{"let's save"}</h3>
                <h3 className="text-white font-bold text-lg">our water</h3>
                <h3 className="text-white font-bold text-lg">bodies</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Land Card */}
        <div
          className={cn(
            "absolute transition-all duration-700 ease-out delay-400",
            imagesLoaded ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0",
          )}
        >
          <div className="w-64 h-72 bg-gradient-to-b from-blue-800 to-blue-900 rounded-3xl shadow-xl transform rotate-12 -translate-x-8 relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-yellow-400 to-yellow-300"></div>
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-black rounded-full opacity-60"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-white font-bold text-lg mb-2">{"let's save"}</h3>
                <h3 className="text-white font-bold text-lg">our land</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <button
          onClick={onNext}
          className="w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 mb-4"
        >
          <ArrowRight className="w-6 h-6 text-white" />
        </button>
        <p className="text-gray-600 text-sm mb-4">Click on the button to take an oath</p>

        <button
          onClick={onShowKnowMore}
          className="text-gray-600 text-sm hover:text-gray-800 flex items-center justify-center border border-gray-300 px-4 py-2 rounded-full hover:bg-gray-50 transition-all duration-200 mb-8"
        >
          <span className="w-4 h-4 bg-gray-400 rounded-full mr-2"></span>
          Know More
        </button>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between w-full max-w-4xl mx-auto mt-8">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center mr-4">
            <div className="text-xs text-center">
              <div className="font-bold">RAJGIR</div>
              <div className="text-xs">ZOO SAFARI</div>
            </div>
          </div>
        </div>

        <div className="text-center flex-1"></div>

        <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">Nature Safari</span>
        </div>
      </div>

      <div className="text-xs text-gray-500 mt-4 text-center">
        ©RAJGIR ZOO SAFARI. Bihar Sarkar. All Rights Reserved. Design and developed by Fillip Technologies & Polardot.in
      </div>
    </div>
  )
}
