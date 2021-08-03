import { StrNum } from "@/types/index";
import BigNumber from "bignumber.js";

export function isBlob(targrt: unknown) {
  return toString.call(targrt) === "[object Blob]";
}

type FormatSateProps = "y" | "M" | "d" | "H" | "m" | "s";

export function formatDate(time: number | Date, format: string) {
  const date = typeof time === "number" ? new Date(time) : time || new Date();
  const propsMap: Record<FormatSateProps, StrNum> = {
    y: date.getFullYear(),
    M: date.getMonth() + 1, //month
    d: date.getDate(), //date
    H: date.getHours(), //hours
    m: date.getMinutes(), //minutes
    s: date.getSeconds() //seconds
  };
  let key: FormatSateProps = "y";
  for (key in propsMap) {
    if (Object.prototype.hasOwnProperty.call(propsMap, key)) {
      if (propsMap[key] < 10) {
        propsMap[key] = "0" + propsMap[key];
      }
    }
  }
  format = format || "yyyy-MM-dd HH:mm:ss";
  const reg = new RegExp("y+|M+|d+|H+|m+|s+", "g");
  const regY = new RegExp("y");
  format = format.replace(reg, function (v) {
    let old = v;
    if (regY.test(v)) {
      const y = "" + propsMap["y"];
      const len = 4 - v.length;
      old = y.substr(len);
    } else {
      const key = v.substr(0, 1) as FormatSateProps;
      old = `${propsMap[key]}`;
    }
    return old;
  });
  return format;
}

export function formatter(type: string, val: unknown) {
  if (type === "year") {
    return `${val}年`;
  }
  if (type === "month") {
    return `${val}月`;
  }
  return val;
}

export function formatPrice(value: StrNum) {
  return new BigNumber(value).toFormat(2);
}

export function formatNumber(value: StrNum) {
  return new BigNumber(value).toNumber();
}

/*!
 * Get the value of a query string from a URL
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {String} param The parameter to get the value of
 * @param  {String} url   The URL to get the value from [optional]
 * @return {String}       The value
 */
export function getQueryString(param: string, url = location.href) {
  const params = new URL(url).searchParams;
  const val = params.getAll(param);
  if (val.length > 1) return val;
  return val[0];
}
