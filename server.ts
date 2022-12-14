// server.js
import { createServer } from "http";
import { parse } from "url";
import next from "next";

import apiRouter from "./server/index";

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port: any = process.env.PORT || 3000;
const basePath = process.env.BASE_PATH || "";

const app = next({ dev, hostname, port, conf: { basePath } })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req: any, res: any) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true)
      const { pathname } = parsedUrl

      if (pathname?.startsWith('/api')) {
        apiRouter(req, res);
      } else {
        await handle(req, res, parsedUrl)
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, handleError as any)
}).catch(err => console.error(err));
function handleError(err: any) {
  if (err) throw err
  console.log(`> Ready on http://${hostname}:${port}`)
}


process.on('uncaughtException', err => {
  console.error('有一个未捕获的错误', err)
  process.exit(1) //强制性的（根据 Node.js 文档）
})