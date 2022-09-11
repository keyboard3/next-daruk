import compose from "koa-compose";
export async function getApi(url: string, query?: any) {
  const darukApp = (global as any).darukApp;
  const mockCtx = darukApp.mockContext({
    url: `/api/${url}`,
    path: `/api/${url}`,
    method: 'GET',
  })
  const koa = darukApp.app;
  return new Promise((resolve, reject) => {
    const fn = compose([async (ctx: typeof mockCtx, next: () => Promise<any>) => {
      await next();
      resolve(ctx.response.body);
    }, ...koa.middleware]);
    (koa as any).handleRequest(mockCtx, fn);
  });
}
