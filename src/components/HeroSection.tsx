import React from 'react'

export function HeroSection({ currentQuote, heroQuotes }: { currentQuote: number, heroQuotes: { quote: string, movie: string }[] }) {
  return (
    <div className="max-w-3xl space-y-6 animate-fadeIn">
      <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
        Discover Your Next
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
          Favorite Movie
        </span>
      </h1>
      <div className="glass-effect p-4 rounded-lg border border-purple-500/20 max-w-lg">
        <p className="text-gray-300 text-lg italic">{heroQuotes[currentQuote].quote}</p>
        <p className="text-purple-400 text-sm mt-1">— {heroQuotes[currentQuote].movie}</p>
      </div>
    </div>
  )
}
