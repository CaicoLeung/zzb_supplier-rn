import { UserType } from "#HELPERS/user";
import { Pagination } from "./pagination";

export declare namespace Acct {
  export interface AcctInfos {
    all_balance_repayment: number; // 剩余待还
    balance_withdrawable: number; //可提现
    balance_withdraw: number; // 提现中
    balance_credit_bill: number; // 已使用的授信额度
    balance_repayment: number; // 已还款金额
    status: number; // 是否已绑卡: 0 否,1 是
    member_name: string; // 开户名称
    acct_open_branch_name: string; // 开户银行
    tran_net_member_code: string; // 银行卡号
  }

  export interface RecordInfoResult extends Pagination.Result {
    data: RecordInfo[];
  }

  export interface RecordInfo {
    id: number;
    evidence_url: [];
    create_time: string;
    amount: number; //提现金额
    bank_card_no: string; //提现银行卡账号
    bank_card_name: string; //开户行名称
    bank_account_name: string; //开户名称
    remark: string; //备注
    withdraw_no: string; //提现流水号
    transaction_id: string; //支付流水号
    status: number; //状态 0待审核 1已取消 2不通过 3审核通过
  }

  export interface AcctLogResult extends Pagination.Result {
    data: AcctLog[];
  }

  export interface AcctLogPageParams extends Pagination.Params {
    type?: string;
    user_type?: UserType;
    month?: string;
    nickname?: string;
    target?: string;
    type?: string;
  }
  export interface BankPageParams {
    acct_open_branch_name: string;
    member_name: string;
    member_acct_no: string;
    mobile: string;
    id_card_num: string;
  }
  export interface Bank2PageParams {
    verify_code: string;
  }
  export interface AcctLog {
    id: number;
    user_id: number;
    amount: number;
    source: string;
    prev_balance: number;
    current_balance: number;
    order_no: string;
    targt: string;
    target_id: number;
    remark: string;
    type: string;
    operator: string;
    image: string;
    nickname: string;
    target_time: string;
    bank_name: string;
    bank_no: string;
    create_time: string;
  }
}
