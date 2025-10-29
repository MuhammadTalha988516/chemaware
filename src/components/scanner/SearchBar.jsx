import { Search, X, Database, Loader2 } from 'lucide-react'

const SearchBar = ({ searchQuery, onSearchChange, onClear, isSearching }) => {
  return (
    <div className="card animate-slideUp">
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-2">
          <Database className="text-primary-600" size={18} />
        </div>
        <h2 className="text-lg font-bold text-gray-800">Search Database</h2>
        {isSearching && (
          <div className="ml-auto flex items-center gap-2 text-sm text-primary-600">
            <Loader2 className="animate-spin" size={16} />
            <span>Searching...</span>
          </div>
        )}
      </div>
      
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search for chemicals by name, category, or CAS number..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
        />
        {searchQuery && !isSearching && (
          <button
            onClick={onClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-1.5 transition-all"
          >
            <X size={18} />
          </button>
        )}
        {isSearching && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Loader2 className="animate-spin text-primary-600" size={20} />
          </div>
        )}
      </div>
      <p className="text-xs text-gray-500 mt-2">
        💡 Tip: Type at least 2 characters to start searching
      </p>
    </div>
  )
}

export default SearchBar
