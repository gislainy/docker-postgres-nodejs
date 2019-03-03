const express = require('express');
var faker = require('faker');
const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();
const config = {
  client: 'pg',
  version: '9.6',
  connection: {
    host: 'postgres',
    user: 'postgres',
    password: '123456',
    database: 'docker'
  }
}
var knex = require('knex')(config);
knex.migrate.latest([config]);

var mongoose = require('mongoose');
mongoose.connect('mongodb://mongo:27017/docker', { useNewUrlParser: true })
  .catch(e => {
    console.log(e)
    const msg = 'ERRO! Não foi possível conectar com o MongoDB!'
    console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')
  })
var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

var Users = mongoose.model('Users', userSchema);


const user = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
};

new Users(user).save();


app.get('/postgres', async (req, res) => {
  const userSelect = await knex('users').where({ email: user.email }).first();
  if (!userSelect)
    await knex('users')
      .insert(user);
  knex('users')
    .select('id', 'name', 'email', 'admin')
    .then(users => res.json(users))
    .catch(err => res.status(500).send(err))
});

app.get('/mongo', async (req, res) => {
  const userSelect = await knex('users').where({ email: user.email }).first();
  if (!userSelect)
    await knex('users')
      .insert(user);
  knex('users')
    .select('id', 'name', 'email', 'admin')
    .then(users => res.json(users))
    .catch(err => res.status(500).send(err))
});
app.listen(PORT, HOST);