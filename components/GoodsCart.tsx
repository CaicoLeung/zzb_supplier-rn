import * as React from "react"
import { StyleSheet, Image, Text, Pressable } from "react-native"
import { View } from "./Themed"

interface GoodsCartProps {
  cover: string
  name: string
  desc: string | React.ReactNode
  tags: (string | React.ReactNode)[]
  price: number
  num: number | string
  onPreview?: () => void
}

const renderPrice = (value: number) => {
  const integer = Math.trunc(value).toLocaleString()
  const decimal = `${+(value % 1).toFixed(2) * 100}`.padStart(2, "0")
  return (
    <>
      <Text style={{ fontSize: 22, fontWeight: "600" }}>{integer}.</Text>
      <Text style={{ fontSize: 14, fontWeight: "600" }}>{decimal}</Text>
    </>
  )
}

export function GoodsCart(props: GoodsCartProps) {
  return (
    <>
      <View style={styles.container}>
        <Pressable onPress={props.onPreview}>
          <Image
            style={styles.image}
            width={100}
            height={100}
            resizeMode="cover"
            defaultSource={require("zzb-sup/assets/images/goods-default.png")}
            source={{ uri: props.cover }}
          />
        </Pressable>
        <View style={styles.content}>
          <Text numberOfLines={2} style={styles.nameText}>
            {props.name}
          </Text>
          <Text style={styles.descText}>{props.desc}</Text>
          <View style={styles.tags}>
            {props.tags?.map((tag, index) => (
              <View key={index} style={styles.tagsItem}>
                {typeof tag === "string" ? <Text style={styles.tagsItemText}>{tag}</Text> : tag}
              </View>
            ))}
          </View>
          <View style={[styles.spaceBetween, { alignItems: "flex-end" }]}>
            <Text>¥{renderPrice(props.price)}</Text>
            <Text>{props.num || 0}</Text>
          </View>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 6,
    marginRight: 8,
  },
  content: {
    flex: 1,
  },
  nameText: {
    color: "#323233",
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 20,
  },
  descText: {
    color: "#646566",
    fontSize: 14,
    lineHeight: 26,
  },
  spaceBetween: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tags: {
    flex: 1,
    flexDirection: "row",
  },
  tagsItem: {
    paddingHorizontal: 4,
    height: 16,
    borderWidth: 1,
    borderColor: "#ee0a24",
    borderRadius: 4,
    marginRight: 4,
  },
  tagsItemText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    color: "#ee0a24",
  },
  numText: {
    color: "#969799",
    fontSize: 16,
  },
})
