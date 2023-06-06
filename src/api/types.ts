export type IError = {
  errors: Array<{
    code: string;
    message: string;
  }>;
};

export type RequestParam = {
  headers: HeadersInit_;
  method: string;
  body?: BodyInit_;
};

export type ApiCallParams = {
  url: string;
  method: string;
  params?: object;
  headers?: HeadersInit_;
};
