const fs = require("fs");
fs.readFile('.next/standalone/server.js', (err, data) => {
  if (err) throw err;
  const serverContent = String(data);
  fs.writeFileSync('server.js',serverContent.replace("await handler(req, res)",`
  const { parse } = require("url");
  const apiRouter = require("./server/index").default;
  const parsedUrl = parse(req.url, true)
  const { pathname } = parsedUrl

  if (pathname && pathname.startsWith('/api')) {
    apiRouter(req, res);
  } else {
    await handler(req, res, parsedUrl)
  }
  `))
});