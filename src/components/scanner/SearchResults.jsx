import { AlertCircle, CheckCircle, Info, Search, ChevronRight, Shield, Loader2 } from 'lucide-react'
import LoadingSkeleton from '../LoadingSkeleton'

const SearchResults = ({ results, searchQuery, isSearching }) => {
  const getHazardColor = (level) => {
    switch (level) {
      case 'safe': return 'text-green-600'
      case 'moderate': return 'text-yellow-600'
      case 'caution': return 'text-orange-600'
      case 'high': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getHazardBg = (level) => {
    switch (level) {
      case 'safe': return 'bg-green-100'
      case 'moderate': return 'bg-yellow-100'
      case 'caution': return 'bg-orange-100'
      case 'high': return 'bg-red-100'
      default: return 'bg-gray-100'
    }
  }

  const getHazardGradient = (level) => {
    switch (level) {
      case 'safe': return 'from-green-500 to-emerald-600'
      case 'moderate': return 'from-yellow-500 to-orange-500'
      case 'caution': return 'from-orange-500 to-red-500'
      case 'high': return 'from-red-500 to-rose-600'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const getHazardIcon = (level) => {
    switch (level) {
      case 'safe': return CheckCircle
      case 'moderate': return Info
      case 'caution': return AlertCircle
      case 'high': return AlertCircle
      default: return Info
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-green-100'
    if (score >= 60) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  if (isSearching) {
    return (
      <div className="mt-4 space-y-3">
        <LoadingSkeleton type="list" />
      </div>
    )
  }

  if (!searchQuery) {
    return (
      <div className="mt-4 text-center py-12 animate-fadeIn">
        <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
          <Search className="text-gray-300" size={40} />
        </div>
        <p className="text-gray-500 text-sm font-medium">Start typing to search chemicals</p>
        <p className="text-gray-400 text-xs mt-1">Search by name, category, or CAS number</p>
      </div>
    )
  }

  if (results.length === 0 && searchQuery.length >= 2) {
    return (
      <div className="mt-4 text-center py-12 animate-fadeIn">
        <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
          <AlertCircle className="text-gray-400" size={40} />
        </div>
        <p className="text-gray-600 font-semibold">No results found for "{searchQuery}"</p>
        <p className="text-sm text-gray-500 mt-1">Try a different search term or check spelling</p>
      </div>
    )
  }

  if (searchQuery.length < 2) {
    return null
  }

  return (
    <div className="mt-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-600 flex items-center gap-2">
          <Shield size={16} className="text-primary-600" />
          Found {results.length} result{results.length !== 1 ? 's' : ''}
        </p>
      </div>
      {results.map((result, index) => {
        const HazardIcon = getHazardIcon(result.hazardLevel)
        return (
          <div
            key={result.id}
            className="group card hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 hover:border-primary-200 animate-slideUp"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start gap-3 mb-3">
              <div className={`w-12 h-12 bg-gradient-to-br ${getHazardGradient(result.hazardLevel)} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform`}>
                <HazardIcon size={24} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-800 group-hover:text-primary-600 transition-colors">{result.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-600">{result.category}</span>
                  {result.casNumber && (
                    <span className="px-2 py-0.5 bg-blue-50 rounded-full text-xs text-blue-600">
                      CAS: {result.casNumber}
                    </span>
                  )}
                </div>
              </div>
              <div className={`px-3 py-1.5 rounded-full ${getScoreBg(result.healthScore)} shadow-sm flex-shrink-0`}>
                <span className={`text-sm font-bold ${getScoreColor(result.healthScore)}`}>
                  {result.healthScore}
                </span>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-3 leading-relaxed">{result.description}</p>
            
            <div className="flex items-center justify-between">
              <div className={`flex items-center ${getHazardBg(result.hazardLevel)} ${getHazardColor(result.hazardLevel)} px-3 py-2 rounded-lg`}>
                <HazardIcon size={14} className="mr-1.5" />
                <span className="text-xs font-semibold uppercase">
                  {result.hazardLevel} Risk
                </span>
              </div>
              <button className="flex items-center gap-1 text-primary-600 font-semibold text-sm hover:gap-2 transition-all">
                View Details
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default SearchResults
