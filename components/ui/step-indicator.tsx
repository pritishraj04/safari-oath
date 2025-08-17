import { cn } from "@/lib/utils"

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="w-full max-w-md mx-auto mb-8 px-4">
      <div className="relative">
        <div className="absolute top-6 left-0 right-0 h-px bg-gray-300"></div>
        <div
          className="absolute top-6 left-0 h-px bg-gray-600 transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        ></div>

        <div className="flex items-center justify-between relative z-10">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
            <div key={step} className="flex flex-col items-center">
              <span
                className={cn(
                  "text-xs sm:text-sm font-medium transition-colors duration-200 whitespace-nowrap",
                  step === currentStep
                    ? "text-gray-800 font-semibold"
                    : step < currentStep
                      ? "text-gray-600"
                      : "text-gray-400",
                )}
              >
                step{step}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
