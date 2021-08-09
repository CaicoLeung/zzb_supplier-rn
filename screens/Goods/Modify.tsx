import { Button, Icon } from "@ant-design/react-native"
import * as React from "react"
import { Controller, useForm } from "react-hook-form"
import { Image, ScrollView, StyleSheet, Modal, Text, TextInput, View, SafeAreaView, Platform, ImageBackground, Pressable, ActionSheetIOS, Dimensions, KeyboardAvoidingView } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import * as ImagePicker from "expo-image-picker"
import { RouteProp, useNavigation, useNavigationState, useRoute } from "@react-navigation/core"
import { RootStackParamList } from "@/types"
import { StackNavigationProp } from "@react-navigation/stack"
import { useBoolean } from "ahooks"
import { tw } from "react-native-tailwindcss"
import PickerPopup, { Options } from "@/components/PickerPopup"

const options = [
  { label: '撒旦撒旦', value: 1 },
  { label: '定位as', value: 2 },
  { label: '加油加油和', value: 3 },
  { label: '吗别点as🙅🏻‍♀️', value: 4 },
  { label: '欧切卡卡', value: 5 },
]

const GoodsModify: React.FC = () => {
  const navigator = useNavigation<StackNavigationProp<RootStackParamList, "GoodsCreate">>()
  const route = useRoute<RouteProp<RootStackParamList, "GoodsCreate">>()
  const [cateModalVisible, cateModal] = useBoolean()
  const [images, setImages] = React.useState<string[]>([])
  const [cameraVisible, setCameraVisible] = React.useState(false)
  const [selectedCate, setSelectedCate] = React.useState(0)

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
    ; (async () => {
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

  const getOptionsLabel = (options: Options<number>[], val: number) => {
    const findItem = options.find(item => item.value === val)
    return findItem?.label ?? ''
  }

  const onConfirm = (val: number) => {
    setSelectedCate(val)
    cateModal.setFalse()
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView keyboardVerticalOffset={30} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={tw.flex1}>
        <ScrollView style={[tw.flex1]}>
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
                    style={[styles.input, tw.textLeft]}
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
                <View style={ styles.line }/>
              </View>
            )}
            name="firstName"
            defaultValue=""
          />
          <View style={styles.fieldCell}>
            <Text style={styles.fieldLabel}>商品主图</Text>
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
            <View style={ styles.line }/>
          </View>
          <TouchableOpacity style={[styles.fieldCell, { justifyContent: "space-between" }]} onPress={cateModal.setTrue}>
            <Text style={styles.fieldLabel}>商品类目</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[selectedCate ? tw.textBlack : tw.textGray600]}>{selectedCate ? getOptionsLabel(options, selectedCate) : '请选择'}</Text>
              <Icon name="right" size="xs" color="#c8c9cc" />
            </View>
          </TouchableOpacity>
          <Text style={styles.fieldGroupTitle}>库存信息</Text>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.fieldCell}>
                <Text style={styles.fieldLabel}>商品重量(g)</Text>
                <View style={styles.fieldValue}>
                  <TextInput
                    keyboardType="number-pad"
                    style={styles.input}
                    placeholder="请输入"
                    onBlur={onBlur}
                    maxLength={10}
                    onChangeText={onChange}
                    value={value}
                  />
                  <View style={styles.fieldFooter}>
                    {errors.weight && <Text style={styles.fieldErrorMsg}>商品重量是必填项</Text>}
                  </View>
                </View>
                <View style={styles.line}/>
              </View>
            )}
            name="weight"
            defaultValue=""
          />
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.fieldCell}>
                <Text style={styles.fieldLabel}>加工费(元/g)</Text>
                <View style={styles.fieldValue}>
                  <TextInput
                    keyboardType="number-pad"
                    style={styles.input}
                    placeholder="请输入"
                    onBlur={onBlur}
                    maxLength={10}
                    onChangeText={onChange}
                    value={value}
                  />
                  <View style={styles.fieldFooter}>
                    {errors.process && <Text style={styles.fieldErrorMsg}>加工费是必填项</Text>}
                  </View>
                </View>
                <View style={styles.line}/>
              </View>
            )}
            name="process"
            defaultValue=""
          />
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.fieldCell}>
                <Text style={styles.fieldLabel}>供货价(元)</Text>
                <View style={styles.fieldValue}>
                  <TextInput
                    keyboardType="number-pad"
                    style={styles.input}
                    placeholder="请输入"
                    onBlur={onBlur}
                    maxLength={10}
                    onChangeText={onChange}
                    value={value}
                  />
                  <View style={styles.fieldFooter}>
                    {errors.price_cost && <Text style={styles.fieldErrorMsg}>现货库存是必填项</Text>}
                  </View>
                </View>
                <View style={styles.line}/>
              </View>
            )}
            name="price_cost"
            defaultValue=""
          />
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.fieldCell}>
                <Text style={styles.fieldLabel}>现货库存(件)</Text>
                <View style={styles.fieldValue}>
                  <TextInput
                    keyboardType="number-pad"
                    style={styles.input}
                    placeholder="请输入"
                    onBlur={onBlur}
                    maxLength={10}
                    onChangeText={onChange}
                    value={value}
                  />
                  <View style={styles.fieldFooter}>
                    {errors.stock && <Text style={styles.fieldErrorMsg}>现货库存是必填项</Text>}
                  </View>
                </View>
                <View style={styles.line}/>
              </View>
            )}
            name="stock"
            defaultValue=""
          />
        </ScrollView>
        <View style={styles.footer}>
          <Button type="primary" onPress={handleSubmit(onSubmit)}>
            发布并上架
          </Button>
        </View>
        <PickerPopup<number> visible={cateModalVisible} onRequestClose={cateModal.setFalse} options={options} onConfirm={onConfirm} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  placeholder: {
    color: "#c8c9cc",
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
    width: 120,
    paddingTop: 10,
    paddingBottom: 10,
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
    // paddingBottom: 10,
    fontSize: 17,
    color: "#323233",
    paddingHorizontal: 8,
    textAlign: 'right',
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
    // paddingTop: 50,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
})

export default GoodsModify
