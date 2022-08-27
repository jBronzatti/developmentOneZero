const { createUser, getUser, updateUser, getAllUsers, deleteUser, deleteAll } = require('../controllers/userController');

const Router = require('koa-router');

var router = new Router({
    prefix:'/users'
});



router.get('/', (ctx) => getAllUsers(ctx));

router.post('/', (ctx) => createUser(ctx));

router.put('/:id', (ctx) => updateUser(ctx));

router.get('/:email', (ctx) => getUser(ctx));

router.delete('/:email', (ctx) => deleteUser(ctx));

module.exports = router;