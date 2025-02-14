"use client"

import { useState, useCallback, useEffect } from "react"
import Ripple from "@/components/ripple"
import { Modal } from "@/components/Modal"
import { TypingAnimation } from "@/components/magicui/typing-animation"
import { WordRotate } from "@/components/magicui/word-rotate"
import { HeartIcon } from "@heroicons/react/16/solid"
import { ConfettiButton } from "@/components/ConfettiButton"
import { ConfettiFireworks } from "@/components/ConfettiFireWorks"

const messages = [
  "Hola Mami...",
  "I've been thinking...",
  "About how lucky I am to have you...",
  "About all the moments we've shared...",
  "The days we laughed or argued, the way you understand me...",
  "You're my best friend, my partner, my everything...",
  "And I wouldn't trade Us for anything...",
  "So I wanted to ask...",
  "Will you be my",
]

// Array of timeout lengths (in milliseconds) for each message
const messageDelays = [4000, 3500, 3500, 4000, 8500, 6500, 5500, 4000, 3500, 5000] // Adjust these values as needed

export default function Home() {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [rejected, setRejected] = useState(false)

  const handleYes = useCallback(() => {
    setShowConfetti(true) // Show confetti and yayy.mp4
    setRejected(false) // Ensure rejected state is false
  }, [])

  const handleNo = useCallback(() => {
    setRejected(true) // Show ruin.mp4
    setShowConfetti(false) // Ensure confetti is hidden
  }, [])

  const handleRestart = useCallback(() => {
    setShowConfetti(false)
    setRejected(false)
    setCurrentMessage(0) // Reset to the first message
  }, [])

  const names = [
    "Valentine?",
    "Pookie?",
    "Baby Girl?",
    "Sugar Bankasa?",
    "Partner in Heist?",
    "Empress?",
    "Mi amor?",
    "Manchi?",
    "Better Half?",
    "Bunk-Coffin Mate?",
  ]

  useEffect(() => {
    if (currentMessage < messages.length - 1) {
      // Use the corresponding delay from the messageDelays array
      const timer = setTimeout(() => {
        setCurrentMessage(currentMessage + 1)
      }, messageDelays[currentMessage]) // Use the delay for the current message

      return () => clearTimeout(timer) // Cleanup the timer on component unmount
    }
  }, [currentMessage])

  return (
    <main className="relative flex grow w-full h-full flex-col items-center justify-center px-4 pb-12 overflow-clip">
      {/* Video Background */}
      {showConfetti && (
        <video
          autoPlay
          loop
          className="absolute inset-0 w-full h-full object-cover opacity-30 z-0 select-none pointer-events-none"
        >
          <source src="/videos/yayy.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {rejected && (
        <video
          autoPlay
          loop
          className="absolute inset-0 w-full h-full object-cover opacity-30 z-0 select-none pointer-events-none
          "
        >
          <source src="/videos/ruin.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      <Ripple />
      <HeartIcon className="w-24 h-24 mx-auto text-pink-500 animate-bounce sticky top-10" />
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <div className="text-center relative flex flex-col">
        {/* Render all messages up to the current one */}
        <div className="flex flex-col items-center justify-end">
          {messages.slice(0, currentMessage + 1).map((message, index) => {
            const isCurrent = index === currentMessage;
            const distanceFromCurrent = currentMessage - index;

            return (
              <div
                key={index}
                className={`transition-all ease-in-out duration-200 text-slate-700 select-none pointer-events-none ${isCurrent
                  ? "text-3xl sm:text-6xl font-bold "
                  : `text-${3 - index}xl sm:text-${4 - index}xl`
                  }`}
                style={{
                  transform: `translateY(${distanceFromCurrent * -6}px) scale(${1 - distanceFromCurrent * 0.1
                    })`,
                  opacity: 1 - distanceFromCurrent * 0.2,
                }}
              >
                {isCurrent && index === messages.length - 1 ? (
                  <div className="flex justify-center flex-wrap gap-3">
                    <TypingAnimation className="text-4xl sm:text-6xl break-words font-bold text-slate-700">
                      {message}
                    </TypingAnimation>
                    <WordRotate words={names} className={`text-4xl sm:text-6xl break-words font-bold text-pink-500`} />
                  </div>
                ) : (
                  <TypingAnimation>{message}</TypingAnimation>
                )}
              </div>
            );
          })}
        </div>

        {/* Buttons appear on last message */}
        {currentMessage === messages.length - 1 && (
          <div className="gap-4 flex flex-col items-center justify-center py-4 sm:flex-row">

            {/* Confetti Fireworks when accepted */}
            {showConfetti &&
              (
                <ConfettiButton
                  // onClick={handleYes}
                  className="bg-pink-500 hover:bg-pink-600 w-full max-w-xs h-fit  transform active:scale-90 text-white font-bold !py-4 !px-8 rounded-full transition duration-300"
                >
                  Inomi?
                </ConfettiButton>
              )
            }
            {!showConfetti && !rejected && (
              <ConfettiFireworks onButtClick={handleYes} />

            )}

            {!showConfetti && !rejected && (
              <button
                onClick={handleNo}
                className="w-full max-w-xs bg-gray-300 hover:bg-gray-400 text-gray-800 transform active:scale-90 font-bold py-4 px-8 rounded-full transition duration-300"
              >
                Ewww.. No!
              </button>
            )}

            {(showConfetti || rejected) && (
              <button
                onClick={handleRestart}
                className="w-full max-w-xs bg-gray-300 hover:bg-gray-400 text-gray-800 transform active:scale-90 font-bold py-4 px-8 rounded-full transition duration-300"
              >
                Restart
              </button>
            )}
          </div>
        )}
      </div>

    </main>
  )
}