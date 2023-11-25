import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser'
import { defaultStyles } from '../../constants/Styles'

const LoginPage = () => {
    useWarmUpBrowser()
    return (
        <View style={defaultStyles.container}>
            
        </View>
    )
}

export default LoginPage
