import { Home } from "@/types/home";
import fetch from "@/libs/fetch";

export function getDataStat() {
  return fetch.get<Home.DataStat>("/sup/home");
}
