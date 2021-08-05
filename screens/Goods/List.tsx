import React from "react"
import { View } from "@/components/Themed"
import { ScrollView, StyleSheet, Text } from "react-native"
import { ListView, SearchBar, Tabs } from "@ant-design/react-native"
import { SupGoodsTabs } from "@/helpers/goods"
import { TabData } from "@ant-design/react-native/lib/tabs/PropsType"
import { Goods } from "@/types/goods"
import { ParamListBase } from "@react-navigation/routers"
import { GoodsCart } from "@/components/GoodsCart"

interface ParamList extends ParamListBase {
  [SupGoodsTabs.售卖中]: undefined
  [SupGoodsTabs.已下架]: undefined
}

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
      let rowData: Goods.SupGoods[] = Array.from({ length: pageLimit }, (_, index) => ({
        id: index + skip,
        goods_no: "AUR10044",
        name: "水滴型翡翠帝王绿豆豆，编辑后的商品0713🥔加长加长加长加长加长加长加长加长加长加长加长加长加长加长加长加长加长加长加长加长加长" + (index + skip),
        description: "",
        images: "[2826]",
        user_id: 332,
        status: 1,
        cate_str: "黄金",
        style: "戒指",
        origin_code: "08020921",
        price_cost: 1728381.472,
        stock_num: 10,
        sur_num: 0,
        add_goods_cycle: "7-15天",
        create_time: "2021-08-02T09:22:18Z",
        update_time: "2021-08-02T09:22:18Z",
        cover: "https://oss.z.vip/BwyxApi/static/upload/202108/02/1627867310131571121.jpg",
        opt_user_id: 332,
        cate_id: 1,
        style_id: 0,
        weight: 1,
        price: 0,
        is_sale: 1,
        rel_id: 0,
        process: 1,
        remark: "[]",
        pictures: [
          {
            id: 2826,
            type: "image",
            url: "https://oss.z.vip/BwyxApi/static/upload/202108/02/1627867310131571121.jpg",
            cover: "https://oss.z.vip/BwyxApi/static/upload/202108/02/1627867310131571121.jpg",
            file_info: '{"height":3024,"orientation":"up","width":4032}',
            file: "static/upload/202108/02/1627867310131571121.jpg",
            source: "0",
            source_id: 0,
            rate: "",
            title: "",
            sort: 0,
            create_time: "2021-08-02T09:21:51Z",
            update_time: "2021-08-02T09:21:51Z",
          },
        ],
      }))
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
    return `${item.id}-${index}`
  }

  const renderItem = (item: Goods.SupGoods) => (
    <GoodsCart cover={item.cover} name={item.name} desc={`销量: ${item.sur_num}`} tags={[item.cate_str, item.style]} num={`现货库存: ${item.stock_num}`} price={item.price_cost} />
  )

  return (
    <View style={styles.container}>
      <SearchBar placeholder="请输入搜索商品名称、编号" />
      <Tabs tabs={tabs} animated>
        <View>
          <ListView<Goods.SupGoods> onFetch={onFetch} keyExtractor={keyExtractor} renderItem={renderItem} numColumns={1} />
        </View>
        <View>
          <Text>121212121</Text>
        </View>
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
