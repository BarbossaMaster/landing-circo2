import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge.jsx'
import { Clock, Users, TrendingUp, AlertCircle } from 'lucide-react'

export function UrgencyTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg animate-pulse">
      <div className="flex items-center justify-center space-x-2 mb-2">
        <Clock className="h-5 w-5" />
        <span className="font-bold">Oferta kończy się za:</span>
      </div>
      <div className="flex justify-center space-x-4 text-2xl font-bold">
        <div className="text-center">
          <div className="bg-white text-red-500 px-3 py-2 rounded">
            {String(timeLeft.hours).padStart(2, '0')}
          </div>
          <div className="text-xs mt-1">godz</div>
        </div>
        <div className="text-center">
          <div className="bg-white text-red-500 px-3 py-2 rounded">
            {String(timeLeft.minutes).padStart(2, '0')}
          </div>
          <div className="text-xs mt-1">min</div>
        </div>
        <div className="text-center">
          <div className="bg-white text-red-500 px-3 py-2 rounded">
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
          <div className="text-xs mt-1">sek</div>
        </div>
      </div>
    </div>
  )
}

export function SocialProof() {
  const [currentCount, setCurrentCount] = useState(847)
  const [recentPurchases] = useState([
    { name: "Katarzyna z Warszawy", time: "2 minuty temu" },
    { name: "Marek z Krakowa", time: "5 minut temu" },
    { name: "Anna z Gdańska", time: "8 minut temu" },
    { name: "Piotr z Wrocławia", time: "12 minut temu" }
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCount(prev => prev + Math.floor(Math.random() * 3))
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-4">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <TrendingUp className="h-5 w-5 text-green-600" />
          <span className="font-bold text-green-800">
            {currentCount} osób kupiło dziś ten produkt!
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="h-4 w-4 text-green-600" />
          <span className="text-sm text-green-700">
            Aktualnie {Math.floor(Math.random() * 15) + 5} osób przegląda tę stronę
          </span>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-bold text-blue-800 mb-3">Ostatnie zakupy:</h4>
        <div className="space-y-2">
          {recentPurchases.map((purchase, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <span className="text-blue-700">{purchase.name}</span>
              <span className="text-blue-500">{purchase.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function StockAlert() {
  const [stockLeft] = useState(Math.floor(Math.random() * 20) + 5)

  return (
    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
      <div className="flex items-center space-x-2">
        <AlertCircle className="h-5 w-5 text-orange-600" />
        <span className="font-bold text-orange-800">
          Uwaga! Zostało tylko {stockLeft} sztuk w magazynie
        </span>
      </div>
      <p className="text-sm text-orange-700 mt-2">
        Nie czekaj - zabezpiecz swój pulsoksymetr już teraz!
      </p>
    </div>
  )
}

export function TrustBadges() {
  return (
    <div className="flex flex-wrap justify-center gap-4 py-6">
      <Badge variant="outline" className="bg-green-50 border-green-200 text-green-800 px-4 py-2">
        ✓ Bezpieczne płatności
      </Badge>
      <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-800 px-4 py-2">
        ✓ Darmowa dostawa
      </Badge>
      <Badge variant="outline" className="bg-purple-50 border-purple-200 text-purple-800 px-4 py-2">
        ✓ Gwarancja satysfakcji
      </Badge>
      <Badge variant="outline" className="bg-yellow-50 border-yellow-200 text-yellow-800 px-4 py-2">
        ✓ Płatność przy odbiorze
      </Badge>
    </div>
  )
}

