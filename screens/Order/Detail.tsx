import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function OrderDetail() {
  return (
    <ScrollView style={styles.container}>
      <Text>详情页</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})