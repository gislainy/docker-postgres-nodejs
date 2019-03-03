// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    version: '9.6',
    connection: {
      host: 'postgres',
      user: 'postgres',
      password: '123456',
      database: 'docker'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    version: '9.6',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: '123456',
      database: 'docker'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
