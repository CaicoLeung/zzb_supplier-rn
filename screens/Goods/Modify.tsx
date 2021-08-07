import { Button } from "@ant-design/react-native"
import * as React from "react"
import { Controller, useForm } from "react-hook-form"
import { ScrollView, StyleSheet, Text, TextInput, View, SafeAreaView } from "react-native"

const GoodsModify: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => console.log(data)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.fieldGroupTitle}>基本信息</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.fieldCell}>
              <Text style={styles.fieldLabel}>商品名称</Text>
              <View style={styles.fieldValue}>
                <TextInput
                  style={styles.input}
                  multiline
                  numberOfLines={3}
                  placeholder="描述你的商品(不超过100字)"
                  onBlur={onBlur}
                  maxLength={100}
                  onChangeText={onChange}
                  value={value}
                />
                <View style={styles.fieldFooter}>
                  <Text style={styles.fieldErrorMsg}>{errors.firstName && "商品名称是必填项!"}</Text>
                  <Text style={styles.fieldExtra}>{value.length}/100</Text>
                </View>
              </View>
              <View style={styles.line}></View>
            </View>
          )}
          name="firstName"
          defaultValue=""
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.fieldCell}>
              <Text style={styles.fieldLabel}>商品名称</Text>
              <View style={styles.fieldValue}>
                <TextInput
                  style={styles.input}
                  multiline
                  numberOfLines={3}
                  placeholder="描述你的商品(不超过100字)"
                  onBlur={onBlur}
                  maxLength={100}
                  onChangeText={onChange}
                  value={value}
                />
                <View style={styles.fieldFooter}>
                  <Text style={styles.fieldErrorMsg}>{errors.pictures && "请选择商品主图!"}</Text>
                  <Text style={styles.fieldExtra}>{value.length}/100</Text>
                </View>
              </View>
            </View>
          )}
          name="pictures"
          defaultValue=""
        />
      </ScrollView>
      <View style={styles.footer}>
        <Button type="primary" onPress={handleSubmit(onSubmit)}>
          发布并上架
        </Button>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fieldGroupTitle: {
    color: "#969799",
    fontSize: 18,
    paddingHorizontal: 12,
    paddingVertical: 15,
  },
  fieldCell: {
    position: "relative",
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 12,
    backgroundColor: "#ffffff",
    paddingBottom: 10,
  },
  fieldLabel: {
    paddingTop: 10,
    paddingRight: 8,
    fontSize: 17,
    color: "#646566",
  },
  fieldFooter: {
    marginTop: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fieldErrorMsg: {
    fontSize: 14,
    color: "red",
  },
  fieldExtra: {
    fontSize: 14,
  },
  fieldValue: {
    flex: 1,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 17,
    color: "#323233",
    paddingHorizontal: 8,
    textAlignVertical: "top",
  },
  line: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 1,
    marginHorizontal: 12,
    backgroundColor: "#f0f0f0",
  },
  footer: {
    paddingHorizontal: 12,
  },
})

export default GoodsModify
