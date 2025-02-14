"use client";

import confetti from "canvas-confetti";

import { Button } from "@/components/ui/button";


interface Props {
    onButtClick: () => void
}


export function ConfettiFireworks({onButtClick}:Props) {
    const handleClick = () => {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) =>
            Math.random() * (max - min) + min;

        const interval = window.setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            });
        }, 250);

        onButtClick()
    };

    return (
        <div className="relative w-full max-w-xs">
            <Button onClick={handleClick}
                className="bg-pink-500 hover:bg-pink-600 !w-full max-w-xs h-fit text-white  transform active:scale-90 transition-all font-bold !py-4 rounded-full" >
                OMG... Yes! 
            </Button>
        </div>
    );
}
