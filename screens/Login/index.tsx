import React, { useState } from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { tw } from "react-native-tailwindcss"

const LoginPage: React.FC = () => {
  const [account, setAccount] = useState("");

  return (
    <SafeAreaView style={[tw.flex1, tw.bgWhite]}>
      <View style={[tw.p2]}>
        <Text style={[tw.text4xl]}>登录</Text>
        <TextInput style={[tw.flex1, tw.pY2, tw.borderB, tw.textGray900]} placeholder="请输入手机号码" value={account} onChangeText={setAccount} />
      </View>
    </SafeAreaView>
  )
}

export default LoginPage
