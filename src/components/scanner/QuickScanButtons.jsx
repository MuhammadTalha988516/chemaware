import { ScanLine, Upload, Search, Camera, Loader2 } from 'lucide-react'

const QuickScanButtons = ({ onScanBarcode, onUploadPhoto, onSearchClick, isScanning }) => {
  return (
    <div className="grid grid-cols-3 gap-3 -mt-3">
      <button
        onClick={onScanBarcode}
        disabled={isScanning}
        className={`group flex flex-col items-center justify-center p-4 rounded-xl transition-all shadow-lg ${
          isScanning 
            ? 'bg-gradient-to-br from-blue-300 to-blue-400 cursor-not-allowed' 
            : 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 active:scale-95 hover:shadow-xl'
        }`}
      >
        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-2 backdrop-blur-sm border border-white/30 group-hover:scale-110 transition-transform">
          {isScanning ? (
            <Loader2 size={24} className="text-white animate-spin" />
          ) : (
            <ScanLine size={24} className="text-white" />
          )}
        </div>
        <span className="text-xs font-semibold text-white text-center">
          {isScanning ? 'Scanning...' : 'Scan Barcode'}
        </span>
      </button>

      <button
        onClick={onUploadPhoto}
        className="group flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all active:scale-95 shadow-lg hover:shadow-xl"
      >
        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-2 backdrop-blur-sm border border-white/30 group-hover:scale-110 transition-transform">
          <Upload size={24} className="text-white" />
        </div>
        <span className="text-xs font-semibold text-white text-center">Upload Photo</span>
      </button>

      <button
        onClick={onSearchClick}
        className="group flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transition-all active:scale-95 shadow-lg hover:shadow-xl"
      >
        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-2 backdrop-blur-sm border border-white/30 group-hover:scale-110 transition-transform">
          <Search size={24} className="text-white" />
        </div>
        <span className="text-xs font-semibold text-white text-center">Search</span>
      </button>
    </div>
  )
}

export default QuickScanButtons
