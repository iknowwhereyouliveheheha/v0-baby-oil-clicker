export function formatNumber(num: number): string {
  if (num < 1000) return num.toString()

  const units = ["", "K", "M", "B", "T", "Qa", "Qi"]
  const unit = Math.floor(Math.log10(num) / 3)
  const value = num / Math.pow(1000, unit)
  const formattedValue = value.toFixed(1).replace(/\.0$/, "")

  return `${formattedValue}${units[unit]}`
}
