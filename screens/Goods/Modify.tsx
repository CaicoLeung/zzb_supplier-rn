import { Button, Icon, Modal } from "@ant-design/react-native"
import * as React from "react"
import { Controller, useForm } from "react-hook-form"
import { Image, ScrollView, StyleSheet, Text, TextInput, View, SafeAreaView, Platform, ImageBackground, Pressable, ActionSheetIOS } from "react-native"
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler"
import * as ImagePicker from "expo-image-picker"
import { Camera } from "expo-camera"
import { RouteProp, useNavigation, useNavigationState, useRoute } from "@react-navigation/core"
import { RootStackParamList } from "@/types"
import { StackNavigationProp } from "@react-navigation/stack"

const GoodsModify: React.FC = () => {
  const navigator = useNavigation<StackNavigationProp<RootStackParamList, "GoodsCreate">>()
  const route = useRoute<RouteProp<RootStackParamList, "GoodsCreate">>()
  const [images, setImages] = React.useState<string[]>([])
  const [cameraVisible, setCameraVisible] = React.useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: unknown) => console.log(data)

  React.useEffect(() => {
    if (route.params.uri) {
      setImages([...images, route.params.uri])
    }
  }, [route.params?.uri])

  React.useEffect(() => {
    ;(async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== "granted") {
          alert("抱歉，我们需要相机胶卷权限才能进行此操作！")
        }
      }
    })()
  }, [])

  const removeImageHandle = (index: number) => {
    images.splice(index, 1)
    setImages([...images])
  }

  const imagePickerAction = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      // allowsMultipleSelection: true,
    })

    if (!result.cancelled) {
      setImages([...images, result.uri])
    }
  }

  const imagePickerHandler = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["从相册中选择", "拍照", "取消"],
        cancelButtonIndex: 2,
        destructiveButtonIndex: 1,
      },
      async (buttonIndex: number) => {
        if (buttonIndex == 0) {
          await imagePickerAction()
        } else if (buttonIndex === 1) {
          navigator.navigate("CameraModal")
        }
      }
    )
  }

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
        <View style={styles.fieldCell}>
          <Text style={styles.fieldLabel}>商品名称</Text>
          <View style={[styles.fieldValue, { flexDirection: "row", flexWrap: "wrap", flexBasis: 0.9 }]}>
            {images?.map((uri, index) => (
              <ImageBackground style={styles.uploadBox} imageStyle={styles.uploadBox} key={uri} width={95} height={95} source={{ uri }}>
                <Pressable style={styles.uploadBoxDel}>
                  <Icon name="delete" color="red" size="md" onPress={() => removeImageHandle(index)} />
                </Pressable>
              </ImageBackground>
            ))}
            {images.length < 5 && (
              <TouchableOpacity style={styles.uploadBox} onPress={imagePickerHandler}>
                <Icon name="camera" size="lg" />
              </TouchableOpacity>
            )}
            <View style={styles.fieldFooter}>
              <Text style={styles.fieldErrorMsg}>{images?.length ? "" : "请选择商品主图!"}</Text>
              <Text style={styles.fieldExtra}>{images?.length ?? 0}/5张</Text>
            </View>
          </View>
        </View>
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
    paddingTop: 10,
  },
  fieldLabel: {
    paddingTop: 10,
    paddingRight: 8,
    fontSize: 17,
    color: "#646566",
  },
  fieldFooter: {
    marginTop: 10,
    width: "100%",
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
  uploadBox: {
    width: 95,
    height: 95,
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f8fa",
    borderRadius: 4,
    position: "relative",
  },
  uploadBoxDel: {
    position: "absolute",
    right: 0,
    top: 0,
    color: "red",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
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
    paddingVertical: 8,
  },
})

export default GoodsModify
