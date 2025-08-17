"use client"

import { ArrowRight, RotateCcw, Camera } from "lucide-react"
import { useRef, useCallback, useState, useEffect } from "react"
import Webcam from "react-webcam"

interface CameraStepProps {
  capturedImage: string | null
  onCapture: (imageSrc: string) => void
  onRetake: () => void
  onNext: () => void
}

export function CameraStep({ capturedImage, onCapture, onRetake, onNext }: CameraStepProps) {
  const webcamRef = useRef<Webcam>(null)
  const [isCameraReady, setIsCameraReady] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [isSupported, setIsSupported] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    if (typeof navigator === "undefined" ||
      !navigator.mediaDevices ||
      typeof navigator.mediaDevices.getUserMedia !== "function") {
      setIsSupported(false)
      setCameraError("Camera is not supported in this browser.")
    }
  }, [])

  const handleCameraReady = useCallback(() => {
    setIsCameraReady(true)
    setCameraError(null)
  }, [])

  const handleCameraError = useCallback((error: string | DOMException) => {
    console.error("Camera error:", error)
    setCameraError("Unable to access camera. Please check permissions.")
    setIsCameraReady(false)
  }, [])

  const handleCapture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot()
      if (imageSrc) {
        onCapture(imageSrc)
      }
    }
  }, [onCapture])

  const handleRetake = useCallback(() => {
    onRetake()
    setIsCameraReady(true)
  }, [onRetake])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        <div className="relative mb-8">
          <div className="relative w-full aspect-[4/3] bg-black rounded-3xl overflow-hidden shadow-2xl">
            {(capturedImage || cameraError) && (
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={handleRetake}
                  className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-200"
                >
                  <RotateCcw className="w-5 h-5 text-white" />
                </button>
                <p className="text-white text-xs text-center mt-1">Retake</p>
              </div>
            )}


            {!capturedImage && !cameraError && isSupported && isClient && (
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                screenshotQuality={0.8}
                videoConstraints={{
                  width: { ideal: 1280 },
                  height: { ideal: 720 },
                  facingMode: "user",
                }}
                onUserMedia={handleCameraReady}
                onUserMediaError={handleCameraError}
                className="w-full h-full object-cover"
                style={{ transform: "scaleX(-1)" }}
              />
            )}

            {capturedImage && (
              <img
                src={capturedImage || "/placeholder.svg"}
                alt="Captured"
                className="w-full h-full object-cover"
                style={{ transform: "scaleX(-1)" }}
              />
            )}

            {cameraError && (
              <div className="w-full h-full flex items-center justify-center bg-gray-900">
                <div className="text-center text-white p-8">
                  <Camera className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2">{isSupported ? "Camera Access Required" : "Camera Not Supported"}</h3>
                  <p className="text-gray-300 mb-4">{cameraError}</p>
                  {isSupported && (
                    <button
                      onClick={() => window.location.reload()}
                      className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white transition-colors"
                    >
                      Try Again
                    </button>
                  )}
                </div>
              </div>
            )}

            {!isCameraReady && !capturedImage && !cameraError && isSupported && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                <div className="text-center text-white">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                  <p>Initializing camera...</p>
                </div>
              </div>
            )}
          </div>

          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 z-10">
            <button
              onClick={capturedImage ? onNext : handleCapture}
              disabled={!isCameraReady && !capturedImage}
              className="w-16 h-16 bg-green-500 hover:bg-green-600 disabled:bg-gray-500 disabled:cursor-not-allowed rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 border-4 border-white"
            >
              {capturedImage ? (
                <ArrowRight className="w-6 h-6 text-white" />
              ) : (
                <Camera className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>

        <div className="text-center mt-12 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {capturedImage ? "Perfect! Ready to Continue?" : "Smile! Your Photo Will Be Clicked Automatically"}
          </h2>
          <p className="text-gray-600 text-sm">
            {capturedImage
              ? "Your photo looks great! Click next to continue or retake if you'd like another shot."
              : "Stay still, look into the camera, and let the magic happen."}
          </p>
        </div>

        <div className="text-xs text-gray-500 text-center">
          ©RAJGIR ZOO SAFARI. Bihar Sarkar. All Rights Reserved. Design and developed by Fillip Technologies &
          Polardot.in
        </div>
      </div>
    </div>
  )
}
