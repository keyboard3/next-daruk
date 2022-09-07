# 简介
因为 next 的 api 能力太弱，所以集成 [daruk](https://github.com/darukjs/daruk) 轻量级 web 框架到 next.js 中 

# 使用
在 next.js 中自定义 server 接管约定 `/api`前缀路由，api 在 server 目录下，创建 daruk 写法的文件即可

/server/hello.ts
```typescript
import { controller, get, DarukContext } from "daruk";
@controller('/api')
class Index {
  @get("/:name")
  public async index(ctx: DarukContext) {
    const { name } = ctx.params;
    ctx.body = "hello world:" + name;
  }
}
```