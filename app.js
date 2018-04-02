const Koa = require('koa');
const Router = require('koa-router');
const request = require('superagent');
const body_parser = require('koa-bodyparser');

const config = require('./config.json');
const dingtalk = require('./dingtalk');

const app = new Koa();
const router = new Router();

router.post('/dingtalk', async (ctx, next) => {
  const token = ctx.request.query.access_token;
  const msg = dingtalk(ctx.request.body);
  request
      .post(config.dingtalk + token)
      .send(msg)
      .end((err, res) => {
        next();
      });
});

app
  .use(body_parser())
  .use(router.routes());

module.exports = app;
