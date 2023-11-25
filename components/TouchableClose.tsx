import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const TouchableClose = () => {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.back()}>
      <Ionicons name="close-outline" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default TouchableClose;

const styles = StyleSheet.create({});
