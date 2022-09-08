# next-daruk
因为 next 的 api 能力太弱，所以集成 [daruk](https://github.com/darukjs/daruk) 轻量级 web 框架到 next.js 中 

# 使用
在 next.js 中自定义 server 接管约定 `/api`前缀路由，api 在 server 目录下，创建 daruk 写法的文件即可

/server/hello.ts
```typescript
import { controller, get, DarukContext } from "daruk";
@controller('/api')
class Index {
  @get("/vipName")
  public async index(ctx: DarukContext) {
    const { name } = ctx.params;
    ctx.body = `vip(张三)`;
  }
}
```
外部可以通过 `curl http://localhost:3000/api/vipName` 访问接口

也可在 next.js 的服务端渲染的聚合接口中可以通过 `getApi` 直接以http 请求的形式调用该接口

/pages/index.tsx
```typescript
export async function getServerSideProps(context: NextPageContext) {
  const res = await getApi('vipName')
  return {
    props: { name: res }, // will be passed to the page component as props
  }
}
```