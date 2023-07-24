import { IRequest } from "@interfaces/requests/request";

export default class RBase {
  protected request: IRequest;

  constructor(request: IRequest) {
    this.request = request;
  }

  public header(): any {
    throw new Error("Method not implemented.");
  }

  public query(): any {
    throw new Error("Method not implemented.");
  }

  public body(): any {
    throw new Error("Method not implemented.");
  }

  public params(): any {
    throw new Error("Method not implemented.");
  }

  public files(): any {
    throw new Error("Method not implemented.");
  }
  public file(): any {
    throw new Error("Method not implemented.");
  }
}
