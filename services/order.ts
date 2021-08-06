import { StrNum } from "@/types/index";
import { Goods } from "@/types/goods";
import { Order } from "@/types/order";
import fetch from "@/libs/fetch";

/* 订单详情 */
export async function supOrderInfo(id: StrNum) {
  return fetch.get<Order.OrderDetail>(`/sup/orders/${id}`);
}

/* 订单发货详情 */
export async function supOrderSendInfo(id: StrNum) {
  return fetch.get<Order.OrderDetail>(`/sup/orders/${id}/send`);
}

/* 供应商商品列表 */
export async function getSupOrderList(params: Order.SupOrderPageParams) {
  return fetch.get<Order.SupOrderPageResult>("/sup/orders", params);
}

/* 包裹列表 */
export async function getPackageList(id: StrNum) {
  return fetch.get<Order.PackageResult>(`/sup/orders/${id}/sup_goods`);
}

/* 物流信息 */
export async function getExpressInfo(id: StrNum) {
  return fetch.get<Order.LogisticsResult>(`/sup/orders_send/${id}/express`);
}

/* 物流公司 */
export async function getExpressCompany() {
  return fetch.get<Order.ExpressCompanyItem[]>("/common/express_company");
}

/* 立即发货 */
export async function sendExpress([id, params]: [StrNum, Order.SendExpressParams]) {
  return fetch.post<Order.LogisticsResult>(`/sup/orders/${id}/send`, params);
}
