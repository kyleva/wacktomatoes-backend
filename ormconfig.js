module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || 'kylestearns',
  password: process.env.DB_PASSWORD || null,
  database: process.env.DB_NAME || 'wacktomatoes',
  synchronize: true,
  logging: false,
  entities: [
    'build/domains/*/entity.js',
    'src/**/*.entity{.ts,.js}',
    'domains/*/entity.js',
  ],
  migrations: ['build/migrations/**/*.js', 'src/migrations/**/*.js'],
  subscribers: ['build/subscribers/**/*.js', 'src/subscribers/**/*.js'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
