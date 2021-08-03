export declare namespace Upload {
  export interface Image {
    id: number;
    type: string;
    url: string;
    cover: string;
    file_info: string;
    file: string;
    source: string;
    source_id: number;
    rate: string;
    title: string;
    sort: number;
    create_time: string;
    update_time: string;
  }

  export interface UploadResult {
    file: string;
    file_type: string;
    id: number;
    url_oss: string;
  }

  export interface UploadFileParams {
    type?: "private";
    file: File;
  }
}
