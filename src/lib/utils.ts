import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatPercent(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
    signDisplay: 'always',
  }).format(value / 100)
}

export function getChangeColor(change: number): 'positive' | 'negative' | 'neutral' {
  if (change > 0) return 'positive'
  if (change < 0) return 'negative'
  return 'neutral'
}

export function getRegionLabel(region: string): string {
  const labels: Record<string, string> = {
    us: 'United States',
    uk: 'United Kingdom',
    africa: 'Africa',
  }
  return labels[region] || region
}

export function getRegionFlag(region: string): string {
  const flags: Record<string, string> = {
    us: '🇺🇸',
    uk: '🇬🇧',
    africa: '🌍',
  }
  return flags[region] || '🌍'
}

export function generateMockSparklineData(points: number = 30, base: number = 100, volatility: number = 5) {
  const data = []
  let current = base
  for (let i = 0; i < points; i++) {
    current += (Math.random() - 0.5) * volatility
    data.push({ x: `T${i}`, y: Math.max(current, 1) })
  }
  return data
}

export function generateMockChartData(points: number = 60, base: number = 4000, trend: number = 0.5) {
  const data = []
  let current = base
  for (let i = 0; i < points; i++) {
    current += trend + (Math.random() - 0.5) * 15
    data.push({ x: `Day ${i + 1}`, y: Math.max(current, 100) })
  }
  return data
}
