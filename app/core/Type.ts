export declare namespace Response {
    export type Pagination = {
      page: number,
      perPage: number,
      totalCount: number,
      totalPage: number,
    };
    export type Success = {
      data?: any,
      state?: number,
      pagination?: Pagination,
    };
    export type Error = {
      msg: string,
      state: number,
      data?: any,
      code?: number,
    };
}
