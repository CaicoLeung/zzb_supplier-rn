import { datasource } from "@/data/list"
import * as React from "react"
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ImageBackground } from "react-native"
import { Button, Card, Icon } from "@ant-design/react-native"
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
  padding-top: 70;
  padding-bottom: 30;
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
  const GoodsNav = [
    {
      title: "13",
      name: "售卖中",
    },
    {
      title: "23",
      name: "已下架",
    },
    {
      title: "＋",
      name: "添加商品",
    },
  ]
  const OrderNav = [
    {
      title: "13",
      name: "待发货",
    },
    {
      title: "23",
      name: "已发货",
    },
    {
      title: "0",
      name: "已完成",
    },
  ]
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
      <Card style={styles.card}>
        <Card.Header style={styles.cardHeader} title="商品管理" extra={<Icon style={{ textAlign: "right" }} name="right" size="sm" />} />
        <Card.Body style={{ flexDirection: "row" }}>
          {GoodsNav.map((nav, index) => (
            <View style={[styles.cardBodyItem, { borderRightWidth: index === GoodsNav.length - 1 ? 0 : 0.4 }]} key={nav.name}>
              <Text style={[styles.textCenter, { fontSize: 20 }]}>{nav.title}</Text>
              <Text style={[styles.textCenter, { marginTop: 8 }]}>{nav.name}</Text>
            </View>
          ))}
        </Card.Body>
      </Card>
      <Card style={[styles.card, { marginTop: 10 }]}>
        <Card.Header style={styles.cardHeader} title="订单管理" extra={<Icon style={{ textAlign: "right" }} name="right" size="sm" />} />
        <Card.Body style={{ flexDirection: "row" }}>
          {OrderNav.map((nav, index) => (
            <View style={[styles.cardBodyItem, { borderRightWidth: index === OrderNav.length - 1 ? 0 : 0.4 }]} key={nav.name}>
              <Text style={[styles.textCenter, { fontSize: 20 }]}>{nav.title}</Text>
              <Text style={[styles.textCenter, { marginTop: 8 }]}>{nav.name}</Text>
            </View>
          ))}
        </Card.Body>
      </Card>
      <Card style={[styles.card, { marginTop: 10 }]}>
        <Card.Header style={styles.cardHeader} title="我的应用" />
        <Card.Body style={{ flexDirection: "row" }}>
          <View style={styles.cardBodyItem}>
            <Icon style={[styles.textCenter, { fontSize: 24 }]} name="shop" color="black" />
            <Text style={[styles.textCenter, { marginTop: 8 }]}>商品管理</Text>
          </View>
          <View style={styles.cardBodyItem}>
            <Icon style={[styles.textCenter, { fontSize: 24 }]} name="shopping-cart" color="black" />
            <Text style={[styles.textCenter, { marginTop: 8 }]}>商品管理</Text>
          </View>
          <View style={[styles.cardBodyItem, { borderRightWidth: 0 }]}>
            <Icon style={[styles.textCenter, { fontSize: 24 }]} name="wallet" color="black" />
            <Text style={[styles.textCenter, { marginTop: 8 }]}>商品管理</Text>
          </View>
        </Card.Body>
      </Card>
    </ScrollViewContainer>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: 10,
    position: "relative",
    top: -20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardHeader: {
    paddingVertical: 10,
  },
  cardBodyItem: {
    flex: 1 / 3,
    paddingVertical: 12,
    borderRightWidth: 0.4,
    borderColor: "#c8c8c8",
  },
  textCenter: {
    textAlign: "center",
  },
})
