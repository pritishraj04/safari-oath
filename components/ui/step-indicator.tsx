import { cn } from "@/lib/utils"

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center space-x-8 mb-12">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <div key={step} className="flex items-center">
          <span
            className={cn(
              "text-sm font-medium transition-colors duration-200",
              step === currentStep
                ? "text-gray-800 font-semibold"
                : step < currentStep
                  ? "text-gray-600"
                  : "text-gray-400",
            )}
          >
            step{step}
          </span>
          {step < totalSteps && <div className="w-16 h-px bg-gray-300 ml-8"></div>}
        </div>
      ))}
    </div>
  )
}
