import axios from 'axios'
const API_URL = '/api/user/'

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

// Logout user
const logout = async () => {
    localStorage.removeItem('user')
}

// Create the service object with all functions
const authService = {
    register,
    login,
    logout,
}

export default authService
