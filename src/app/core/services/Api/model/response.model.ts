export interface ResponseModel<model> {
  success: boolean;
  errorMessage: string;
  message: string;
  data: model;
}
