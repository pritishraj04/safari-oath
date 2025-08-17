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
  const visiblePledges = 5
  const maxIndex = Math.max(0, PLEDGES.length - visiblePledges)

  const nextPledge = () => {
    setCurrentIndex(Math.min(currentIndex + 1, maxIndex))
  }

  const prevPledge = () => {
    setCurrentIndex(Math.max(currentIndex - 1, 0))
  }

  return (
    <div className="text-center max-w-6xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Choose your Pledge</h2>
        <span className="text-lg text-gray-500">{selectedPledges.length}/10</span>
      </div>

      <div className="relative mb-12">
        <button
          onClick={prevPledge}
          disabled={currentIndex === 0}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all duration-200"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>

        <div className="overflow-hidden mx-12">
          <div
            className="flex transition-transform duration-300 ease-in-out gap-4"
            style={{ transform: `translateX(-${currentIndex * (100 / visiblePledges)}%)` }}
          >
            {PLEDGES.map((pledge, index) => (
              <div key={index} className="flex-shrink-0 px-2" style={{ width: `${100 / visiblePledges}%` }}>
                <div
                  onClick={() => onTogglePledge(index)}
                  className="relative cursor-pointer group transform transition-all duration-200 hover:scale-105"
                >
                  <div
                    className={cn(
                      "aspect-[4/5] rounded-2xl overflow-hidden shadow-lg transition-all duration-200 group-hover:shadow-xl",
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

                    <div className="absolute top-4 right-4">
                      <div
                        className={cn(
                          "w-7 h-7 rounded-full border-2 transition-all duration-200 flex items-center justify-center",
                          selectedPledges.includes(index)
                            ? "bg-green-500 border-green-500 scale-110"
                            : "bg-white/30 border-white/60 backdrop-blur-sm",
                        )}
                      >
                        {selectedPledges.includes(index) && <div className="w-3 h-3 bg-white rounded-full"></div>}
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <h3 className="text-white font-semibold text-sm text-left">{pledge.title}</h3>
                      <p className="text-white/80 text-xs text-left mt-1">{pledge.description}</p>
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
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all duration-200"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="flex flex-col items-center mb-8">
        <button
          onClick={onNext}
          disabled={selectedPledges.length === 0}
          className="w-16 h-16 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 mb-4"
        >
          <ArrowRight className="w-6 h-6 text-white" />
        </button>
        <p className="text-gray-600 text-sm mb-4">Click on the button to choose your pledge</p>

        <button
          onClick={onSelectAll}
          className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-200"
        >
          Select All
        </button>

        <div className="mt-4 text-center">
          <p className="text-gray-500 text-sm">You can choose multiple pledges</p>
          <p className="text-gray-600 text-sm">Selected Pledges: {selectedPledges.length} out of 10</p>
        </div>
      </div>

      <div className="text-xs text-gray-500 mt-8 text-center">
        ©RAJGIR ZOO SAFARI. Bihar Sarkar. All Rights Reserved. Design and developed by Fillip Technologies & Polardot.in
      </div>
    </div>
  )
}
