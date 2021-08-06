import * as React from "react"
import { ScrollView, StyleSheet, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const GoodsModify: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={{ textAlign: "center" }}>神神道道多</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default GoodsModify
