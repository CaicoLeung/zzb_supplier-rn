import * as React from "react"
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native"
import { Button, Card, Icon } from "@ant-design/react-native"
import { RootStackParamList } from "types"
import { StackNavigationProp } from "@react-navigation/stack"
import styled from "styled-components/native"
import { SupGoodsTabs } from "@/helpers/goods"
import { useNavigation } from "@react-navigation/native"

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
  padding-top: 70px;
  padding-bottom: 30px;
`
const ImageBackgroundInner = styled.View`
  flex: 1;
  height: 70px;
  padding-left: 20px;
  padding-right: 20px;
  align-items: center;
  flex-direction: row;
`
const AvatarBox = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-right: 10px;
`
const AccountInfoBox = styled.View`
  flex: 1;
  align-content: center;
  background-color: transparent;
  color: #ffffff;
`
const BaseText = styled.Text`
  color: #ffffff;
  font-size: 14px;
  font-weight: 300;
`
const TitleText = styled(BaseText)`
  font-size: 20px;
  margin-bottom: 8px;
  font-weight: 600;
`

export default function TabOneScreen() {
  const navigation = useNavigation<ProfileScreenNavigationProp>()
  const GoodsNav = [
    {
      title: "13",
      name: "售卖中",
      onPress: () => navigation.navigate("GoodsList", { tab: SupGoodsTabs.售卖中 }),
    },
    {
      title: "23",
      name: "已下架",
      onPress: () => navigation.navigate("GoodsList", { tab: SupGoodsTabs.已下架 }),
    },
    {
      title: "＋",
      name: "添加商品",
      onPress: () => navigation.navigate("GoodsCreate", { uri: '' }),
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
            <Button size="small" onPress={() => navigation.navigate("Login")}>退出登录</Button>
          </ImageBackgroundInner>
        </ImageBackgroundBox>
      </HeaderView>
      <TouchableHighlight style={styles.card} onPress={() => navigation.navigate("GoodsList", { tab: SupGoodsTabs.售卖中 })}>
        <Card>
          <Card.Header style={styles.cardHeader} title="商品管理" extra={<Icon style={{ textAlign: "right" }} name="right" size="sm" />} />
          <Card.Body style={{ flexDirection: "row" }}>
            {GoodsNav.map((nav, index) => (
              <TouchableOpacity style={[styles.cardBodyItem, { borderRightWidth: index === GoodsNav.length - 1 ? 0 : 0.4 }]} key={nav.name} onPress={nav.onPress}>
                <Text style={[styles.textCenter, { fontSize: 20 }]}>{nav.title}</Text>
                <Text style={[styles.textCenter, { marginTop: 8 }]}>{nav.name}</Text>
              </TouchableOpacity>
            ))}
          </Card.Body>
        </Card>
      </TouchableHighlight>
      <TouchableHighlight style={[styles.card, { marginTop: 10 }]} onPress={() => navigation.navigate("OrderList")}>
        <Card>
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
      </TouchableHighlight>
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
