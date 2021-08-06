import { StrNum } from "@/types/index";
import { Goods } from "@/types/goods";
import { Upload } from "@/types/upload";
import fetch from "@/libs/fetch";

/* 创建商品 */
export async function addSupGoods(params: Goods.SupGoods) {
  return fetch.post("/sup/sup_goods", params);
}

/* 商品详情 */
export async function supGoodsInfo(id: StrNum) {
  return fetch.get<Goods.SupGoods<Upload.Image[]>>(`/sup/sup_goods/${id}`);
}

/* 编辑商品 */
export async function editGoodsInfo([id, params]: [StrNum, Goods.SupGoods]) {
  return fetch.put(`/sup/sup_goods/${id}`, params);
}

/* 供应商商品列表 */
export async function getSupGoodsList(params: Goods.SupGoodsPageParams) {
  return fetch.get<Goods.SupGoodsPageResult>("/sup/supplier_list", params);
}

/* 上下架商品 */
export async function shelfSupGoods(id: StrNum) {
  return fetch.post(`/sup/sup_goods/${id}/status`, {});
}

/* 修改库存 */
export async function modifySupGoodsStockNum(id: StrNum, stock_num: StrNum, type: -1 | 1) {
  return fetch.post(`/sup/sup_goods/${id}/store_num`, { stock_num, type });
}

/* 商品类目下拉 */
export async function goodsCates() {
  return fetch.get<Goods.CateItem[]>("/common/sup_goods/cate_str");
}

/* 商品款式下拉 */
export async function goodsStyles() {
  return fetch.get<Goods.StyleItem[]>("/common/sup_goods/style");
}
/* 商品计数接口 */
export async function goodsCount(status: number) {
  return fetch.get<string>("/sup/sup_goods/num", { status });
}
