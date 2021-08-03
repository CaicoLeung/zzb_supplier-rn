import { datasource } from "@/data/list"
import * as React from "react"
import { StyleSheet, Image, ScrollView, TouchableOpacity, FlatList, ImageBackground } from "react-native"
import { Button } from "@ant-design/react-native"
import { TextInput } from "react-native-gesture-handler"
import { RootStackParamList } from "types"
import { StackNavigationProp } from "@react-navigation/stack"
import styled from "styled-components/native"

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, "Root">

type Props = {
  navigation: ProfileScreenNavigationProp
}

const ScrollViewContainer = styled.ScrollView`
  flex: 1;
`
const HeaderView = styled.View`
  flex: 1;
`
const ImageBackgroundBox = styled.ImageBackground`
  padding-top: 80;
  padding-bottom: 20;
`
const ImageBackgroundInner = styled.View`
  flex: 1;
  height: 70;
  padding-left: 20;
  padding-right: 20;
  align-items: center;
  flex-direction: row;
`
const AvatarBox = styled.Image`
  width: 60;
  height: 60;
  border-radius: 30;
  margin-right: 10;
`
const AccountInfoBox = styled.View`
  flex: 1;
  align-content: center;
  background-color: transparent;
  color: #ffffff;
`
const BaseText = styled.Text`
  color: #ffffff;
  font-size: 14;
  font-weight: 300;
`
const TitleText = styled(BaseText)`
  font-size: 20;
  margin-bottom: 8;
  font-weight: 600;
`

export default function TabOneScreen({ navigation }: Props) {
  return (
    <ScrollViewContainer>
      <HeaderView>
        <ImageBackgroundBox resizeMode="cover" source={require("zzb-sup/assets/images/cover.png")}>
          <ImageBackgroundInner>
            <AvatarBox width={60} height={60} resizeMode="cover" source={require("zzb-sup/assets/images/pika.jpeg")} />
            <AccountInfoBox>
              <TitleText>余额宝文化</TitleText>
              <BaseText>账号: 666666</BaseText>
            </AccountInfoBox>
            <Button size="small">退出登录</Button>
          </ImageBackgroundInner>
        </ImageBackgroundBox>
      </HeaderView>
    </ScrollViewContainer>
  )
}
