import React from "react";
import { View } from "@/components/Themed"
import { ScrollView, StyleSheet, Text } from "react-native";

export default function OrderList() {
  return (
    <ScrollView style={styles.container}>
      <Text>订单列表</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})