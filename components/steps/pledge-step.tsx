"use client"

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { PLEDGES } from "@/lib/constants"

interface PledgeStepProps {
  selectedPledges: number[]
  onTogglePledge: (index: number) => void
  onSelectAll: () => void
  onNext: () => void
  currentIndex: number
  setCurrentIndex: (index: number) => void
}

export function PledgeStep({
  selectedPledges,
  onTogglePledge,
  onSelectAll,
  onNext,
  currentIndex,
  setCurrentIndex,
}: PledgeStepProps) {
  const getVisiblePledges = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 1 // Mobile: 1 card
      if (window.innerWidth < 768) return 2 // Small tablet: 2 cards
      if (window.innerWidth < 1024) return 3 // Tablet: 3 cards
      if (window.innerWidth < 1280) return 4 // Desktop: 4 cards
      return 5 // Large desktop: 5 cards
    }
    return 3 // Default fallback
  }

  const visiblePledges = getVisiblePledges()
  const maxIndex = Math.max(0, PLEDGES.length - visiblePledges)

  const nextPledge = () => {
    setCurrentIndex(Math.min(currentIndex + 1, maxIndex))
  }

  const prevPledge = () => {
    setCurrentIndex(Math.max(currentIndex - 1, 0))
  }

  return (
    <div className="text-center max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Choose your Pledge</h2>
        <span className="text-base sm:text-lg text-gray-500">{selectedPledges.length}/10</span>
      </div>

      <div className="relative mb-8 sm:mb-12">
        <button
          onClick={prevPledge}
          disabled={currentIndex === 0}
          className="absolute left-0 sm:left-2 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all duration-200"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
        </button>

        <div className="overflow-hidden mx-10 sm:mx-12 lg:mx-16">
          <div
            className="flex transition-transform duration-300 ease-in-out gap-2 sm:gap-3 lg:gap-4"
            style={{ transform: `translateX(-${currentIndex * (100 / visiblePledges)}%)` }}
          >
            {PLEDGES.map((pledge, index) => (
              <div key={index} className="flex-shrink-0 px-1 sm:px-2" style={{ width: `${100 / visiblePledges}%` }}>
                <div
                  onClick={() => onTogglePledge(index)}
                  className="relative cursor-pointer group transform transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <div
                    className={cn(
                      "aspect-[3/4] sm:aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg transition-all duration-200 group-hover:shadow-xl",
                      "bg-gradient-to-br relative",
                      pledge.theme,
                    )}
                  >
                    <img
                      src={pledge.image || "/placeholder.svg"}
                      alt={pledge.title}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/10"></div>

                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                      <div
                        className={cn(
                          "w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 transition-all duration-200 flex items-center justify-center",
                          selectedPledges.includes(index)
                            ? "bg-green-500 border-green-500 scale-110"
                            : "bg-white/30 border-white/60 backdrop-blur-sm",
                        )}
                      >
                        {selectedPledges.includes(index) && (
                          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full"></div>
                        )}
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 sm:p-4">
                      <h3 className="text-white font-semibold text-xs sm:text-sm text-left leading-tight">
                        {pledge.title}
                      </h3>
                      <p className="text-white/80 text-xs sm:text-xs text-left mt-0.5 sm:mt-1 line-clamp-2">
                        {pledge.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={nextPledge}
          disabled={currentIndex >= maxIndex}
          className="absolute right-0 sm:right-2 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all duration-200"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
        </button>
      </div>

      <div className="flex flex-col items-center mb-6 sm:mb-8">
        <button
          onClick={onNext}
          disabled={selectedPledges.length === 0}
          className="w-14 h-14 sm:w-16 sm:h-16 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 mb-3 sm:mb-4 active:scale-95"
        >
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </button>
        <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 px-4 text-center">
          Click on the button to choose your pledge
        </p>

        <button
          onClick={onSelectAll}
          className="bg-gray-800 hover:bg-gray-900 text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 active:scale-95"
        >
          Select All
        </button>

        <div className="mt-3 sm:mt-4 text-center px-4">
          <p className="text-gray-500 text-xs sm:text-sm">You can choose multiple pledges</p>
          <p className="text-gray-600 text-xs sm:text-sm mt-1">Selected Pledges: {selectedPledges.length} out of 10</p>
        </div>
      </div>

      <div className="text-xs text-gray-500 mt-6 sm:mt-8 text-center px-4 leading-relaxed">
        ©RAJGIR ZOO SAFARI. Bihar Sarkar. All Rights Reserved. Design and developed by Fillip Technologies & Polardot.in
      </div>
    </div>
  )
}
