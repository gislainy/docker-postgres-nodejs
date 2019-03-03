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

app.get('/', async (req, res) => {
  const user = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };
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