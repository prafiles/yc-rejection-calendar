import Image from 'next/image'
import { useState } from 'react'

interface GifDisplayProps {
  gifUrl: string | null
  onLoad: () => void
}

export default function GifDisplay({ gifUrl, onLoad }: GifDisplayProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="relative h-64 w-full overflow-hidden rounded-lg">
      {gifUrl ? (
        <>
          <Image
            src={gifUrl}
            alt="Random funny GIF"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
            onLoadingComplete={() => {
              setIsLoading(false)
              onLoad()
            }}
          />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
              <p className="text-gray-500">Loading GIF...</p>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center h-full bg-gray-200 rounded-lg">
          <p className="text-gray-500">Loading GIF...</p>
        </div>
      )}
      <div className="absolute inset-0 flex items-end justify-center p-4 bg-gradient-to-t from-black to-transparent">
        <p className="text-white text-2xl font-bold">It's not you, it's me</p>
      </div>
    </div>
  )
}

