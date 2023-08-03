import Path from "path";
import randomString from "randomstring";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  endpoint: new AWS.Endpoint("https://s3.us-west-000.backblazeb2.com"),
  credentials: {
    accessKeyId: "00014881dc05055000000001f",
    secretAccessKey: "K000AFddrkn+/LY2ciRkVZdJvrEN4Xo",
  },
  region: "us-west-000",
});
