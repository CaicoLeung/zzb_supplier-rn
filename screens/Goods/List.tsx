import React, { useState } from "react"
import { View } from "@/components/Themed"
import { Dimensions, Modal, ScrollView, StyleProp, StyleSheet, Text, ViewStyle } from "react-native"
import { ListView, SearchBar } from "@ant-design/react-native"
import { ShelfSupGoodsTab, SupGoodsTabs } from "@/helpers/goods"
import { TabData } from "@ant-design/react-native/lib/tabs/PropsType"
import { Goods } from "@/types/goods"
import { ParamListBase } from "@react-navigation/routers"
import { GoodsCart } from "@/components/GoodsCart"
import { Upload } from "@/types/upload"
import ImageViewer from "react-native-image-zoom-viewer"
import { IImageInfo } from "react-native-image-zoom-viewer/built/image-viewer.type"
import { getSupGoodsList } from "@/services/goods"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { NavigationContainer, RouteConfig } from "@react-navigation/native"

interface ParamList extends ParamListBase {
  [SupGoodsTabs.售卖中]: undefined
  [SupGoodsTabs.已下架]: undefined
}

const Tabs = createMaterialTopTabNavigator()

function ListViewRender() {
  const [visibleState, setVisibleState] = React.useState<{ visible: boolean; pictures: Upload.Image[] }>({ visible: false, pictures: [] })
  const onFetch = async (currentPage: number, startFetch: (...args: any[]) => any, abortFetch: () => void) => {
    try {
      const pageLimit = 20
      const params: Goods.SupGoodsPageParams = {
        keyword: "",
        tab: ShelfSupGoodsTab.上架,
        current: currentPage,
        pageSize: pageLimit,
      }
      const { obj } = await getSupGoodsList(params)
      console.log(obj)
      startFetch(obj.data, pageLimit)
    } catch (error) {
      console.log(error)
      abortFetch()
    }
  }

  const keyExtractor = (item: Goods.SupGoods<Upload.Image[]>, index: number) => {
    return `${item.id}-${index}`
  }

  const renderItem = (item: Goods.SupGoods<Upload.Image[]>) => (
    <GoodsCart
      cover={item.cover}
      name={item.name}
      desc={`销量: ${item.sur_num}`}
      tags={[item.cate_str, item.style]}
      num={`现货库存: ${item.stock_num}`}
      price={item.price_cost}
      onPreview={() => setVisibleState({ visible: true, pictures: item.pictures })}
    />
  )

  const formatToImageUrls = (pictures?: Upload.Image[]): IImageInfo[] => {
    if (!pictures?.length) {
      return []
    }
    return pictures?.map((item) => ({
      url: item.cover,
      props: {
        defaultSource: require("zzb-sup/assets/images/goods-default.png"),
      },
    }))
  }
  return (
    <View style={{ flex: 1 }}>
      <ListView<Goods.SupGoods<Upload.Image[]>> onFetch={onFetch} keyExtractor={keyExtractor} renderItem={renderItem} numColumns={1} />
      <Modal visible={visibleState.visible} transparent>
        <ImageViewer
          imageUrls={formatToImageUrls(visibleState.pictures)}
          loadingRender={() => <Text>加载中...</Text>}
          onClick={() => setVisibleState({ visible: false, pictures: [] })}
        />
      </Modal>
    </View>
  )
}

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>A看过我</Text>
        <Text>B看过我</Text>
      </View>
    )
  }
}

export default function GoodsList() {
  const [keyword, setKeyword] = useState("")

  const getInicatoeStyle = (width: number): StyleProp<ViewStyle> => {
    return {
      width,
      left: (Dimensions.get("window").width / 2 - width) / 2,
      backgroundColor: "#1989fa",
    }
  }

  return (
    <View style={styles.container}>
      <SearchBar placeholder="请输入搜索商品名称、编号" value={keyword} onChange={setKeyword} />
      <Tabs.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#1989fa",
          tabBarLabelStyle: { fontSize: 16, fontWeight: "600" },
          tabBarIndicatorStyle: getInicatoeStyle(50),
        }}
      >
        <Tabs.Screen name={SupGoodsTabs.售卖中} component={ListViewRender} />
        <Tabs.Screen name={SupGoodsTabs.已下架} component={ListViewRender} />
      </Tabs.Navigator>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
})
