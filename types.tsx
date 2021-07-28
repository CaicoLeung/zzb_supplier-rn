/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined
  Order: {
    screen: 'Detail' | 'List'
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
