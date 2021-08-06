import { Upload } from "@/types/upload";
import fetch from "@/libs/fetch";
import { transformRecordToFormData } from "#UTILS/utils.form";

export function upload(params: Upload.UploadFileParams) {
  return fetch.upload<Upload.UploadResult>("/common/upload", transformRecordToFormData(params));
}
