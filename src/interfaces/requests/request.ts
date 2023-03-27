export interface IRequest {
  query?: any | any[];
  header?: any | any[];
  body?: any | any[];
  params?: any | any[];
  files?: any;
  file?: any;
}

export interface IValidateRequest {
  request: IRequest;
  header: any;
  body: any;
  query: any;
}
