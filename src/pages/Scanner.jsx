import { useState, useEffect } from 'react'
import ScannerHeader from '../components/scanner/ScannerHeader'
import QuickScanButtons from '../components/scanner/QuickScanButtons'
import SearchBar from '../components/scanner/SearchBar'
import SearchResults from '../components/scanner/SearchResults'
import InfoCard from '../components/scanner/InfoCard'
import ScanHistory from '../components/scanner/ScanHistory'
import { searchChemicals, getUserRecentScans, saveUserScan } from '../lib/chemicalApi'
import Toast from '../components/Toast'

const Scanner = () => {
  const [activeTab, setActiveTab] = useState('scan')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isScanning, setIsScanning] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [recentScans, setRecentScans] = useState([])
  const [toast, setToast] = useState(null)

  // Load recent scans on mount
  useEffect(() => {
    loadRecentScans()
  }, [])

  const loadRecentScans = async () => {
    const scans = await getUserRecentScans(5)
    const formattedScans = scans.map(scan => ({
      name: scan.chemicals?.name || scan.products?.name || 'Unknown',
      time: formatTimeAgo(new Date(scan.created_at))
    }))
    setRecentScans(formattedScans)
  }

  const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000)
    if (seconds < 60) return 'Just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`
    return `${Math.floor(seconds / 86400)} days ago`
  }

  const handleSearch = async (query) => {
    setSearchQuery(query)
    
    if (query.trim().length === 0) {
      setSearchResults([])
      return
    }

    if (query.trim().length < 2) {
      return // Wait for at least 2 characters
    }

    setIsSearching(true)
    
    try {
      const results = await searchChemicals(query)
      
      // Format results to match component expectations
      const formattedResults = results.map(chemical => ({
        id: chemical.id,
        name: chemical.name,
        category: chemical.category,
        hazardLevel: chemical.hazard_level,
        healthScore: chemical.health_score,
        description: chemical.description,
        casNumber: chemical.cas_number
      }))
      
      setSearchResults(formattedResults)
      
      // Save search to user history if results found
      if (formattedResults.length > 0 && formattedResults[0]) {
        await saveUserScan({
          chemical_id: formattedResults[0].id,
          scan_type: 'search'
        })
        loadRecentScans() // Refresh recent scans
      }
    } catch (error) {
      console.error('Search error:', error)
      setToast({
        message: 'Error searching chemicals. Please try again.',
        type: 'error'
      })
    } finally {
      setIsSearching(false)
    }
  }

  const handleScanBarcode = () => {
    setIsScanning(true)
    // Simulate scanning
    setTimeout(() => {
      setIsScanning(false)
      setToast({
        message: 'Barcode scanning will be integrated with your camera API',
        type: 'info'
      })
    }, 2000)
  }

  const handleUploadPhoto = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async (e) => {
      const file = e.target.files[0]
      if (file) {
        setToast({
          message: `Photo uploaded: ${file.name}. Image processing will be integrated with your backend.`,
          type: 'info'
        })
      }
    }
    input.click()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <ScannerHeader />

      <div className="px-6 py-6 space-y-6">
        <QuickScanButtons 
          onScanBarcode={handleScanBarcode}
          onUploadPhoto={handleUploadPhoto}
          onSearchClick={() => setActiveTab('search')}
          isScanning={isScanning}
        />

        <SearchBar 
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
          onClear={() => handleSearch('')}
          isSearching={isSearching}
        />

        <SearchResults 
          results={searchResults}
          searchQuery={searchQuery}
          isSearching={isSearching}
        />

        {!searchQuery && recentScans.length > 0 && <ScanHistory scans={recentScans} />}

        <InfoCard />
      </div>

      {toast && (
        <Toast 
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}

export default Scanner
