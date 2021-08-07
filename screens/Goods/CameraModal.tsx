import { RootStackParamList } from "@/types"
import { Button } from "@ant-design/react-native"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { Camera } from "expo-camera"
import * as React from "react"
import { View, StyleSheet, Platform, SafeAreaView } from "react-native"

const CameraModal: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, "GoodsCreate">>()
  const cameraRef = React.useRef<Camera>(null)
  const [areCameraReady, setAreCameraReady] = React.useState(false)

  const takePictureHandler = async () => {
    if (!areCameraReady) {
      return
    }
    const { uri } = await cameraRef.current!.takePictureAsync()
    navigation.navigate("GoodsCreate", { uri })
  }

  React.useEffect(() => {
    ;(async () => {
      if (Platform.OS !== "web") {
        const { status } = await Camera.requestPermissionsAsync()
        if (status !== "granted") {
          alert("抱歉，我们需要相机权限才能进行此操作！")
        }
      }
    })()
  }, [])

  return (
    <SafeAreaView style={styles.camera}>
      <Camera ref={cameraRef} style={styles.camera} type={Camera.Constants.Type.back} onCameraReady={() => setAreCameraReady(true)}></Camera>
      <View style={styles.buttonContainer}>
        <Button type="ghost" onPress={takePictureHandler}>
          拍照
        </Button>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  buttonContainer: {
    justifyContent: "center",
    backgroundColor: "transparent",
    flexDirection: "row",
    paddingTop: 10,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
})

export default CameraModal
