import { ScanLine, Sparkles } from 'lucide-react'

const ScannerHeader = () => {
  return (
    <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white px-6 pt-8 pb-6 rounded-b-3xl shadow-xl relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative z-10 animate-fadeIn">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/30">
            <ScanLine size={22} />
          </div>
          <h1 className="text-2xl font-bold">Chemical Scanner</h1>
          <Sparkles size={18} className="text-yellow-300 animate-pulse-slow" />
        </div>
        <p className="text-primary-100 text-sm ml-12">Scan, upload, or search for chemicals</p>
      </div>
    </div>
  )
}

export default ScannerHeader
