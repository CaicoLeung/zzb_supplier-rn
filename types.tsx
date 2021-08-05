/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import type { SupGoodsTabs } from "./helpers/goods"

export type RootStackParamList = {
  Root: undefined
  OrderList: undefined
  OrderDetail: undefined
  GoodsList: {
    tab?: SupGoodsTabs
  }
  GoodsDetail: undefined
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
