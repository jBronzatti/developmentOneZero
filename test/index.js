//sample test
//Para rodar os testes, use: npm test
//PS: Os testes não estão completos e alguns podem comnter erros.

// veja mais infos em:
//https://mochajs.org/
//https://www.chaijs.com/
//https://www.chaijs.com/plugins/chai-json-schema/
//https://developer.mozilla.org/pt-PT/docs/Web/HTTP/Status (http codes)

const app = require('../src/index.js');

const assert = require('assert');
const chai = require('chai')
const chaiHttp = require('chai-http');
const chaiJson = require('chai-json-schema');
const user = require('../src/models/userModel');

chai.use(chaiHttp);
chai.use(chaiJson);

const expect = chai.expect;

//Define o minimo de campos que o usuário deve ter. Geralmente deve ser colocado em um arquivo separado
const userSchema = { user };

//Inicio dos testes

//este teste é simplesmente pra enteder a usar o mocha/chai
describe('Um simples conjunto de testes', function () {
    it('deveria retornar -1 quando o valor não esta presente', function () {
        assert.equal([1, 2, 3].indexOf(4), -1);
    });
});

//testes da aplicação
describe('Testes da aplicaçao', () => {
    it('o servidor esta online', function (done) {
        chai.request(app)
            .get('/users')
            .end(function (err, res) {
                expect(err, 'não deveria haver erro').to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    it('deveria ser uma lista vazia de usuarios', function (done) {
        chai.request(app)
            .get('/users')
            .end(function (err, res) {
                expect(err, 'não deveria haver erro').to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.eql([]);
                done();
            });
    });

    it('deveria criar o usuário raupp', function (done) {
        chai.request(app)
            .post('/users')
            .send({ nome: "raupp", email: "jose.raupp@devoz.com.br", idade: 35 })
            .end(function (err, res) {
                expect(err, 'não deveria haver erro').to.be.null;
                expect(res, 'deveria retornar status 201').to.have.status(201);
                expect(res, 'deveria haver uma resposta').to.exist;
                expect(res, 'a resposta deveria ser um userSchema').to.be.jsonSchema(userSchema);
                done();
            });
    });

    it('deveria criar o usuário João', function (done) {
        chai.request(app)
            .post('/users')
            .send({ nome: "João", email: "joaovictorbronzatti@devoz.com.br", idade: 24 })
            .end(function (err, res) {
                expect(err, 'não deveria haver erro').to.be.null;
                expect(res, 'deveria retornar status 201').to.have.status(201);
                expect(res, 'deveria haver uma resposta').to.exist;
                expect(res, 'a resposta deveria ser um userSchema').to.be.jsonSchema(userSchema);
                done();
            });
    });

    it('deveria criar o usuário Victor', function (done) {
        chai.request(app)
            .post('/users')
            .send({ nome: "Victor", email: "victor@devoz.com.br", idade: 30 })
            .end(function (err, res) {
                expect(err, 'não deveria haver erro').to.be.null;
                expect(res, 'deveria retornar status 201').to.have.status(201);
                expect(res, 'deveria haver uma resposta').to.exist;
                expect(res, 'a resposta deveria ser um userSchema').to.be.jsonSchema(userSchema);
                done();
            });
    });

    it('deveria criar o usuário Bruce Wayne', function (done) {
        chai.request(app)
            .post('/users')
            .send({ nome: "Bruce Wayne", email: "batman@devoz.com.br", idade: 74 })
            .end(function (err, res) {
                expect(err, 'não deveria haver erro').to.be.null;
                expect(res, 'deveria retornar status 201').to.have.status(201);
                expect(res, 'deveria haver uma resposta').to.exist;
                expect(res, 'a resposta deveria ser um userSchema').to.be.jsonSchema(userSchema);
                done();
            });
    });

    it('deveria criar o usuário Leonardo da Vinci', function (done) {
        chai.request(app)
            .post('/users')
            .send({ nome: "Leonardo da Vinci", email: "lider@tartarugasninjas.com.br", idade: 38 })
            .end(function (err, res) {
                expect(err, 'não deveria haver erro').to.be.null;
                expect(res, 'deveria retornar status 201').to.have.status(201);
                expect(res, 'deveria haver uma resposta').to.exist;
                expect(res, 'a resposta deveria ser um userSchema').to.be.jsonSchema(userSchema);
                done();
            });
    });

    it('deveria criar o usuário Developer', function (done) {
        chai.request(app)
            .post('/users')
            .send({ nome: "Developer", email: "dev@master.com.br", idade: 24 })
            .end(function (err, res) {
                expect(err, 'não deveria haver erro').to.be.null;
                expect(res, 'deveria retornar status 201').to.have.status(201);
                expect(res, 'deveria haver uma resposta').to.exist;
                expect(res, 'a resposta deveria ser um userSchema').to.be.jsonSchema(userSchema);
                done();
            });
    });

    it('deveria criar um usuário com 18 anos', function (done) {
        chai.request(app)
            .post('/users')
            .send({ nome: "Sou Maior", email: "maior@deidade.com.br", idade: 18 })
            .end(function (err, res) {
                expect(err, 'não deveria haver erro').to.be.null;
                expect(res, 'deveria retornar status 201').to.have.status(201);
                expect(res, 'deveria haver uma resposta').to.exist;
                expect(res, 'a resposta deveria ser um userSchema').to.be.jsonSchema(userSchema);
                done();
            });
    });

    it('não deveria criar um usuário mais novo do que 18 anos', function (done) {
        chai.request(app)
            .post('/users')
            .send({ nome: "Nodejs", email: "node@js.com.br", idade: 13 })
            .end(function (err, res) {
                expect(res, 'deveria retornar status 400').to.have.status(400);
                done();
            });
    });

    it('o usuário naoExiste não existe no sistema', function (done) {
        chai.request(app)
            .get('/users/naoExiste')
            .end(function (err, res) {
                expect(err, 'não deveria haver erro').to.be.null;
                expect(res, 'deveria retornar status 204').to.have.status(204);
                expect(res, 'a resposta deveria ser um userSchema').to.be.jsonSchema(userSchema);
                done();
            });
    });

    it('o usuário raupp existe e é valido', function (done) {
        chai.request(app)
            .get('/users/jose.raupp@devoz.com.br') // Utilizei email por ser único para cada usuário
            .end(function (err, res) {
                expect(err, 'não deveria haver erro').to.be.null;
                expect(res, 'deveria retornar status 200').to.have.status(200);
                expect(res, 'a resposta deveria ser um userSchema').to.be.jsonSchema(userSchema);
                done();
            });
    });

    it('deveria excluir o usuário raupp', function (done) {
        chai.request(app)
            .delete('/users/jose.raupp@devoz.com.br')
            .end(function (err, res) {
                expect(err, 'não deveria haver erro').to.be.null;
                expect(res, 'deveria retornar status 200').to.have.status(200);
                expect(res, 'a resposta deveria ser um userSchema').to.be.jsonSchema(userSchema);
                done();
            });
    });

    it('o usuário raupp não deve existir mais no sistema', function (done) {
        chai.request(app)
            .get('/users/jose.raupp@devoz.com.br')
            .end(function (err, res) {
                expect(err, 'não deveria haver erro').to.be.null;
                expect(res, 'deveria retornar status 204').to.have.status(204);
                expect(res, 'a resposta deveria ser um userSchema').to.be.jsonSchema(userSchema);
                done();
            });
    });

    it('deveria ser uma lista com pelo menos 5 usuarios', function (done) {
        chai.request(app)
            .get('/users')
            .end(function (err, res) {
                expect(err, 'não deveria haver erro').to.be.null;
                expect(res, 'deveria retornar status 200').to.have.status(200);
                expect(res.body, 'res.body deveria ter no mínimo 5 usuários').with.lengthOf.least(5);
                done();
            });
    });

    it('deveria mudar o usuário João para Desenvolvedor_J', function (done) {
        chai.request(app)
            .put('/users/2') // Utilizei o ID para não haver conflito
            .send({ nome: "Desenvolvedor_J", email: "Dev_J@devoz.com.br", idade: 24 })
            .end(function (err, res) {
                expect(err, 'não deveria haver erro').to.be.null;
                expect(res, 'deveria retornar status 200').to.have.status(200);
                expect(res, 'deveria haver uma resposta').to.exist;
                expect(res, 'a resposta deveria ser um userSchema').to.be.jsonSchema(userSchema);
                done();
            });
    });

    it('não deveria criar um usuário sem um email válido', function (done) {
        chai.request(app)
            .post('/users')
            .send({ nome: "Nodejs", email: "nãotememail", idade: 18 })
            .end(function (err, res) {
                expect(res, 'deveria retornar status 400').to.have.status(400);
                done();
            });
    });

    it('não deveria criar um usuário sem um nome', function (done) {
        chai.request(app)
            .post('/users')
            .send({ email: "nãotememail", idade: 18 })
            .end(function (err, res) {
                expect(res, 'deveria retornar status 400').to.have.status(400);
                done();
            });
    });

    it('não deveria criar um usuário sem uma idade', function (done) {
        chai.request(app)
            .post('/users')
            .send({ nome: "Nodejs", email: "nãotememail"})
            .end(function (err, res) {
                expect(res, 'deveria retornar status 400').to.have.status(400);
                done();
            });
    });

    it('não deveria atualizar um usuário para um usuário sem um email válido', function (done) {
        chai.request(app)
            .put('/users/2')
            .send({ nome: "Nodejs", email: "nãotememail", idade: 18 })
            .end(function (err, res) {
                expect(res, 'deveria retornar status 400').to.have.status(400);
                done();
            });
    });

    it('não deveria atualizar um usuário para menor de idade', function (done) {
        chai.request(app)
            .put('/users/2')
            .send({ nome: "Nodejs", email: "tememail@mail.com", idade: 17 })
            .end(function (err, res) {
                expect(res, 'deveria retornar status 400').to.have.status(400);
                done();
            });
    });

    it('não deveria atualizar um usuário para um usuário sem idade', function (done) {
        chai.request(app)
            .put('/users/2')
            .send({ nome: "Nodejs", email: "outroemail@mail.com"})
            .end(function (err, res) {
                expect(res, 'deveria retornar status 400').to.have.status(400);
                done();
            });
    });

    it('não deveria atualizar um usuário para um usuário sem nome', function (done) {
        chai.request(app)
            .put('/users/2')
            .send({ email: "maisumemail@mail.com", idade: 20 })
            .end(function (err, res) {
                expect(res, 'deveria retornar status 400').to.have.status(400);
                done();
            });
    });

    it('deveria retornar dois usuários na paginação', function (done){
        chai.request(app)
            .get('/users?page=1&limit=2')
            .end(function (err, res){
                expect(res, 'deveria retornar status 200').to.have.status(200);
                expect(res.body, 'res.body deveria ter 2 usuários').with.lengthOf(2);
                done();
            });
    });
});