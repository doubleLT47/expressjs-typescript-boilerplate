import { Liquid } from "liquidjs";
import path from "path";

const engine: Liquid = new Liquid({
  root: path.resolve(path.dirname(__dirname), "./resources/"),
  extname: ".liquid",
});

export default engine;
