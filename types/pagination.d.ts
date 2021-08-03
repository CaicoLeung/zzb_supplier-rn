export declare namespace Pagination {
  export interface Params {
    current?: number;
    pageSize?: number;
    limit?: number;
    page?: number;
  }

  export interface Result {
    page: {
      last_page: number;
      limit: number;
      offset: number;
      page: number;
      total: number;
    };
  }
}
