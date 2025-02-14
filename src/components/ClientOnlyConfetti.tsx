/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import type { ComponentType } from "react"

const Confetti = dynamic(() => import("react-confetti").then(mod => mod.default as ComponentType<any>), { ssr: false })

export default function ClientOnlyConfetti({ width, height }: any) {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return <Confetti width={width} height={height} />
}