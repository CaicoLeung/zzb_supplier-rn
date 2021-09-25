/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import GoodsList from "@/screens/Goods/List"
import GoodsDetail from "@/screens/Goods/Detail"
import OrderList from "@/screens/Order/List"
import OrderDetail from "@/screens/Order/Detail"
import TabHome from "@/screens/TabHome"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import * as React from "react"
import { ColorSchemeName } from "react-native"

import NotFoundScreen from "../screens/NotFoundScreen"
import { RootStackParamList } from "../types"
import LinkingConfiguration from "./LinkingConfiguration"
import GoodsModify from "@/screens/Goods/Modify"
import CameraModal from "@/screens/Goods/CameraModal"
import LoginPage from "@/screens/Login";

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  )
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>()
const OrderStack = createStackNavigator()

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={TabHome} options={{ title: "工作台" }} />
      <Stack.Screen name="Login" component={LoginPage} options={{ title: "登录", headerShown: false }} />
      <OrderStack.Screen name="OrderList" component={OrderList} options={{ title: "订单管理" }} />
      <OrderStack.Screen name="OrderDetail" component={OrderDetail} options={{ title: "订单详情" }} />
      <OrderStack.Screen name="GoodsCreate" component={GoodsModify} options={{ title: "添加商品" }} />
      <OrderStack.Screen name="GoodsList" component={GoodsList} options={{ title: "商品管理" }} />
      <OrderStack.Screen name="GoodsDetail" component={GoodsDetail} options={{ title: "商品详情" }} />
      <OrderStack.Screen name="CameraModal" component={CameraModal} options={{ headerShown: false, headerBackTitle: "返回", title: "拍照", presentation: "modal" }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: "404" }} />
    </Stack.Navigator>
  )
}
