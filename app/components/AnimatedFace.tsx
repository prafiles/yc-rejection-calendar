'use client'

import { useEffect, useRef } from 'react'

interface AnimatedFaceProps {
  isHappy: boolean
}

export default function AnimatedFace({ isHappy }: AnimatedFaceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    let animationFrame: number

    const drawFace = (time: number) => {
      ctx.clearRect(0, 0, width, height)

      // Draw face
      ctx.beginPath()
      ctx.arc(width / 2, height / 2, 30, 0, Math.PI * 2)
      ctx.fillStyle = '#FFD700'
      ctx.fill()

      // Draw eyes
      const eyeY = height / 2 - 8
      const leftEyeX = width / 2 - 12
      const rightEyeX = width / 2 + 12

      if (isHappy) {
        // Laughing eyes
        ctx.fillStyle = '#000000'
        ctx.beginPath()
        ctx.moveTo(leftEyeX - 5, eyeY - 3)
        ctx.lineTo(leftEyeX + 5, eyeY + 3)
        ctx.moveTo(leftEyeX - 5, eyeY + 3)
        ctx.lineTo(leftEyeX + 5, eyeY - 3)
        ctx.moveTo(rightEyeX - 5, eyeY - 3)
        ctx.lineTo(rightEyeX + 5, eyeY + 3)
        ctx.moveTo(rightEyeX - 5, eyeY + 3)
        ctx.lineTo(rightEyeX + 5, eyeY - 3)
        ctx.lineWidth = 2
        ctx.stroke()

        // Tears
        ctx.fillStyle = '#87CEFA'
        ctx.beginPath()
        ctx.ellipse(leftEyeX - 8, eyeY + 10 + Math.sin(time / 200) * 2, 3, 5, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.ellipse(rightEyeX + 8, eyeY + 12 + Math.sin(time / 180) * 2, 3, 5, 0, 0, Math.PI * 2)
        ctx.fill()
      } else {
        // Sad eyes
        ctx.fillStyle = '#000000'
        ctx.beginPath()
        ctx.arc(leftEyeX, eyeY, 4, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(rightEyeX, eyeY, 4, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw mouth
      ctx.beginPath()
      if (isHappy) {
        const smileY = height / 2 + 12
        // ctx.arc(width / 2, smileY, 15, 0, Math.PI, false)
        // ctx.lineWidth = 2
        // ctx.strokeStyle = '#000000'
        // ctx.stroke()

        // Teeth
        ctx.fillStyle = '#FFFFFF'
        ctx.fillRect(width / 2 - 12, smileY - 5, 24, 5)
        ctx.strokeStyle = '#000000'
        ctx.lineWidth = 1
        ctx.strokeRect(width / 2 - 12, smileY - 5, 24, 5)
      } else {
        const frownY = height / 2 + 18 + Math.sin(time / 300) * 2
        ctx.arc(width / 2, frownY, 15, Math.PI, Math.PI * 2, false)
        ctx.lineWidth = 2
        ctx.strokeStyle = '#000000'
        ctx.stroke()
      }

      animationFrame = requestAnimationFrame(drawFace)
    }

    drawFace(0)

    return () => cancelAnimationFrame(animationFrame)
  }, [isHappy])

  return (
    <canvas
      ref={canvasRef}
      width={80}
      height={80}
      className="mx-auto"
      aria-label={isHappy ? "Laughing face with tears of joy" : "Sad face"}
    />
  )
}

