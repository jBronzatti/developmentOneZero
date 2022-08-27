const Router = require('koa-router');

const yamljs = require('yamljs');

var router = new Router({
    prefix:'/json'
});

router.get('/', (ctx) => {
    const spec = yamljs.load('./api.yaml');
    ctx.body = spec;
});

module.exports = router;