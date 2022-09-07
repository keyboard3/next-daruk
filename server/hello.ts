import { controller, get, DarukContext } from "daruk";
@controller('/api')
class Index {
  @get("/:name")
  public async index(ctx: DarukContext) {
    const { name } = ctx.params;
    ctx.body = "hello world:" + name;
  }
}