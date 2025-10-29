import { User, Mail, Phone, Calendar, Edit2, Sparkles } from 'lucide-react'

const ProfileHeader = ({ userData }) => {
  return (
    <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-blue-600 text-white px-6 pt-8 pb-16 rounded-b-3xl shadow-xl relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative z-10 animate-fadeIn">
        <div className="flex items-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mr-4 backdrop-blur-sm border-2 border-white/30 shadow-lg">
              {userData.avatar ? (
                <img src={userData.avatar} alt="Profile" className="w-full h-full rounded-full" />
              ) : (
                <User size={40} />
              )}
            </div>
            <button className="absolute bottom-0 right-3 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
              <Edit2 size={14} className="text-primary-600" />
            </button>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold">{userData.name}</h1>
              {userData.stats?.healthScore >= 80 && (
                <Sparkles size={18} className="text-yellow-300 animate-pulse-slow" />
              )}
            </div>
            <p className="text-primary-100 text-sm flex items-center">
              <Calendar size={14} className="mr-1" />
              Joined {userData.joinDate}
            </p>
          </div>
        </div>

        <div className="glass rounded-2xl p-4 border border-white/20 space-y-2">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
              <Mail size={16} />
            </div>
            <p className="text-sm">{userData.email}</p>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
              <Phone size={16} />
            </div>
            <p className="text-sm">{userData.phone}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader
