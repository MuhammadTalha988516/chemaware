import { Info, ScanLine, Upload, Search, Lightbulb } from 'lucide-react'

const InfoCard = () => {
  const tips = [
    { icon: ScanLine, title: 'Scan Barcode', desc: 'Point camera at product barcode' },
    { icon: Upload, title: 'Upload Photo', desc: 'Take or select a photo of ingredients' },
    { icon: Search, title: 'Search', desc: 'Look up specific chemicals in our database' },
  ]

  return (
    <div className="card bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 border-blue-200 animate-slideUp" style={{ animationDelay: '100ms' }}>
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center mr-2 shadow-sm">
          <Lightbulb className="text-white" size={18} />
        </div>
        <h3 className="font-bold text-blue-900">How to use</h3>
      </div>
      <div className="space-y-3">
        {tips.map((tip, index) => (
          <div 
            key={index} 
            className="flex items-start gap-3 bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-all"
            style={{ animationDelay: `${200 + index * 50}ms` }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <tip.icon size={20} className="text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800 text-sm">{tip.title}</p>
              <p className="text-xs text-gray-600 mt-0.5">{tip.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InfoCard
