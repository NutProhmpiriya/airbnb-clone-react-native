import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser'
import { defaultStyles } from '../../constants/Styles'
import { TextInput } from 'react-native-gesture-handler'
import Colors from '../../constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useOAuth, useSignIn, useSignUp } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'

enum Strategy {
    GOOGLE = 'oauth_google',
    APPLE = 'oauth_apple',
    FACEBOOK = 'oauth_facebook',
}

const LoginPage = () => {
    useWarmUpBrowser()
    const router = useRouter()
    const { isLoaded, signUp, setActive } = useSignUp()
    const { signIn } = useSignIn()
    const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' })
    const { startOAuthFlow: appAuth } = useOAuth({ strategy: 'oauth_apple' })
    const { startOAuthFlow: facebookAuth } = useOAuth({ strategy: 'oauth_facebook' })
    const [pendingVerification, setPendingVerification] = React.useState(false)

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const onSelectAuth = async (strategy: Strategy) => {
        const selectedAuth = {
            [Strategy.GOOGLE]: googleAuth,
            [Strategy.APPLE]: appAuth,
            [Strategy.FACEBOOK]: facebookAuth,
        }[strategy]

        try {
            const { createdSessionId, setActive } = await selectedAuth()
            console.log('createdSessionId', createdSessionId)

            if (createdSessionId) {
                await setActive!({ session: createdSessionId })
                router.back()
            }
        } catch (error: any) {
            console.error('OAuth error', JSON.stringify(error, null, 2))
        }
    }

    const signupWithEmail = async () => {
        try {
            console.log('signinWithEmail', { email, password })
            const result = await signUp?.create({
                emailAddress: email,
                password,
            })
            console.log({ result })

            const resultVerify = await signUp?.prepareEmailAddressVerification({ strategy: 'email_code' })
            console.log({ resultVerify })
            setPendingVerification(true)
        } catch (error: any) {
            console.error(JSON.stringify(error, null, 2))
            alert(error?.errors[0].message)
        }
    }

    const signinWithEmail = async () => {
        try {
            const completeSignIn = await signIn!.create({
                identifier: email,
                password,
            })
            console.info(JSON.stringify(completeSignIn, null, 2))
            const result = await setActive!({ session: completeSignIn.createdSessionId })
            console.info({ result })
        } catch (error) {
            alert(JSON.stringify(error, null, 2))
        }
    }

    const clearForm = () => {
        setEmail('')
        setPassword('')
    }

    const btnList = [
        {
            nameIcon: 'call-outline',
            text: 'Continue with Phone',
            action: () => signinWithEmail(),
        },
        {
            nameIcon: 'md-logo-apple',
            text: 'Continue with apple',
            action: () => onSelectAuth(Strategy.APPLE),
        },
        {
            nameIcon: 'logo-google',
            text: 'Continue with Google',
            action: () => onSelectAuth(Strategy.GOOGLE),
        },
        {
            nameIcon: 'logo-facebook',
            text: 'Continue with Facebook',
            action: () => onSelectAuth(Strategy.FACEBOOK),
        },
    ]
    return (
        <View style={[defaultStyles.container, { padding: 26 }]}>
            <TextInput
                autoCapitalize="none"
                placeholder="Email"
                style={[defaultStyles.inputField, { marginBottom: 30 }]}
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                autoCapitalize="none"
                secureTextEntry={true}
                placeholder="Password"
                style={[defaultStyles.inputField, { marginBottom: 30 }]}
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={defaultStyles.btn} onPress={signinWithEmail}>
                <Text style={defaultStyles.btnText}>Continue</Text>
            </TouchableOpacity>

            <View style={styles.seperatorView}>
                <View style={{ flex: 1, height: 1, backgroundColor: Colors.grey }} />
                <Text style={styles.seperator}>OR</Text>
                <View style={{ flex: 1, height: 1, backgroundColor: Colors.grey }} />
            </View>

            <View style={{ gap: 20 }}>
                {btnList.map((btn, index) => (
                    <TouchableOpacity key={index} style={styles.btnOutline} onPress={btn.action}>
                        {/* @ts-ignore */}
                        <Ionicons name={btn.nameIcon} size={20} style={defaultStyles.btnIcon} />
                        <Text style={styles.btnOutlineText}>{btn.text}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

export default LoginPage

const styles = StyleSheet.create({
    seperatorView: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginVertical: 30,
    },
    seperator: {
        fontFamily: 'mon-sb',
        color: Colors.grey,
        fontSize: 16,
    },
    btnOutline: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: Colors.grey,
        height: 50,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    btnOutlineText: {
        color: '#000',
        fontSize: 16,
        fontFamily: 'mon-sb',
    },
})
