"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatNumber } from "../lib/format-number"
import {
  Utensils,
  Factory,
  Building,
  Truck,
  Rocket,
  Zap,
  Wand2,
  Waves,
  Users,
  Globe,
  CircleDot,
  Crown,
  Clock,
  Sparkles,
  Gauge,
  Cpu,
  Cog,
  Lightbulb,
  Atom,
  Infinity,
  Dna,
} from "lucide-react"

interface Upgrade {
  id: string
  name: string
  description: string
  baseCost: number
  dpsIncrease: number
  clickIncrease: number
  icon: React.ReactNode
  owned: number
}

interface Advancement {
  id: string
  name: string
  description: string
  baseCost: number
  effect: string
  multiplier: number
  icon: React.ReactNode
  purchased: boolean
}

interface BabyOilUpgradesProps {
  oilDrops: number
  onUpgrade: (cost: number, dpsIncrease: number, clickIncrease: number, name: string) => void
}

export default function BabyOilUpgrades({ oilDrops, onUpgrade }: BabyOilUpgradesProps) {
  const [upgrades, setUpgrades] = useState<Upgrade[]>([
    {
      id: "dropper",
      name: "Better Dropper",
      description: "Squeeze more baby oil with each click!",
      baseCost: 15,
      dpsIncrease: 0,
      clickIncrease: 1,
      icon: <Wand2 className="w-5 h-5" />,
      owned: 0,
    },
    {
      id: "masseur",
      name: "Slippery Fingers",
      description: "Your fingers are so oily, they produce oil themselves!",
      baseCost: 100,
      dpsIncrease: 1,
      clickIncrease: 0,
      icon: <Utensils className="w-5 h-5" />,
      owned: 0,
    },
    {
      id: "spa",
      name: "Greased Lightning",
      description: "It's systematically hydromatic!",
      baseCost: 500,
      dpsIncrease: 4,
      clickIncrease: 0,
      icon: <Zap className="w-5 h-5" />,
      owned: 0,
    },
    {
      id: "factory",
      name: "Slick Willy's Oil Emporium",
      description: "We put the 'oil' in 'toil'!",
      baseCost: 3000,
      dpsIncrease: 10,
      clickIncrease: 0,
      icon: <Factory className="w-5 h-5" />,
      owned: 0,
    },
    {
      id: "refinery",
      name: "Slide 'n' Glide Refinery",
      description: "Where friction goes to die!",
      baseCost: 10000,
      dpsIncrease: 40,
      clickIncrease: 0,
      icon: <Building className="w-5 h-5" />,
      owned: 0,
    },
    {
      id: "tanker",
      name: "S.S. Slippery When Wet",
      description: "The captain always goes down with the slip!",
      baseCost: 40000,
      dpsIncrease: 100,
      clickIncrease: 0,
      icon: <Truck className="w-5 h-5" />,
      owned: 0,
    },
    {
      id: "lab",
      name: "Slick Science Labs",
      description: "Our scientists are always sliding from one breakthrough to another!",
      baseCost: 200000,
      dpsIncrease: 400,
      clickIncrease: 0,
      icon: <Rocket className="w-5 h-5" />,
      owned: 0,
    },
    {
      id: "waterslide",
      name: "Slip 'n' Slide Extreme",
      description: "The world's longest oil slide! (Warning: May cause friction burns)",
      baseCost: 1000000,
      dpsIncrease: 2000,
      clickIncrease: 0,
      icon: <Waves className="w-5 h-5" />,
      owned: 0,
    },
    {
      id: "wrestlers",
      name: "Oily Wrestlers Union",
      description: "They're slippery, they're angry, and they're producing baby oil!",
      baseCost: 5000000,
      dpsIncrease: 10000,
      clickIncrease: 0,
      icon: <Users className="w-5 h-5" />,
      owned: 0,
    },
    {
      id: "dimension",
      name: "Slippery Dimension",
      description: "A parallel universe where everything is made of baby oil!",
      baseCost: 25000000,
      dpsIncrease: 50000,
      clickIncrease: 0,
      icon: <Globe className="w-5 h-5" />,
      owned: 0,
    },
    {
      id: "blackhole",
      name: "Greasy Black Hole",
      description: "It's so slippery, not even light can escape!",
      baseCost: 100000000,
      dpsIncrease: 200000,
      clickIncrease: 0,
      icon: <CircleDot className="w-5 h-5" />,
      owned: 0,
    },
    {
      id: "deity",
      name: "The Great Lubricator",
      description: "The ancient deity of smoothness has blessed your operation!",
      baseCost: 500000000,
      dpsIncrease: 1000000,
      clickIncrease: 0,
      icon: <Crown className="w-5 h-5" />,
      owned: 0,
    },
    {
      id: "timeline",
      name: "Slick Timeline Manipulator",
      description: "Rewrite history to be 100% more slippery!",
      baseCost: 2500000000,
      dpsIncrease: 5000000,
      clickIncrease: 0,
      icon: <Clock className="w-5 h-5" />,
      owned: 0,
    },
    {
      id: "multiverse",
      name: "Multiverse of Slipperiness",
      description: "Infinite universes, infinite baby oil!",
      baseCost: 10000000000,
      dpsIncrease: 25000000,
      clickIncrease: 0,
      icon: <Sparkles className="w-5 h-5" />,
      owned: 0,
    },
  ])

  const [advancements, setAdvancements] = useState<Advancement[]>([
    {
      id: "slick-fingers",
      name: "Slick Fingers Protocol",
      description: "Your fingers become 50% more efficient at clicking.",
      baseCost: 5000,
      effect: "Click power +50%",
      multiplier: 1.5,
      icon: <Gauge className="w-5 h-5" />,
      purchased: false,
    },
    {
      id: "oil-optimization",
      name: "Oil Flow Optimization",
      description: "Advanced fluid dynamics increases all production by 25%.",
      baseCost: 25000,
      effect: "All production +25%",
      multiplier: 1.25,
      icon: <Cog className="w-5 h-5" />,
      purchased: false,
    },
    {
      id: "slippery-algorithms",
      name: "Slippery Algorithms",
      description: "AI-powered oil production increases efficiency by 50%.",
      baseCost: 100000,
      effect: "All production +50%",
      multiplier: 1.5,
      icon: <Cpu className="w-5 h-5" />,
      purchased: false,
    },
    {
      id: "quantum-lubrication",
      name: "Quantum Lubrication",
      description: "Harness quantum uncertainty to double oil production.",
      baseCost: 500000,
      effect: "All production x2",
      multiplier: 2,
      icon: <Atom className="w-5 h-5" />,
      purchased: false,
    },
    {
      id: "slick-innovation",
      name: "Slick Innovation",
      description: "Revolutionary oil technology triples your clicking power.",
      baseCost: 1000000,
      effect: "Click power x3",
      multiplier: 3,
      icon: <Lightbulb className="w-5 h-5" />,
      purchased: false,
    },
    {
      id: "molecular-restructuring",
      name: "Molecular Restructuring",
      description: "Rearrange molecules to triple all oil production.",
      baseCost: 5000000,
      effect: "All production x3",
      multiplier: 3,
      icon: <Dna className="w-5 h-5" />,
      purchased: false,
    },
    {
      id: "infinite-viscosity",
      name: "Infinite Viscosity Paradox",
      description: "Break the laws of physics to achieve infinite oil flow.",
      baseCost: 50000000,
      effect: "All production x5",
      multiplier: 5,
      icon: <Infinity className="w-5 h-5" />,
      purchased: false,
    },
  ])

  const calculateCost = (baseCost: number, owned: number) => {
    return Math.floor(baseCost * Math.pow(1.15, owned))
  }

  const handleBuyUpgrade = (upgradeId: string) => {
    setUpgrades((prevUpgrades) => {
      return prevUpgrades.map((upgrade) => {
        if (upgrade.id === upgradeId) {
          const cost = calculateCost(upgrade.baseCost, upgrade.owned)

          if (oilDrops >= cost) {
            onUpgrade(cost, upgrade.dpsIncrease, upgrade.clickIncrease, upgrade.name)
            return { ...upgrade, owned: upgrade.owned + 1 }
          }
        }
        return upgrade
      })
    })
  }

  const handleBuyAdvancement = (advancementId: string) => {
    setAdvancements((prevAdvancements) => {
      return prevAdvancements.map((advancement) => {
        if (advancement.id === advancementId && !advancement.purchased) {
          if (oilDrops >= advancement.baseCost) {
            onUpgrade(advancement.baseCost, 0, 0, advancement.name)
            return { ...advancement, purchased: true }
          }
        }
        return advancement
      })
    })
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Upgrades & Better Clicks</CardTitle>
        <CardDescription>Improve your baby oil production</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upgrades" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="upgrades">Upgrades</TabsTrigger>
            <TabsTrigger value="advancements">Better Clicks</TabsTrigger>
          </TabsList>

          <TabsContent value="upgrades">
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-4">
                {upgrades.map((upgrade) => {
                  const cost = calculateCost(upgrade.baseCost, upgrade.owned)
                  const canAfford = oilDrops >= cost

                  return (
                    <div key={upgrade.id} className="border rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <div className="bg-blue-100 p-2 rounded-full">{upgrade.icon}</div>
                          <div>
                            <h3 className="font-medium text-base">{upgrade.name}</h3>
                            <p className="text-xs text-muted-foreground">{upgrade.owned} owned</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-medium ${canAfford ? "text-green-600" : "text-red-600"}`}>
                            {formatNumber(cost)}
                          </p>
                          {upgrade.dpsIncrease > 0 && (
                            <p className="text-xs text-muted-foreground">+{upgrade.dpsIncrease} ml/sec</p>
                          )}
                          {upgrade.clickIncrease > 0 && (
                            <p className="text-xs text-muted-foreground">+{upgrade.clickIncrease} ml/click</p>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{upgrade.description}</p>
                      <Button
                        variant={canAfford ? "default" : "outline"}
                        size="sm"
                        className="w-full"
                        disabled={!canAfford}
                        onClick={() => handleBuyUpgrade(upgrade.id)}
                      >
                        {canAfford ? "Buy" : "Not enough baby oil"}
                      </Button>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="advancements">
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-4">
                {advancements.map((advancement) => {
                  const canAfford = oilDrops >= advancement.baseCost && !advancement.purchased

                  return (
                    <div
                      key={advancement.id}
                      className={`border rounded-lg p-4 mb-4 ${advancement.purchased ? "bg-blue-50 border-blue-200" : ""}`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`p-2 rounded-full ${advancement.purchased ? "bg-blue-200" : "bg-blue-100"}`}>
                            {advancement.icon}
                          </div>
                          <div>
                            <h3 className="font-medium text-base">{advancement.name}</h3>
                            <p className="text-xs text-muted-foreground">
                              {advancement.purchased ? "Purchased" : "Not purchased"}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          {!advancement.purchased && (
                            <p className={`font-medium ${canAfford ? "text-green-600" : "text-red-600"}`}>
                              {formatNumber(advancement.baseCost)}
                            </p>
                          )}
                          <p className="text-xs font-medium text-blue-600">{advancement.effect}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{advancement.description}</p>
                      {!advancement.purchased ? (
                        <Button
                          variant={canAfford ? "default" : "outline"}
                          size="sm"
                          className="w-full"
                          disabled={!canAfford}
                          onClick={() => handleBuyAdvancement(advancement.id)}
                        >
                          {canAfford ? "Purchase Better Click" : "Not enough baby oil"}
                        </Button>
                      ) : (
                        <div className="w-full py-2 text-center text-sm font-medium text-blue-600 bg-blue-50 rounded-md">
                          Better Click Unlocked
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
