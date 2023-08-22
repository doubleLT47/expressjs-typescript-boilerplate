export interface IRequest<Q = any, B = any, P = any> {
  query?: Q | Q[];
  body?: B | B[];
  params?: P | P[];
}
