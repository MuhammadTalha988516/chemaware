import { Activity, ScanLine, Upload, Search, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import RecentScans from '../components/home/RecentScans'
import HealthTips from '../components/home/HealthTips'
import CommunityImpact from '../components/home/CommunityImpact'
import FloatingActionButton from '../components/FloatingActionButton'

const Home = () => {
  const navigate = useNavigate()

  // Mock data - replace with actual data from your backend
  const userData = {
    name: 'User',
    productsScanned: 47,
    healthScore: 85,
    streakDays: 12,
  }

  const recentScans = [
    { id: 1, name: 'Household Cleaner X', date: '2 hours ago', healthScore: 72, status: 'moderate' },
    { id: 2, name: 'Organic Shampoo', date: '1 day ago', healthScore: 92, status: 'good' },
    { id: 3, name: 'Kitchen Detergent', date: '2 days ago', healthScore: 65, status: 'caution' },
  ]

  const healthTips = [
    {
      id: 1,
      title: 'Avoid Parabens',
      description: 'Look for paraben-free products to reduce hormone disruption risks.',
      icon: Sparkles,
    },
    {
      id: 2,
      title: 'Check pH Levels',
      description: 'Products with balanced pH are gentler on your skin.',
      icon: Activity,
    },
  ]

  const communityStats = {
    activeUsers: 12453,
    totalScans: 89234,
  }

  const fabActions = [
    {
      icon: ScanLine,
      label: 'Scan Barcode',
      gradient: 'from-blue-500 to-blue-600',
      onClick: () => navigate('/scanner'),
    },
    {
      icon: Upload,
      label: 'Upload Photo',
      gradient: 'from-green-500 to-emerald-600',
      onClick: () => navigate('/scanner'),
    },
    {
      icon: Search,
      label: 'Search',
      gradient: 'from-purple-500 to-purple-600',
      onClick: () => navigate('/scanner'),
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Modern Compact Header */}
      <div className="relative z-10 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 pt-6 pb-20 overflow-hidden">
        {/* Animated blobs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        
        <div className="relative z-10">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-white/80 text-sm">
                {new Date().getHours() < 12 ? '🌅 Good morning' : new Date().getHours() < 18 ? '☀️ Good afternoon' : '🌙 Good evening'}
              </p>
              <h1 className="text-white text-2xl font-bold mt-1">{userData.name}</h1>
            </div>
            <button className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 hover:scale-110 transition-transform">
              <Activity size={24} className="text-white" />
            </button>
          </div>

          {/* Stats Overview Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-5 border border-white/20 shadow-2xl">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{userData.productsScanned}</div>
                <div className="text-white/70 text-xs font-medium">Scans</div>
              </div>
              <div className="text-center border-x border-white/20">
                <div className="text-3xl font-bold text-white mb-1">{userData.healthScore}</div>
                <div className="text-white/70 text-xs font-medium">Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{userData.streakDays}🔥</div>
                <div className="text-white/70 text-xs font-medium">Streak</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 px-6 -mt-12 space-y-5 pb-24">
        {/* Quick Actions - Horizontal Scroll */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => navigate('/scanner')}
            className="flex-shrink-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <ScanLine size={20} />
            </div>
            <div className="text-left">
              <div className="font-bold text-sm">Scan Now</div>
              <div className="text-xs text-white/80">Barcode scanner</div>
            </div>
          </button>

          <button
            onClick={() => navigate('/scanner')}
            className="flex-shrink-0 bg-gradient-to-br from-green-500 to-emerald-600 text-white px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Upload size={20} />
            </div>
            <div className="text-left">
              <div className="font-bold text-sm">Upload</div>
              <div className="text-xs text-white/80">Photo analysis</div>
            </div>
          </button>

          <button
            onClick={() => navigate('/scanner')}
            className="flex-shrink-0 bg-gradient-to-br from-purple-500 to-purple-600 text-white px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Search size={20} />
            </div>
            <div className="text-left">
              <div className="font-bold text-sm">Search</div>
              <div className="text-xs text-white/80">Find chemicals</div>
            </div>
          </button>
        </div>

        {/* Recent Activity */}
        <RecentScans scans={recentScans} />

        {/* Health Tips - Modern Cards */}
        <HealthTips tips={healthTips} />

        {/* Community Stats */}
        <CommunityImpact 
          activeUsers={communityStats.activeUsers}
          totalScans={communityStats.totalScans}
        />
      </div>

      <FloatingActionButton actions={fabActions} />
    </div>
  )
}

export default Home
