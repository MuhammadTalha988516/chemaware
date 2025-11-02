import { supabase } from './supabase'

/**
 * Search chemicals by name or category
 * @param {string} query - Search query
 * @returns {Promise<Array>} - Array of chemicals
 */
export const searchChemicals = async (query) => {
    try {
        if (!query || query.trim().length === 0) {
            return []
        }

        const { data, error } = await supabase
            .from('chemicals')
            .select('*')
            .or(`name.ilike.%${query}%,category.ilike.%${query}%,cas_number.ilike.%${query}%`)
            .order('health_score', { ascending: false })
            .limit(20)

        if (error) throw error
        return data || []
    } catch (error) {
        console.error('Error searching chemicals:', error)
        return []
    }
}

/**
 * Get chemical by ID
 * @param {string} id - Chemical ID
 * @returns {Promise<Object>} - Chemical object
 */
export const getChemicalById = async (id) => {
    try {
        const { data, error } = await supabase
            .from('chemicals')
            .select('*')
            .eq('id', id)
            .single()

        if (error) throw error
        return data
    } catch (error) {
        console.error('Error getting chemical:', error)
        return null
    }
}

/**
 * Get chemicals by hazard level
 * @param {string} hazardLevel - Hazard level (safe, moderate, caution, high)
 * @returns {Promise<Array>} - Array of chemicals
 */
export const getChemicalsByHazardLevel = async (hazardLevel) => {
    try {
        const { data, error } = await supabase
            .from('chemicals')
            .select('*')
            .eq('hazard_level', hazardLevel)
            .order('name')

        if (error) throw error
        return data || []
    } catch (error) {
        console.error('Error getting chemicals by hazard level:', error)
        return []
    }
}

/**
 * Get all chemical categories
 * @returns {Promise<Array>} - Array of unique categories
 */
export const getChemicalCategories = async () => {
    try {
        const { data, error } = await supabase
            .from('chemicals')
            .select('category')
            .order('category')

        if (error) throw error

        // Get unique categories
        const categories = [...new Set(data.map(item => item.category))]
        return categories
    } catch (error) {
        console.error('Error getting categories:', error)
        return []
    }
}

/**
 * Search products by barcode
 * @param {string} barcode - Product barcode
 * @returns {Promise<Object>} - Product with chemicals
 */
export const searchProductByBarcode = async (barcode) => {
    try {
        const { data, error } = await supabase
            .from('products')
            .select(`
        *,
        product_chemicals (
          percentage,
          chemicals (*)
        )
      `)
            .eq('barcode', barcode)
            .single()

        if (error) throw error
        return data
    } catch (error) {
        console.error('Error searching product by barcode:', error)
        return null
    }
}

/**
 * Save user scan
 * @param {Object} scanData - Scan data
 * @returns {Promise<Object>} - Saved scan
 */
export const saveUserScan = async (scanData) => {
    try {
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            console.log('User not authenticated, skipping scan save')
            return null
        }

        const { data, error } = await supabase
            .from('user_scans')
            .insert([{
                user_id: user.id,
                ...scanData
            }])
            .select()
            .single()

        if (error) throw error
        return data
    } catch (error) {
        console.error('Error saving user scan:', error)
        return null
    }
}

/**
 * Get user's recent scans
 * @param {number} limit - Number of scans to retrieve
 * @returns {Promise<Array>} - Array of recent scans
 */
export const getUserRecentScans = async (limit = 10) => {
    try {
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return []
        }

        const { data, error } = await supabase
            .from('user_scans')
            .select(`
        *,
        chemicals (*),
        products (*)
      `)
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(limit)

        if (error) throw error
        return data || []
    } catch (error) {
        console.error('Error getting user scans:', error)
        return []
    }
}

/**
 * Get popular chemicals (most searched)
 * @param {number} limit - Number of chemicals to retrieve
 * @returns {Promise<Array>} - Array of popular chemicals
 */
export const getPopularChemicals = async (limit = 5) => {
    try {
        const { data, error } = await supabase
            .from('chemicals')
            .select('*')
            .order('health_score', { ascending: false })
            .limit(limit)

        if (error) throw error
        return data || []
    } catch (error) {
        console.error('Error getting popular chemicals:', error)
        return []
    }
}
