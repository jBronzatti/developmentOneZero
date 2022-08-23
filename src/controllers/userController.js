const User = require('../models/userModel');

module.exports = {

    async getAllUsers(ctx) {
        try {
            const found = await User.findAll();
            ctx.body = found;
            ctx.status = 200;
        } catch (err) {
            console.log(err);
            ctx.status = 400;
        }
    },
    async getUser(ctx) {
        try {
            const id = ctx.request.params.id;

            const user = await User.findOne({ where: { id } });

            if (!user) {
                ctx.status = 404;
                ctx.body = 'Usuário não encontrado';
            } else {
            ctx.status = 200;
            ctx.body = user;
            }
        } catch (err) {
            console.log(err);
            ctx.status = 400;
        }
    },

    async createUser(ctx) {
        try {
            await User.create(ctx.request.body);
            ctx.status = 201;
            ctx.body = 'Usuário registrado';
        } catch (err) {
            ctx.status = 400;
            ctx.body = err;
        }
    },

    async updateUser(ctx) {
        try {
            const { nome, email, idade } = ctx.request.body;
            const id = ctx.request.params.id;

            const user = await User.findOne({ where: { id } });

            if (!user) {
                ctx.status = 404;
                ctx.body = 'Usuário não encontrado';
            } else {
            user.nome = nome;
            user.email = email;
            user.idade = idade;
            await user.save();
            ctx.body = 'Usuário atualizado',
            ctx.status = 202;
            }
        } catch (err) {
            ctx.status = 400;
            ctx.body = err;
        }
    },

    async deleteUser(ctx) {
        try {
            const id = ctx.request.params.id;

            const user = await User.destroy({ where: { id } });
            if (!user){
                ctx.status = 404;
                ctx.body = 'Usuário não encontrado';
            } else {
            ctx.status = 200;
            ctx.body = 'Usuário apagado';
            }
        } catch (err) {
            ctx.status = 400;
            ctx.body = err;
        }
    }
}
