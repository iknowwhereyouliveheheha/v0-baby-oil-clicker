"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Droplets, Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import BabyOilUpgrades from "./baby-oil-upgrades"
import { formatNumber } from "../lib/format-number"

export default function BabyOilClicker() {
  const [oilDrops, setOilDrops] = useState(0)
  const [dropsPerClick, setDropsPerClick] = useState(1)
  const [dropsPerSecond, setDropsPerSecond] = useState(0)
  const [clickEffect, setClickEffect] = useState<{ x: number; y: number; value: number; id: number }[]>([])
  const [nextEffectId, setNextEffectId] = useState(0)
  const { toast } = useToast()

  // Handle passive income
  useEffect(() => {
    if (dropsPerSecond <= 0) return

    const interval = setInterval(() => {
      setOilDrops((prev) => prev + dropsPerSecond / 10)
    }, 100)

    return () => clearInterval(interval)
  }, [dropsPerSecond])

  // Handle oil bottle click
  const handleOilClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Add oil drops
    setOilDrops((prev) => prev + dropsPerClick)

    // Create click effect
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newEffect = {
      x,
      y,
      value: dropsPerClick,
      id: nextEffectId,
    }

    setClickEffect((prev) => [...prev, newEffect])
    setNextEffectId((prev) => prev + 1)

    // Remove effect after animation
    setTimeout(() => {
      setClickEffect((prev) => prev.filter((effect) => effect.id !== newEffect.id))
    }, 1000)
  }

  // Handle upgrade purchase
  const handleUpgrade = (cost: number, dpsIncrease: number, clickIncrease: number, name: string) => {
    if (oilDrops >= cost) {
      setOilDrops((prev) => prev - cost)
      setDropsPerSecond((prev) => prev + dpsIncrease)
      setDropsPerClick((prev) => prev + clickIncrease)

      toast({
        title: "Upgrade Purchased!",
        description: `You bought ${name}`,
      })
    }
  }

  return (
    <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-5 gap-6">
      {/* Oil bottle and stats */}
      <div className="md:col-span-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex justify-between">
              <span>Baby Oil: {formatNumber(Math.floor(oilDrops))} ml</span>
              <span className="text-blue-600">{dropsPerSecond > 0 && `${formatNumber(dropsPerSecond)} ml/sec`}</span>
            </CardTitle>
            <CardDescription>Click the baby oil bottle to produce more oil!</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center relative">
            <button
              onClick={handleOilClick}
              className="relative w-48 h-48 rounded-full bg-blue-200 hover:bg-blue-300 transition-all duration-100 active:scale-95 flex items-center justify-center shadow-lg overflow-hidden"
              aria-label="Click baby oil bottle"
            >
              <Droplets className="w-32 h-32 text-blue-800" />

              {/* Click effects */}
              {clickEffect.map((effect) => (
                <span
                  key={effect.id}
                  className="absolute text-blue-800 font-bold animate-float-up pointer-events-none"
                  style={{ left: `${effect.x}px`, top: `${effect.y}px` }}
                >
                  +{effect.value}
                </span>
              ))}
            </button>

            <div className="mt-6 text-center">
              <p className="text-lg font-medium">
                {dropsPerClick > 1 && (
                  <span className="flex items-center justify-center gap-1">
                    <Plus className="w-4 h-4" />
                    {formatNumber(dropsPerClick)} ml per click
                  </span>
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upgrades */}
      <div className="md:col-span-3">
        <BabyOilUpgrades oilDrops={oilDrops} onUpgrade={handleUpgrade} />
      </div>
    </div>
  )
}
