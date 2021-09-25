/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import type { SupGoodsTabs } from "./helpers/goods"

export type RootStackParamList = {
  Root: undefined
  Login: undefined
  OrderList: undefined
  OrderDetail: undefined
  GoodsList: {
    tab?: SupGoodsTabs
  }
  CameraModal: undefined
  GoodsDetail: undefined
  GoodsCreate: {
    uri: string
  }
  NotFound: undefined
}

export type BottomTabParamList = {
  Home: undefined
  Mine: undefined
}

export type TabOneParamList = {
  TabOneScreen: undefined
}

export type TabTwoParamList = {
  TabTwoScreen: undefined
}
