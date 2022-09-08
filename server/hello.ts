import { controller, get, DarukContext } from "daruk";
@controller('/api')
class Index {
  @get("/vipName")
  public async index(ctx: DarukContext) {
    const { name } = ctx.params;
    ctx.body = `vip(张三)`;
  }
}