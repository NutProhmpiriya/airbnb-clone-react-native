import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack, useRouter } from 'expo-router'
import { useEffect } from 'react'
import TouchableClose from '../components/TouchableClose'
import { ClerkProvider, useAuth } from '@clerk/clerk-expo'
import Constants from 'expo-constants'
import tokenCache from '../utils/tokenCache'

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from 'expo-router'

// Ensure that reloading on `/modal` keeps a back button present.
export const unstable_settings = { initialRouteName: '(tabs)' }

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const [loaded, error] = useFonts({
        mon: require('../assets/fonts/Montserrat-Regular.ttf'),
        'mon-sb': require('../assets/fonts/Montserrat-SemiBold.ttf'),
        'mon-b': require('../assets/fonts/Montserrat-Bold.ttf'),
        ...FontAwesome.font,
    })

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error
    }, [error])

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync()
        }
    }, [loaded])

    if (!loaded) {
        return null
    }

    return (
        <ClerkProvider publishableKey={Constants.expoConfig?.extra?.CLERK_PUBLIC_KEY} tokenCache={tokenCache}>
            <RootLayoutNav />
        </ClerkProvider>
    )
}

function RootLayoutNav() {
    const router = useRouter()
    const { isLoaded, isSignedIn } = useAuth()
    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push('/(modals)/login')
        }
    }, [isLoaded])
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
                name="(modals)/login"
                options={{
                    title: 'Login or signup',
                    presentation: 'modal',
                    headerTitleStyle: { fontFamily: 'mon-sb' },
                    headerTitleAlign: 'center',
                    headerLeft: () => <TouchableClose />,
                }}
            />
            <Stack.Screen name="listing/[id]" options={{ headerTitle: '' }} />
            <Stack.Screen
                name="(modals)/booking"
                options={{
                    title: 'Booking',
                    animation: 'fade',
                    presentation: 'transparentModal',
                    headerLeft: () => <TouchableClose />,
                }}
            />
        </Stack>
    )
}
