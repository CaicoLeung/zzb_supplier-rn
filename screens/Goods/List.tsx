import React from "react"
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
import { useNavigationState } from "@react-navigation/core"

interface ListViewProps {
  type: SupGoodsTabs
}

interface ListViewRefType {
  search: (keyword: string) => void
}

type ParamListBase = {
  [SupGoodsTabs.售卖中]: undefined
  [SupGoodsTabs.已下架]: undefined
}

const pageLimit = 10
const Tabs = createMaterialTopTabNavigator<ParamListBase>()

function ListView(props: ListViewProps, ref: React.ForwardedRef<ListViewRefType>) {
  const flatListRef = React.useRef<FlatList>(null)
  const [keyword, setKeyword] = React.useState("")
  const [current, setCurrent] = React.useState(1)
  const [datasource, setDatasource] = React.useState<Goods.SupGoods<Upload.Image[]>[]>([])
  const [refreshing, setRefreshing] = React.useState(false)
  const [visibleState, setVisibleState] = React.useState<{ visible: boolean; pictures: Upload.Image[] }>({ visible: false, pictures: [] })

  const index = useNavigationState((state) => state.index)

  const tab = useMemo(() => (props.type === SupGoodsTabs.售卖中 ? ShelfSupGoodsTab.上架 : ShelfSupGoodsTab.下架), [index])

  const defaultParams: Goods.SupGoodsPageParams = useMemo(
    () => ({
      keyword: "",
      current: 1,
      tab,
      pageSize: pageLimit,
    }),
    [tab]
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

  React.useImperativeHandle<ListViewRefType, ListViewRefType>(
    ref,
    () => ({
      search: (value: string) => {
        setKeyword(value)
        req.run({ ...defaultParams, keyword: value })
      },
    }),
    []
  )

  const canLoadNext = useMemo(() => {
    const data = req.data
    if (data) {
      return data.obj.page.page < data.obj.page.last_page
    }
    return true
  }, [req])

  const listFooterComponentMap = useMemo(
    () =>
      new Map([
        [
          true,
          <View style={styles.listFooter}>
            <Text style={styles.listFooterText}>在加载中...</Text>
          </View>,
        ],
        [
          false,
          <View style={styles.listFooter}>
            <Text style={styles.listFooterText}>没有更多了</Text>
          </View>,
        ],
      ]),
    [canLoadNext]
  )

  const onRefresh = async () => {
    setRefreshing(true)
    const params: Goods.SupGoodsPageParams = {
      keyword,
      tab,
      page: 1,
      limit: pageLimit,
    }
    await req.run(params)
    setRefreshing(false)
  }

  const onEndReached = async (info: { distanceFromEnd: number }) => {
    if (!canLoadNext) {
      return
    }
    const params: Goods.SupGoodsPageParams = {
      keyword,
      tab,
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
        style={{ backgroundColor: "#f6f6f6" }}
        ref={flatListRef}
        data={datasource}
        renderItem={renderItem}
        numColumns={1}
        getItemLayout={(data, index) => ({ length: 128, index, offset: 128 * index })}
        keyExtractor={keyExtractor}
        onEndReachedThreshold={0.1}
        onEndReached={onEndReached}
        ListFooterComponent={listFooterComponentMap.get(canLoadNext)}
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
  const sellingListViewRef = React.useRef<ListViewRefType>(null)
  const removedListViewRef = React.useRef<ListViewRefType>(null)
  const [activeTab, setActiveTab] = React.useState<SupGoodsTabs>(SupGoodsTabs.售卖中)
  const [keyword, setKeyword] = React.useState("")

  const getInicatoeStyle = (width: number): StyleProp<ViewStyle> => {
    return {
      width,
      left: (Dimensions.get("window").width / 2 - width) / 2,
      backgroundColor: "#1989fa",
    }
  }

  const ForwardListView = React.forwardRef<ListViewRefType, ListViewProps>(ListView)

  const ListViewRender = useMemo(
    () => ({
      [SupGoodsTabs.售卖中]: React.memo(() => <ForwardListView ref={sellingListViewRef} type={SupGoodsTabs.售卖中} />),
      [SupGoodsTabs.已下架]: React.memo(() => <ForwardListView ref={removedListViewRef} type={SupGoodsTabs.已下架} />),
    }),
    [sellingListViewRef, removedListViewRef]
  )

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder="请输入搜索商品名称、编号"
        value={keyword}
        onChange={setKeyword}
        onSubmit={activeTab === SupGoodsTabs.售卖中 ? sellingListViewRef.current?.search : removedListViewRef.current?.search}
      />
      <Tabs.Navigator
        initialRouteName={activeTab}
        screenOptions={{
          tabBarActiveTintColor: "#1989fa",
          tabBarLabelStyle: { fontSize: 16, fontWeight: "600" },
          tabBarIndicatorStyle: getInicatoeStyle(50),
        }}
      >
        <Tabs.Screen name={SupGoodsTabs.售卖中} component={ListViewRender[SupGoodsTabs.售卖中]} listeners={{ focus: () => setActiveTab(SupGoodsTabs.售卖中) }} />
        <Tabs.Screen name={SupGoodsTabs.已下架} component={ListViewRender[SupGoodsTabs.已下架]} listeners={{ focus: () => setActiveTab(SupGoodsTabs.已下架) }} />
      </Tabs.Navigator>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listFooter: {
    flex: 1,
    paddingVertical: 6,
    backgroundColor: "transparent",
  },
  listFooterText: {
    fontSize: 16,
    textAlign: "center",
  },
})
