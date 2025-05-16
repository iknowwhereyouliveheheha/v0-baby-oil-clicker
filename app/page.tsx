import BabyOilClicker from "../components/baby-oil-clicker"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center justify-center p-6 relative">
      <a
        href="https://click.firetime.me/"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-4 right-4 bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2"
      >
        <span>Go check out Fire Clicker</span>
        <span className="text-yellow-200">🔥</span>
      </a>

      <h1 className="text-4xl font-bold text-blue-800 mb-8">Baby Oil Clicker</h1>
      <BabyOilClicker />

      <div className="absolute bottom-2 left-4 text-sm text-blue-600 opacity-70 hover:opacity-100 transition-opacity">
        made by: Luke Norkus
      </div>
    </main>
  )
}
