import React from "react"
import {ScrollView, StyleSheet, Text} from "react-native"

export default function GoodsList() {
  return (
    <ScrollView style={styles.container}>
      <Text>订单列表</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
