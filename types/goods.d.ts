import { PayType } from "#HELPERS/order";
import { StrNum } from ".";
import { Pagination } from "./pagination";
import { Upload } from "./upload";

export declare namespace Goods {
  export interface WholesalerGoodsPageParams extends Pagination.Params {
    keyword?: string;
  }
  export interface WholesalerGoodsPageResult extends Pagination.Result {
    data: WholesalerGoods[];
  }

  export interface WholesalerGoods {
    car_num: number;
    id: number;
    goods_no: string;
    name: string;
    description: string;
    user_id: number;
    status: number;
    cate_str: string;
    style: string;
    origin_code: string;
    price_cost: number;
    stock_num: number;
    sur_num: number;
    add_goods_cycle: string;
    create_time: string;
    update_time: string;
    cover: string;
    opt_user_id: number;
    cate_id: number;
    style_id: number;
    weight: number;
    images: string;
    price: number;
    pictures: Upload.Image[];
    weight: number;
    process: number;
    gold_price: number;
  }

  export interface SupGoodsPageParams extends Pagination.Params {
    keyword?: string;
    status?: StrNum;
    /* 下架类型 */
    down_type?: string;
    /* 供应商ID */
    user_id?: number;
    /* 类目ID */
    cate_id?: number;
  }

  export interface SupGoodsPageResult extends Pagination.Result {
    data: SupGoods<Upload.Image[]>[];
  }

  export interface SupGoods<T = string> {
    id?: StrNum;
    goods_no?: string;
    name: string;
    description?: string;
    user_id?: StrNum;
    status?: StrNum;
    cate_id: number;
    cate_str: string;
    style: string;
    style_id: number;
    origin_code: string;
    price_cost: StrNum;
    stock_num: StrNum;
    sur_num: StrNum;
    add_goods_cycle: string;
    create_time?: string;
    update_time?: string;
    cover: string;
    opt_user_id?: StrNum;
    images: T;
  }

  export interface shelfGoodsParams {
    ids: string;
    status: number;
    reason?: string;
  }

  export interface CateItem {
    name: string;
    code: string;
    id: number;
    price_type: string;
  }

  export type StyleItem = Omit<CateItem, "price_type">;
  export interface ShopCarResult {
    detail_list: ShopCar[];
    num: number;
    total_amount: number;
  }

  export interface ShopCar {
    id: number;
    goods_id: number;
    goods_name: string;
    goods_cate_str: string;
    goods_style: string;
    goods_price: number;
    goods_amount: number;
    cover: string;
    goods_num: number;
    is_valid: boolean;
    pictures: Upload.Image[];
    weight: number;
    process: number;
    gold_price: number;
    price_cost: number;
    sale_stock: number;
  }

  export interface PlaceGoodsInfoResult {
    goods_list: ShopCar[];
  }

  export interface SubmitOrderParams {
    shop_car_ids: StrNum[];
    province: string;
    city: string;
    district: string;
    address: string;
    name: string;
    phone: string;
    express_type: number;
  }
}
