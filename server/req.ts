import { getAppServer } from "./";
import compose from "koa-compose";
export async function getApi(url: string, query?: any) {
  const appServer = await getAppServer();
  const mockCtx = appServer.mockContext({
    url: `/api/${url}`,
    path: `/api/${url}`,
    method: 'GET',
  })
  const koa = appServer.app;
  return new Promise((resolve, reject) => {
    const fn = compose([async (ctx: typeof mockCtx, next: () => Promise<any>) => {
      await next();
      resolve(ctx.response.body);
    }, ...koa.middleware]);
    (koa as any).handleRequest(mockCtx, fn);
  });
}