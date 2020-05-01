const paths = {
  local: {
    entities: 'src/domains/*/entity.ts',
    migrations: 'src/migration/**/*.ts',
    subscribers: 'src/subscriber/**/*.ts',
  },
  remote: {
    entities: 'build/domains/*/entity.js',
    migrations: 'build/migrations/**/*.js',
    subscribers: 'build/subscribers/**/*.js.',
  },
};

const env = process.env.NODE_ENV || 'remote';

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || 'kylestearns',
  password: process.env.DB_PASSWORD || null,
  database: process.env.DB_NAME || 'wacktomatoes',
  synchronize: true,
  logging: false,
  entities: [paths[env].entities],
  migrations: [paths[env].migrations],
  subscribers: [paths[env].subscribers],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
