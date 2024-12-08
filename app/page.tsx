'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import AnimatedFace from './components/AnimatedFace'
import Image from 'next/image'

const GIPHY_API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY

export default function YCRejectionCountdown() {
  const totalDays = 90
  const [timeLeft, setTimeLeft] = useState(totalDays * 24 * 60 * 60)
  const [isRejected, setIsRejected] = useState(false)
  const [gifUrl, setGifUrl] = useState('https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXR0N205ZTFnZjdvZ2htbTN1MW1qb2hzNTRzOGlnOTEyYXoxajhmcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/n4lK173IddTFe/giphy.webp')

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          setIsRejected(true)
          return 0
        }
        return prevTime - 1
      })
    }, 1000) // Update every second

    return () => clearInterval(timer)
  }, [])

  const loadRandomGif = async () => {
    try {
      // const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API_KEY}&tag=startup,failure&rating=pg-13`)
      // const data = await response.json()
      // setGifUrl(data.data.images.downsized_medium.url)
      setGifUrl("https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3doazV1OThxZW9nZmJ1bDFqeDVxZHY0bzN1NzNmcHozc3RuMGxtdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/G8ZhkRMXBA0FRoCK7b/giphy.webp")
    } catch (error) {
      console.error('Error fetching GIF:', error)
    }
  }

  const days = Math.floor(timeLeft / (24 * 60 * 60))
  const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60))
  const minutes = Math.floor((timeLeft % (60 * 60)) / 60)
  const seconds = timeLeft % 60

  const progress = ((totalDays * 24 * 60 * 60 - timeLeft) / (totalDays * 24 * 60 * 60)) * 100

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 p-4">
      <Card className="w-full max-w-2xl text-center overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <CardTitle className="text-3xl font-bold">YC Rejection Countdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          {isRejected ? (
            <div className="space-y-4">
              <AnimatedFace isHappy={false} />
              <p className="text-2xl font-semibold text-red-500">Oops! You've been rejected!</p>
              <p className="text-xl text-gray-600">But hey, at least you're in good company!</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <AnimatedFace isHappy={true} />
                <p className="text-sm text-gray-600 mt-2">
                  (Laughing now, crying later?)
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: 'Days', value: days },
                    { label: 'Hours', value: hours },
                    { label: 'Minutes', value: minutes },
                    { label: 'Seconds', value: seconds },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-gradient-to-b from-blue-400 to-blue-600 rounded-lg p-2 text-white">
                      <div className="text-3xl font-bold">{value.toString().padStart(2, '0')}</div>
                      <div className="text-sm">{label}</div>
                    </div>
                  ))}
                </div>
                <p className="text-xl font-semibold text-purple-600">until inevitable rejection</p>
                <p className="text-gray-600 italic">Don't worry, it's not you, it's them... probably.</p>
              </div>
              <Progress value={progress} className="w-full h-4 bg-gray-200" />
              <div className="relative h-64 w-full overflow-hidden rounded-lg">
                <Image
                  src={gifUrl}
                  alt="Random startup or failure related GIF"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
                <div className="absolute inset-0 flex items-end justify-center p-4 bg-gradient-to-t from-black to-transparent">
                  <p className="text-white text-2xl font-bold">It's not you, it's me</p>
                </div>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="justify-center bg-gradient-to-r from-green-400 to-blue-500 p-4">
          <Button
            onClick={loadRandomGif}
            className="bg-white text-blue-600 hover:bg-blue-100 transition-all duration-300 transform hover:scale-105"
          >
            Load Random GIF
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

