//Voce deve rodar os testes usando:  npm test
//Para testar a aplicação, rode: npm run dev

//mais infos
//https://github.com/ZijianHe/koa-router

// todas as configuraçoes devem ser passadas via environment variables
const Koa = require('koa');
const userRoutes = require('./routes/index.routes');
const bodyParser = require('koa-bodyparser');
const { koaSwagger } = require('koa2-swagger-ui');
const docsRoutes = require('./routes/docApi');


require('dotenv').config();

const PORT = process.env.PORT || 3000;

const koa = new Koa();


koa
  .use(bodyParser())
  .use(userRoutes.routes())
  .use(docsRoutes.routes())
  .use(userRoutes.allowedMethods())
  .use(
    koaSwagger({
      routePrefix: '/docs', // host at /docs
      swaggerOptions: {
        url: `http://localhost:${PORT}/json`, // example path to json
      },
    }),
  );

const server = koa.listen(PORT);

module.exports = server;