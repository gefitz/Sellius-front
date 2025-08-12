export interface ResponseApiModel<model = any> {
  success: boolean;
  data: model;
  errorMessage: string;
}
