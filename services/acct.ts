import fetch from "@/libs/fetch";
import { Acct } from "@/types/acct";
import { Pagination } from "@/types/pagination";
import { StrNum } from "@/types/index";

export async function accInfo() {
  return fetch.get<Acct.AcctInfos>("/common/acct/index", {});
}

export async function withdrawList(params: Pagination.Params) {
  return fetch.get<Acct.RecordInfoResult>("/common/withdraw", params);
}

export async function accLog(params: Acct.AcctLogPageParams) {
  return fetch.get<Acct.AcctLogResult>("/common/acct_log/store_acct_log", params);
}

export async function bindBankCard(params: Acct.BankPageParams) {
  return fetch.post("/sup/suppler/bind_step1", params);
}

//申请提现
export async function applyAcct(amount: StrNum) {
  return fetch.post("/common/withdraw/apply", { amount });
}
// 取消提现
export async function applyCanel(id: StrNum) {
  return fetch.post(`/common/withdraw/${id}/cancel`, {});
}
