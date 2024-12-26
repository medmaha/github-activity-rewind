'use client'

import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { Card } from '@/components/ui/card'

interface DownloadableCardProps {
  userData: any
  username: string
}

export default function DownloadableCard({ userData, username }: DownloadableCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size (2x for retina displays)
    canvas.width = 1200
    canvas.height = 630

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, '#4c1d95') // deep purple
    gradient.addColorStop(1, '#1e40af') // deep blue
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add rounded corners
    ctx.beginPath()
    ctx.roundRect(0, 0, canvas.width, canvas.height, 24)
    ctx.clip()

    // Set text styles
    ctx.fillStyle = '#ffffff'
    ctx.textBaseline = 'top'

    // Draw header
    ctx.font = 'bold 72px Inter'
    ctx.fillText(`${username} in 2024`, 60, 60)

    // Draw 2024 Vibe section
    ctx.font = 'bold 48px Inter'
    ctx.fillText('2024 Vibe', 60, 180)
    
    // Draw roles
    ctx.font = 'bold 64px Inter'
    const roles = ['Developer', 'Builder', 'Creator']
    roles.forEach((role, index) => {
      ctx.fillText(role, 60, 240 + (index * 70))
    })

    // Draw stats
    const stats = [
      `${userData.totalContributions} contributions`,
      `${userData.followers} followers`,
      `${userData.publicRepos} repositories`,
      `${userData.pullRequests} pull requests`
    ]
    
    ctx.font = '32px Inter'
    stats.forEach((stat, index) => {
      ctx.fillText(stat, 60, 460 + (index * 40))
    })

    // Draw Superpower section
    ctx.font = 'bold 48px Inter'
    ctx.fillText('Superpower', canvas.width / 2, 180)
    
    ctx.font = '36px Inter'
    const superpower = 'Building bridges between'
    const innovation = 'code and innovation'
    ctx.fillText(superpower, canvas.width / 2, 250)
    ctx.fillText(innovation, canvas.width / 2, 290)

    // Draw Top Quote section
    ctx.font = 'bold 48px Inter'
    ctx.fillText('Top Quote', canvas.width / 2, 380)
    
    ctx.font = '36px Inter'
    const quote = 'Every expert you admire'
    const quotePt2 = 'today started as a beginner.'
    ctx.fillText(quote, canvas.width / 2, 450)
    ctx.fillText(quotePt2, canvas.width / 2, 490)

    // Draw footer
    ctx.font = '32px Inter'
    ctx.fillStyle = '#60a5fa' // light blue
    ctx.fillText('2024 GitHub Rewind', 60, canvas.height - 60)
    ctx.fillText('Get yours at github-rewind.vercel.app', canvas.width - 400, canvas.height - 60)
  }, [userData, username])

  const handleDownload = () => {
    if (!canvasRef.current) return
    
    const link = document.createElement('a')
    link.download = `${username}-github-rewind-2024.png`
    link.href = canvasRef.current.toDataURL('image/png')
    link.click()
  }

  return (
    <Card className="p-4 bg-gray-800 border-gray-700">
      <div className="space-y-4">
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '12px',
          }}
        />
        <Button 
          onClick={handleDownload}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Card
        </Button>
      </div>
    </Card>
  )
}

