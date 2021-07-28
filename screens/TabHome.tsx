import { datasource } from "@/data/list"
import * as React from "react"
import {
  StyleSheet,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native"
import { TextInput } from "react-native-gesture-handler"

import EditScreenInfo from "@/components/EditScreenInfo"
import { Text, View } from "@/components/Themed"
import { RootStackParamList } from "types"
import { StackNavigationProp } from "@react-navigation/stack"

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Root'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export default function TabOneScreen({ navigation }: Props) {
  const [text, setText] = React.useState("")

  return (
    <ScrollView style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity>
          <Image
            style={styles.icon}
            source={require("../assets/images/icons/home_icon_1.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.icon}
            source={{ uri: "https://www.reactnative.express/static/logo.png" }}
            defaultSource={require("../assets/images/icons/home_icon_1.png")}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={datasource}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.smallCard}>
            <Text style={styles.smallCardText}>{item.title}</Text>
          </View>
        )}
      />
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/TabHome.tsx" />
      <View style={styles.inputContainer}>
        <View style={styles.textInput}>
          <TextInput
            value={text}
            placeholder="请输入..."
            onChangeText={setText}
          />
        </View>
        <View style={styles.inputButton}>
          <Button title="重置" onPress={() => setText("")} />
        </View>
      </View>
      <View style={styles.navigationButton}>
        <Button title="跳转至详情页" onPress={() => navigation.navigate("Order", { screen: "Detail" })} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  smallCard: {
    width: 200,
    height: 200,
    backgroundColor: "#40a9ff",
    borderRadius: 5,
    marginRight: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  smallCardText: {
    fontSize: 24,
    color: "#FFFFFF",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  inputContainer: {
    flex: 1,
    height: 34,
    flexDirection: "row",
    alignItems: "stretch",
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#ccc",
  },
  inputButton: {
    fontSize: 15,
    backgroundColor: "blue",
    color: "#FFFFFF",
  },
  navigationButton: {
    marginTop: 10,
    fontSize: 15,
    backgroundColor: "yellow",
    color: "#FFFFFF",
    borderRadius: 4
  }
})
