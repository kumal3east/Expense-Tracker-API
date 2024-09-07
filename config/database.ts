import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  connection: env.get('DB_CONNECTION', 'postgres'),
  connections: {
    postgres: {
      client: 'pg',
      // connection: {
      //   host: env.get('DB_HOST'),
      //   port: env.get('DB_PORT'),
      //   user: env.get('DB_USER'),
      //   password: env.get('DB_PASSWORD'),
      //   database: env.get('DB_DATABASE'),
      // },
      connection: env.get('DATABASE_URL'),
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
  },
})

export default dbConfig
