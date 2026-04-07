'use client'

import { useEffect, useRef, useCallback } from 'react'

interface ASCIIWaveProps {
    className?: string
}

export function ASCIIWave({ className = '' }: ASCIIWaveProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const mouseRef = useRef({ x: 0, y: 0 })
    const animationRef = useRef<number>(0)
    const timeRef = useRef(0)

    // ASCII characters for wave effect - from sparse to dense
    const chars = ' .·:;+=xX$#@'

    const draw = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const width = canvas.width
        const height = canvas.height

        const rootStyles = getComputedStyle(document.documentElement)
        const backgroundHsl = rootStyles.getPropertyValue('--background').trim() || '0 0% 100%'
        const purpleHsl = rootStyles.getPropertyValue('--purple-primary').trim() || '260 25.9% 43.9%'

        // Clear canvas
        ctx.fillStyle = `hsl(${backgroundHsl})`
        ctx.fillRect(0, 0, width, height)

        // Character size
        const fontSize = window.innerWidth < 768 ? 10 : 14
        const charWidth = fontSize * 0.6
        const charHeight = fontSize

        ctx.font = `${fontSize}px "Courier New", monospace`
        ctx.fillStyle = `hsl(${purpleHsl})`

        const cols = Math.ceil(width / charWidth)
        const rows = Math.ceil(height / charHeight)

        const mouseX = mouseRef.current.x
        const mouseY = mouseRef.current.y
        const time = timeRef.current

        // Center exclusion zone (bubble around text)
        const centerX = width / 2
        const centerY = height * 0.38 // Slightly above center where the text is
        const bubbleRadius = Math.min(width, height) * 0.35 // Main exclusion radius
        const fadeZone = 80 // Pixels for smooth fade transition

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = col * charWidth
                const y = row * charHeight

                // Calculate distance from center bubble
                const dxCenter = x - centerX
                const dyCenter = y - centerY
                const distanceFromCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter)

                // Skip if inside the bubble
                if (distanceFromCenter < bubbleRadius) {
                    continue
                }

                // Calculate fade factor for smooth edge
                const fadeFactor = Math.min(1, (distanceFromCenter - bubbleRadius) / fadeZone)

                // Calculate distance from mouse
                const dx = x - mouseX
                const dy = y - mouseY
                const distance = Math.sqrt(dx * dx + dy * dy)

                // Wave parameters
                const waveFrequency = 0.02
                const waveAmplitude = 1
                const mouseInfluence = Math.max(0, 1 - distance / 300)

                // Create multiple overlapping waves
                const wave1 = Math.sin(col * waveFrequency * 2 + time * 0.03) * waveAmplitude
                const wave2 = Math.sin(row * waveFrequency * 1.5 + time * 0.02) * waveAmplitude
                const wave3 = Math.sin((col + row) * waveFrequency + time * 0.025) * waveAmplitude

                // Mouse-influenced ripple
                const ripple = Math.sin(distance * 0.03 - time * 0.05) * mouseInfluence * 2

                // Combine waves
                const combinedWave = wave1 + wave2 + wave3 + ripple

                // Normalize to character index
                const normalizedValue = (combinedWave + 3) / 6 // Range 0-1
                const charIndex = Math.floor(normalizedValue * (chars.length - 1))
                const char = chars[Math.max(0, Math.min(chars.length - 1, charIndex))]

                // Calculate opacity based on wave intensity and mouse proximity
                const baseOpacity = 0.15 + normalizedValue * 0.4
                const mouseOpacity = mouseInfluence * 0.5
                const opacity = Math.min(1, baseOpacity + mouseOpacity) * fadeFactor

                // Apply color with varying opacity
                ctx.fillStyle = `hsl(${purpleHsl} / ${opacity})`
                ctx.fillText(char, x, y + charHeight)
            }
        }

        timeRef.current += 1
        animationRef.current = requestAnimationFrame(draw)
    }, [chars])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const handleResize = () => {
            const container = canvas.parentElement
            if (container) {
                canvas.width = container.clientWidth
                canvas.height = container.clientHeight
            }
        }

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            }
        }

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                const rect = canvas.getBoundingClientRect()
                mouseRef.current = {
                    x: e.touches[0].clientX - rect.left,
                    y: e.touches[0].clientY - rect.top
                }
            }
        }

        // Initial setup
        handleResize()

        // Start animation
        animationRef.current = requestAnimationFrame(draw)

        // Event listeners
        window.addEventListener('resize', handleResize)
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('touchmove', handleTouchMove)

        return () => {
            cancelAnimationFrame(animationRef.current)
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('touchmove', handleTouchMove)
        }
    }, [draw])

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            <canvas
                ref={canvasRef}
                className="w-full h-full pointer-events-none"
                style={{ display: 'block' }}
            />
        </div>
    )
}
