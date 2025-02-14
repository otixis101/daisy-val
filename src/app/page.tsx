"use client"

import { useState, useCallback, useEffect } from "react"
import Confetti from "@/components/Confetti"
import Ripple from "@/components/ripple"
import { Modal } from "@/components/Modal"
import { TypingAnimation } from "@/components/magicui/typing-animation"
import { WordRotate } from "@/components/magicui/word-rotate"
import { HeartIcon } from "@heroicons/react/16/solid"

const messages = [
  "Hey there, special someone...",
  "I've been thinking...",
  "About how amazing you are...",
  "And how happy you make me...",
  "So I wanted to ask...",
  "Will you be my",
]

// Array of timeout lengths (in milliseconds) for each message
const messageDelays = [3000, 3000, 3500, 4000, 3500, 5000] // Adjust these values as needed

export default function Home() {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const handleYes = useCallback(() => {
    setShowConfetti(true)
    setModalOpen(true)
  }, [])
  
  const handleNo = useCallback(() => {
    setShowConfetti(false)
    setModalOpen(false)
    setCurrentMessage(0)
  }, [])

  const names = [
    "Valentine?",
    "Pookie?",
    "Baby Girl?",
    "Sugar Bankasa?",
    "Partner in Heist?",
    "Bunk Coffin Mate?",
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
    <main className="relative flex grow w-full h-full flex-col items-center justify-center px-4 overflow-clip">
      <Ripple />
      {showConfetti && <Confetti />}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <div className="text-center space-y-8">
        {/* Heart icon */}
        <HeartIcon className="w-24 h-24 mx-auto text-pink-500 animate-bounce"/>

        {/* Render all messages up to the current one */}
        <div className="flex flex-col items-center justify-center">
          {messages.slice(0, currentMessage + 1).map((message, index) => {
            const isCurrent = index === currentMessage;
            const distanceFromCurrent = currentMessage - index;

            return (
              <div
                key={index}
                className={`transition-all ease-in-out duration-200 text-muted-foreground ${
                  isCurrent
                    ? "text-4xl sm:text-6xl font-bold "
                    : `text-${3 - index}xl sm:text-${6 - index}xl`
                }`}
                style={{
                  transform: `translateY(${distanceFromCurrent * -6}px) scale(${
                    1 - distanceFromCurrent * 0.1
                  })`,
                  opacity: 1 - distanceFromCurrent * 0.2,
                }}
              >
                {isCurrent && index === messages.length - 1 ? (
                  <div className="flex justify-center flex-wrap gap-3">
                    <TypingAnimation className="text-4xl sm:text-6xl break-words font-bold text-muted-foreground">
                      {message}
                    </TypingAnimation>
                    <WordRotate words={names} className={`text-4xl sm:text-6xl break-words font-bold text-pink-500`} />
                  </div>
                ) : (
                  <TypingAnimation>
                      {message}
                    </TypingAnimation>
                )}
              </div>
            );
          })}
        </div>

        {/* Buttons appear on last message */}
        {currentMessage === messages.length - 1 && (
          <div className="space-x-4">
            <button
              onClick={handleYes}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-5 px-8 rounded-full transition duration-300"
            >
              Yes! Baby
            </button>
            <button
              onClick={handleNo}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-5 px-8 rounded-full transition duration-300"
            >
              Ewww.. No!
            </button>
          </div>
        )}
      </div>
    </main>
  )
}