import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

export default class Axios {
  Axios: AxiosInstance;

  /**
   *
   * @param BASE_URL server url
   */
  constructor(BASE_URL: string | undefined) {
    if (!BASE_URL) throw Object.assign(new Error("Base url not found"));

    this.Axios = axios.create({
      baseURL: BASE_URL,
    });

    this.Axios.interceptors.response.use(
      (response: AxiosResponse): AxiosResponse => {
        if (response.status === 200 || response.status === 201) {
          return response.data;
        }
        return response;
      },
      async (err: AxiosError): Promise<AxiosError> => Promise.reject(err?.response)
    );
  }
  /**
   *
   * @param key token name
   * @param value token value
   * @returns this class
   */
  public setToken = (key: string, value: string | number | undefined): Axios => {
    if (!value) {
      throw Object.assign(new Error("Token not found"));
    }
    this.Axios.defaults.headers.common[key] = value;
    return this;
  };

  /**
   *
   * @param key
   * @returns this class
   */
  public removeToke = (key: string): Axios => {
    delete this.Axios.defaults.headers.common[key];
    return this;
  };

  /**
   *
   * @returns a instance
   */
  public instance = () => this.Axios;
}
