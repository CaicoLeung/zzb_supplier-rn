/* 订单状态 */
export enum OrderStatus {
  全部 = -2,
  待付款 = 0,
  待发货 = 5,
  部分发货 = 10,
  全部发货 = 15,
  已完成 = 20,
  申请取消 = 25,
  已关闭 = -1
}

/* 订单查询状态 */
export enum OrderSearchStatus {
  全部 = -2,
  待付款 = 0,
  待发货 = 1,
  待收货 = 2,
  已完成 = 3,
  已关闭 = -1
}

export enum PayType {
  担保交易 = 1,
  微信支付 = 2
}

export enum ExpressType {
  物流配送 = 0,
  送货上门 = 1,
  自提 = 2
}
