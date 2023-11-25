import * as SecureStore from 'expo-secure-store'

const tokenCache = {
    async getToken(key: string) {
        try {
            return await SecureStore.getItemAsync(key)
        } catch (error) {
            console.log('Failed to get token from cache', error)
        }
    },
    async saveToken(key: string, value: string) {
        try {
            await SecureStore.setItemAsync('clerk_token', value)
        } catch (error) {
            console.log('Failed to set token to cache', error)
        }
    },
}

export default tokenCache
