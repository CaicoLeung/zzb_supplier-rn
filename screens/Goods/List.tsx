import React from "react"
import { View } from "@/components/Themed"
import { ScrollView, StyleSheet, Text } from "react-native"
import { ListView, SearchBar, Tabs } from "@ant-design/react-native"
import { SupGoodsTabs } from "@/helpers/goods"
import { TabData } from "@ant-design/react-native/lib/tabs/PropsType"
import { Goods } from "@/types/goods"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { ParamListBase } from "@react-navigation/routers"

interface ParamList extends ParamListBase {
  [SupGoodsTabs.售卖中]: undefined
  [SupGoodsTabs.已下架]: undefined
}

// const Tabs = createMaterialTopTabNavigator<ParamList>()

export default function GoodsList() {
  const tabs = [{ title: SupGoodsTabs.售卖中 }, { title: SupGoodsTabs.已下架 }]
  const onTabsChange = (tab: TabData, index: number) => {
    console.log(tab, index)
  }
  const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

  const onFetch = async (currentPage: number, startFetch: (...args: any[]) => any, abortFetch: () => void) => {
    try {
      const pageLimit = 30
      const skip = (currentPage - 1) * pageLimit
      let rowData = Array.from({ length: pageLimit }, (_, index) => `item -> ${index + skip}`)
      if (currentPage === 3) {
        rowData = []
      }
      await sleep(2000)
      startFetch(rowData, pageLimit)
    } catch (error) {
      abortFetch()
    }
  }

  const keyExtractor = (item: Goods.SupGoods, index: number) => {
    return `goods-${item.id}-${index}`
  }

  const renderItem = (item: Goods.SupGoods) => {
    return (
      <View style={{ padding: 10 }}>
        <Text>{item}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <SearchBar placeholder="请输入搜索商品名称、编号" />
      <Tabs tabs={tabs} animated>
        <ScrollView>
          <ListView onFetch={onFetch} keyExtractor={keyExtractor} renderItem={renderItem} numColumns={1} />
        </ScrollView>
        <ScrollView>
          <View>
            <Text>121212121</Text>
          </View>
        </ScrollView>
      </Tabs>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  scrollView: {
    flex: 1,
  },
})
