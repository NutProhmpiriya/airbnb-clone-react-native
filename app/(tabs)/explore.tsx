import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const ExplorePage = () => {
  return (
    <View>
      <Text>ExplorePage</Text>
      <Link href={"/(modals)/login"}>Login</Link>
      <Link href={"/(modals)/booking"}>Booking</Link>
      <Link href={"/listing/1333"}>Listing</Link>
    </View>
  )
}

export default ExplorePage

const styles = StyleSheet.create({})