import { StrNum } from "./index";

export declare namespace Home {
  export interface DataStat {
    goods_sale: number;
    goods_shelf: number;
    status_cancel: number;
    status_finish: number;
    status_ready_send: number;
    status_send: number;
    total_num: number;
  }

  export interface Address {
    id?: StrNum;
    phone: string;
    contact: string;
    province: string;
    city: string;
    district: string;
    address: string;
    is_default: number;
    area_code: string;
  }
}
