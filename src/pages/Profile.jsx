import { useState, useEffect } from 'react'
import { Package, Flame, Award, Star, Settings, Activity, LogOut } from 'lucide-react'
import { supabase } from '../lib/supabase'
import AchievementsList from '../components/profile/AchievementsList'
import ProgressOverview from '../components/profile/ProgressOverview'
import LoginForm from '../components/profile/LoginForm'
import RegisterForm from '../components/profile/RegisterForm'
import ChangePassword from '../components/profile/ChangePassword'
import SettingsModal from '../components/profile/SettingsModal'

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const [userData, setUserData] = useState(null)

  // Check if user is logged in on component mount
  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session) {
        await fetchUserData(session.user.id)
        setIsLoggedIn(true)
      }
    } catch (error) {
      console.error('Error checking user:', error)
    } finally {
      setLoading(false)
    }
  }

  // Helper function to format user data
  const formatUserData = (profile, stats) => {
    return {
      name: `${profile.first_name} ${profile.last_name}`.trim() || 'New User',
      email: profile.email,
      phone: profile.phone_number || 'Not provided',
      joinDate: new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      avatar: null,
      stats: {
        productsScanned: stats?.products_scanned || 0,
        healthScore: stats?.health_score || 0,
        streakDays: stats?.streak_days || 0,
        achievements: stats?.achievements || 0,
      },
      achievements: [
        { id: 1, name: 'First Scan', icon: Package, earned: (stats?.products_scanned || 0) > 0 },
        { id: 2, name: '10 Day Streak', icon: Flame, earned: (stats?.streak_days || 0) >= 10 },
        { id: 3, name: 'Health Champion', icon: Award, earned: (stats?.health_score || 0) >= 80 },
        { id: 4, name: '50 Scans', icon: Star, earned: (stats?.products_scanned || 0) >= 50 },
      ],
    }
  }

  const fetchUserData = async (authUserId) => {
    try {
      // 1. First, try to get the user profile
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('auth_user_id', authUserId)
        .single()
        .then(response => {
          if (response.error && response.error.code !== 'PGRST116') {
            // Only throw if it's not a "not found" error
            throw response.error;
          }
          return response;
        });

      // 2. If user doesn't exist, create a new profile
      if (!profile || profileError) {
        // Get the auth user data
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError) throw authError;

        // Create a new user profile with all required fields
        const newUserData = {
          auth_user_id: authUserId,
          email: user.email,
          first_name: user.user_metadata?.full_name?.split(' ')[0] || 'User',
          last_name: user.user_metadata?.full_name?.split(' ')[1] || '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          // Add default values for required fields
          gender: 'other',
          terms_agreed: true,
          // Set health conditions to false by default
          obesity: false,
          autism: false,
          cardiovascular: false,
          pregnancy: false,
          diabetes: false
        };

        // Insert new user
        const { data: newProfile, error: createError } = await supabase
          .from('users')
          .insert([newUserData])
          .select()
          .single();

        if (createError) {
          console.error('Error creating user:', createError);
          throw createError;
        }

        // Create default stats for the new user
        const defaultStats = {
          user_id: newProfile.id,
          products_scanned: 0,
          health_score: 0,
          streak_days: 0,
          achievements: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        const { data: stats, error: statsError } = await supabase
          .from('user_stats')
          .insert([defaultStats])
          .select()
          .single();

        if (statsError) {
          console.error('Error creating user stats:', statsError);
          throw statsError;
        }

        setUserData(formatUserData(newProfile, stats));
        return;
      }

      // 3. If user exists, try to fetch their stats
      const { data: stats, error: statsError } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', profile.id)
        .single();

      // 4. If stats don't exist, create them
      if (!stats || statsError) {
        const defaultStats = {
          user_id: profile.id,
          products_scanned: 0,
          health_score: 0,
          streak_days: 0,
          achievements: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        const { data: newStats, error: createStatsError } = await supabase
          .from('user_stats')
          .insert([defaultStats])
          .select()
          .single();

        if (createStatsError) throw createStatsError;

        setUserData(formatUserData(profile, newStats));
        return;
      }

      // 5. If we have both profile and stats, update the state
      setUserData(formatUserData(profile, stats));
    } catch (error) {
      console.error('Error in fetchUserData:', error);
      
      // If we're here, something went wrong. Let's create a fallback user data
      const fallbackData = {
        name: 'User',
        email: '',
        phone: 'Not provided',
        joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        avatar: null,
        stats: {
          productsScanned: 0,
          healthScore: 0,
          streakDays: 0,
          achievements: 0,
        },
        achievements: [
          { id: 1, name: 'First Scan', icon: Package, earned: false },
          { id: 2, name: '10 Day Streak', icon: Flame, earned: false },
          { id: 3, name: 'Health Champion', icon: Award, earned: false },
          { id: 4, name: '50 Scans', icon: Star, earned: false },
        ],
      };
      
      setUserData(fallbackData);
    }
  }



  const handleLogin = async (profile) => {
    await fetchUserData(profile.auth_user_id)
    setIsLoggedIn(true)
  }

  const handleRegisterSuccess = () => {
    setShowRegister(false)
    alert('Registration successful! Please check your email to verify your account, then login.')
  }

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      setIsLoggedIn(false)
      setUserData(null)
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    if (showRegister) {
      return (
        <RegisterForm 
          onSuccess={handleRegisterSuccess}
          onSwitchToLogin={() => setShowRegister(false)}
        />
      )
    }
    return (
      <LoginForm 
        onLogin={handleLogin}
        onSwitchToRegister={() => setShowRegister(true)}
      />
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Modern Profile Header */}
      <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-black px-6 pt-6 pb-24 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-white text-xl font-bold">Profile</h2>
            <button 
              onClick={() => setShowSettings(true)}
              className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 hover:scale-110 transition-transform"
            >
              <Settings size={20} className="text-white" />
            </button>
          </div>

          {/* Profile Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                  {userData.avatar ? (
                    <img src={userData.avatar} alt="Profile" className="w-full h-full rounded-2xl" />
                  ) : (
                    <span className="text-white text-2xl font-bold">
                      {userData.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-slate-900" />
              </div>
              <div className="flex-1">
                <h3 className="text-white text-xl font-bold">{userData.name}</h3>
                <p className="text-white/60 text-sm">{userData.email}</p>
                <p className="text-white/40 text-xs mt-1">Member since {userData.joinDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 -mt-16 space-y-5 pb-24">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                <Package size={24} className="text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{userData.stats.productsScanned}</div>
            <div className="text-sm text-gray-600 font-medium">Products Scanned</div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                <Activity size={24} className="text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{userData.stats.healthScore}</div>
            <div className="text-sm text-gray-600 font-medium">Health Score</div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-md">
                <Flame size={24} className="text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{userData.stats.streakDays}</div>
            <div className="text-sm text-gray-600 font-medium">Day Streak 🔥</div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-md">
                <Award size={24} className="text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{userData.stats.achievements}</div>
            <div className="text-sm text-gray-600 font-medium">Achievements</div>
          </div>
        </div>

        {/* Achievements */}
        <AchievementsList achievements={userData.achievements} />

        {/* Progress */}
        <ProgressOverview stats={userData.stats} />



        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full bg-white rounded-2xl p-4 shadow-lg border border-red-100 flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 transition-all font-semibold"
        >
          <LogOut size={20} />
          <span>Log Out</span>
        </button>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal 
          onClose={() => setShowSettings(false)}
          onChangePassword={() => {
            setShowSettings(false)
            setShowChangePassword(true)
          }}
          onLogout={() => {
            setShowSettings(false)
            handleLogout()
          }}
        />
      )}

      {/* Change Password Modal */}
      {showChangePassword && (
        <ChangePassword onClose={() => setShowChangePassword(false)} />
      )}
    </div>
  )
}

export default Profile
