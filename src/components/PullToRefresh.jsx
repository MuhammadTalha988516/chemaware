import { RefreshCw } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

const PullToRefresh = ({ onRefresh, children }) => {
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [startY, setStartY] = useState(0)
  const containerRef = useRef(null)

  const threshold = 80

  const handleTouchStart = (e) => {
    if (containerRef.current?.scrollTop === 0) {
      setStartY(e.touches[0].clientY)
    }
  }

  const handleTouchMove = (e) => {
    if (startY === 0 || isRefreshing) return

    const currentY = e.touches[0].clientY
    const distance = currentY - startY

    if (distance > 0 && containerRef.current?.scrollTop === 0) {
      setPullDistance(Math.min(distance, threshold * 1.5))
    }
  }

  const handleTouchEnd = async () => {
    if (pullDistance >= threshold && !isRefreshing) {
      setIsRefreshing(true)
      await onRefresh()
      setIsRefreshing(false)
    }
    setPullDistance(0)
    setStartY(0)
  }

  const rotation = Math.min((pullDistance / threshold) * 360, 360)
  const opacity = Math.min(pullDistance / threshold, 1)

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="h-full overflow-y-auto"
    >
      {/* Pull indicator */}
      <div
        className="flex items-center justify-center transition-all duration-200"
        style={{
          height: pullDistance > 0 ? `${pullDistance}px` : '0px',
          opacity: opacity,
        }}
      >
        <div className="bg-primary-600 rounded-full p-2 shadow-lg">
          <RefreshCw
            size={20}
            className={`text-white ${isRefreshing ? 'animate-spin' : ''}`}
            style={{ transform: `rotate(${rotation}deg)` }}
          />
        </div>
      </div>

      {children}
    </div>
  )
}

export default PullToRefresh
