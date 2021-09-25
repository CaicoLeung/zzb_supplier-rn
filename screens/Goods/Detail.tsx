import React from "react"
import { ScrollView, StyleSheet } from "react-native"
import { Button, Provider, Toast, WingBlank } from "@ant-design/react-native"

export default function Detail() {
  return (
    <Provider>
      <ScrollView style={styles.container}>
        <WingBlank>
          <Button type="primary" onPress={() => Toast.info("hello!")}>
            ant button
          </Button>
        </WingBlank>
      </ScrollView>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
