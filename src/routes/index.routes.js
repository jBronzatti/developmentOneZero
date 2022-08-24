const { createUser, getUser, updateUser, getAllUsers, deleteUser } = require('../controllers/userController');
const Koa = require('koa');
const Router = require('koa-router');

const koa = new Koa();
var router = new Router();

router.get('/user', (ctx) => getAllUsers(ctx));
router.post('/user/create', (ctx) => createUser(ctx));
router.put('/user/update/:id', (ctx) => updateUser(ctx));
router.get('/user/:id', (ctx) => getUser(ctx));
router.delete('/user/remove/:id', (ctx) => deleteUser(ctx));

module.exports = router;