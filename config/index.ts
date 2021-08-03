/* 运行环境 */
export enum RuntimeEnvironmentTypes {
  正式服 = "prod",
  正式服Https = "prod_https",
  测试服 = "test",
  测试服Https = "test_https",
  本地开发 = "dev"
}

/* 不同域名下的请求api的base_url */
export const api: Record<RuntimeEnvironmentTypes, string> = {
  [RuntimeEnvironmentTypes.本地开发]: "http://bwyx-api.test.z.vip/api",
  [RuntimeEnvironmentTypes.正式服]: "http://bwyx-api.z.vip/api",
  [RuntimeEnvironmentTypes.正式服Https]: "https://bwyx-api.z.vip/api",
  [RuntimeEnvironmentTypes.测试服]: "http://bwyx-api.test.z.vip/api",
  [RuntimeEnvironmentTypes.测试服Https]: "https://bwyx-api.test.z.vip/api"
};

export default api.test;