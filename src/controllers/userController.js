const User = require('../models/userModel');
const { paginate } = require('../pagination/pagination');

module.exports = {

    async getAllUsers(ctx) {
        try {
            const found = await User.findAll();
            const page = ctx.query.page>0? ctx.query.page : 1; //se o valor de ctx.query.page for menor que zero ou não for passado, é usado o valor padrão de 1
            const limit = ctx.query.limit>0? ctx.query.limit: 10; //se o valor de ctx.query.limit for menor que zero ou não for passado, é usado o valor padrão de 10
            ctx.body = paginate(found, page, limit);
            
        } catch (err) {
            ctx.body = err;
        }
    },
    async getUser(ctx) {
        try {
            const email = ctx.params.email;

            const user = await User.findOne({ where: { email } });
            ctx.body = user;
        
        } catch (err) {
            ctx.body = err;
        }
    },

    async createUser(ctx) {
        try {
            const user = await User.create(ctx.request.body);
            ctx.status = 201;
            ctx.body = user;

        } catch (err) {
            ctx.status = 400;
            ctx.body = err;
        }
    },

    async updateUser(ctx) {
        try {
            const { nome, email, idade } = ctx.request.body;
            const id = ctx.params.id;

            const user = await User.findOne({ where: { id } });

            user.nome = nome;
            user.email = email;
            user.idade = idade;

            await user.save();

            ctx.body = user

        } catch (err) {
            ctx.status = 400;
            ctx.body = err;
        }
    },

    async deleteUser(ctx) {
        try {
            const email = ctx.params.email;

            const user = await User.destroy({ where: { email } });

            ctx.body = user;

        } catch (err) {
            ctx.status = 400;
            ctx.body = err;
        }
    }
}
