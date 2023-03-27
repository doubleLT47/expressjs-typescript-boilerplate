export interface ITopic {
  _id: string;
  topic: string;
  param: string;
  url: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}
/*
    <-- Example-->
    {
        id: "acasd8asdn23asd0",
        topic: "order/create",
        param: "sapogoUpdateOrderWebhook",
        url: "http://172.17.0.1:50011/sapogo-post-order-webhook",
        type: "orders"
    }
*/
