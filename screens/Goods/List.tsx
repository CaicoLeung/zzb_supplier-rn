import React, { useState } from "react"
import { View } from "@/components/Themed"
import { Dimensions, FlatList, ListRenderItemInfo, Modal, RefreshControl, SafeAreaView, StyleProp, StyleSheet, Text, ViewStyle } from "react-native"
import { SearchBar } from "@ant-design/react-native"
import { ShelfSupGoodsTab, SupGoodsTabs } from "@/helpers/goods"
import { Goods } from "@/types/goods"
import { GoodsCart } from "@/components/GoodsCart"
import { Upload } from "@/types/upload"
import ImageViewer from "react-native-image-zoom-viewer"
import { IImageInfo } from "react-native-image-zoom-viewer/built/image-viewer.type"
import { getSupGoodsList } from "@/services/goods"
import { createMaterialTopTabNavigator, MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs"
import { useRequest } from "ahooks"
import { useMemo } from "react"

const pageLimit = 10
const Tabs = createMaterialTopTabNavigator()

interface ListViewProps {
  type: SupGoodsTabs
}

function ListView(props: ListViewProps) {
  const flatListRef = React.useRef<FlatList>(null)
  const [current, setCurrent] = React.useState(1)
  const [datasource, setDatasource] = React.useState<Goods.SupGoods<Upload.Image[]>[]>([])
  const [refreshing, setRefreshing] = React.useState(false)
  const [visibleState, setVisibleState] = React.useState<{ visible: boolean; pictures: Upload.Image[] }>({ visible: false, pictures: [] })

  const defaultParams: Goods.SupGoodsPageParams = useMemo(
    () => ({
      keyword: "",
      current: 1,
      tab: props.type === SupGoodsTabs.售卖中 ? ShelfSupGoodsTab.上架 : ShelfSupGoodsTab.下架,
      pageSize: pageLimit,
    }),
    [props.type]
  )

  const req = useRequest(getSupGoodsList, {
    defaultParams: [defaultParams],
    onSuccess: ({ obj }) => {
      setCurrent(obj.page.page)
      if (obj.page.page > 1) {
        setDatasource([...datasource, ...obj.data])
      } else {
        setDatasource(obj.data)
      }
    },
  })

  const onRefresh = async () => {
    console.log("------onRefresh------")
    setRefreshing(true)
    const params: Goods.SupGoodsPageParams = {
      keyword: "",
      tab: props.type === SupGoodsTabs.售卖中 ? ShelfSupGoodsTab.上架 : ShelfSupGoodsTab.下架,
      page: 1,
      limit: pageLimit,
    }
    await req.run(params)
    setRefreshing(false)
  }

  const onEndReached = async (info: { distanceFromEnd: number }) => {
    console.log("------onEndReached------")
    if (current === req.data?.obj.page.last_page) {
      return
    }
    const params: Goods.SupGoodsPageParams = {
      keyword: "",
      tab: props.type === SupGoodsTabs.售卖中 ? ShelfSupGoodsTab.上架 : ShelfSupGoodsTab.下架,
      page: current + 1,
      limit: pageLimit,
    }
    await req.run(params)
  }

  const keyExtractor = (item: Goods.SupGoods<Upload.Image[]>, index: number) => {
    return `${item.id}-${index}`
  }

  const renderItem = (info: ListRenderItemInfo<Goods.SupGoods<Upload.Image[]>>) => {
    const item = info.item
    return (
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
  }
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
    <View style={{ height: "100%" }}>
      <FlatList<Goods.SupGoods<Upload.Image[]>>
        ref={flatListRef}
        data={datasource}
        renderItem={renderItem}
        numColumns={1}
        getItemLayout={(data, index) => ({ length: 128, index, offset: 128 * index })}
        keyExtractor={keyExtractor}
        onEndReachedThreshold={0.01}
        onEndReached={onEndReached}
        // onScrollEndDrag={() => setCanLoadNext(true)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
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

type ProfileScreenNavigationProp = MaterialTopTabNavigationProp<{
  [SupGoodsTabs.售卖中]: undefined
  [SupGoodsTabs.已下架]: undefined
}>

type Props = {
  navigation: ProfileScreenNavigationProp
}

export default function GoodsList({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState<SupGoodsTabs>(SupGoodsTabs.售卖中)
  const [keyword, setKeyword] = useState("")

  const getInicatoeStyle = (width: number): StyleProp<ViewStyle> => {
    return {
      width,
      left: (Dimensions.get("window").width / 2 - width) / 2,
      backgroundColor: "#1989fa",
    }
  }

  const ListViewRender = useMemo<Record<SupGoodsTabs, React.ComponentType<any>>>(
    () => ({
      [SupGoodsTabs.售卖中]: React.memo(() => <ListView type={SupGoodsTabs.售卖中} />),
      [SupGoodsTabs.已下架]: React.memo(() => <ListView type={SupGoodsTabs.已下架} />),
    }),
    []
  )

  React.useEffect(() => {
    console.log(navigation.getState())
    const unsubscribe = navigation.addListener("focus", (e) => {
      console.log(e)
    })
    return unsubscribe
  }, [navigation])

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar placeholder="请输入搜索商品名称、编号" value={keyword} onChange={setKeyword} />
      <Tabs.Navigator
        initialRouteName={activeTab}
        screenOptions={{
          tabBarActiveTintColor: "#1989fa",
          tabBarLabelStyle: { fontSize: 16, fontWeight: "600" },
          tabBarIndicatorStyle: getInicatoeStyle(50),
        }}
      >
        <Tabs.Screen name={SupGoodsTabs.售卖中} component={ListViewRender[SupGoodsTabs.售卖中]} />
        <Tabs.Screen name={SupGoodsTabs.已下架} component={ListViewRender[SupGoodsTabs.已下架]} />
      </Tabs.Navigator>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
