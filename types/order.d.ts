import { StrNum } from "./index";
import { Pagination } from "./pagination";

export declare namespace Order {
  export interface SupOrderPageParams extends Pagination.Params {
    status?: number;
    key_word?: string;
  }

  export interface SupOrderPageResult extends Pagination.Result {
    data: SupOrder[];
  }

  export interface SupOrder {
    order_list: OrderItem[];
    order_id: number;
    create_time_str: string;
    goods_total_num: number;
    pay_amount: number;
    status: number;
    status_str: string;
    express_text: string;
    package_num: number;
    send_id: number;
    close_status_str: string;
  }

  export interface OrderItem {
    order_child_id: number;
    goods_name: string;
    goods_cate_str: string;
    goods_style: string;
    goods_price: number;
    goods_amount: number;
    cover: string;
    goods_num: number;
    send_num: number;
    ready_num: number;
    status: number;
    status_str: string;
  }

  export interface shelfOrderParams {
    ids: string;
    status: number;
    reason?: string;
  }

  export interface CateItem {
    name: string;
    code: string;
  }

  export type StyleItem = CateItem;

  export interface OrderDetail {
    address: Addres;
    order_list: OrderItem[];
    express_info: string;
    pay_type: number;
    pay_type_str: string;
    order_amount: number;
    pay_amount: number;
    order_no: string;
    create_time: string;
    pay_time: string;
    id: number;
    finish_time: string;
    cancel_time: string;
    send_time: string;
    top_text: string;
    express_text: string;
    package_num: number;
    status: number;
    send_id: number;
  }

  export interface OrderItem {
    order_child_id: number;
    goods_name: string;
    goods_cate_str: string;
    goods_style: string;
    goods_price: number;
    goods_amount: number;
    cover: string;
    goods_num: number;
    send_num: number;
    ready_num: number;
    status: number;
    status_str: string;
    goods_no: string;
    current_send_num?: number;
  }

  export interface Addres {
    province: string;
    city: string;
    district: string;
    address: string;
    name: string;
    phone: string;
  }

  export interface PackageResult {
    top_text: string;
    package_list: PackageItem[];
  }

  export interface PackageItem {
    goods_list: GoodsItem[];
    express_dynamic_text: string;
    package_sqe: string;
    express_company: string;
    express_no: string;
    send_id: number;
  }

  export interface GoodsItem {
    order_child_id: number;
    goods_name: string;
    goods_cate_str: string;
    goods_style: string;
    goods_price: number;
    goods_amount: number;
    cover: string;
    goods_num: number;
    send_num: number;
    ready_num: number;
    status: number;
    status_str: string;
    goods_no: string;
  }

  export interface LogisticsResult {
    supplier_goods_info_list: SupplierGoodsInfoItem[];
    express_company: string;
    express_no: string;
    express_type: number;
    opt_picture_list: [];
    express_list: ExpressItem[];
  }

  export interface ExpressItem {
    express_time: string;
    content: string;
  }

  export interface SupplierGoodsInfoItem {
    cover: string;
    send_text: string;
    sup_goods_id: number;
  }

  export interface SendExpressParams<T = string[]> {
    express_company: string;
    express_no: string;
    express_type: number;
    opt_picture_list: T;
    /* 订单发货详情格式[{order_child_id:1,send_num:2}] */
    send_info_list: Array<{ order_child_id: number; send_num: number }>;
  }

  export interface ExpressCompanyItem {
    code: string;
    company: string;
  }
}
