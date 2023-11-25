import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const BookingDetailPage = () => {
    const { id } = useLocalSearchParams<{id: string}>();
  return (
    <View>
      <Text>BookingDetailPage {id}</Text>
    </View>
  )
}

export default BookingDetailPage

const styles = StyleSheet.create({})