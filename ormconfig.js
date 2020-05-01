const dir = process.env.NODE_ENV === 'localhost' ? 'src' : 'build';

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || 'kylestearns',
  password: process.env.DB_PASSWORD || null,
  database: process.env.DB_NAME || 'wacktomatoes',
  synchronize: true,
  logging: false,
  entities: [`${dir}/domains/*/entity.ts`],
  migrations: [`${dir}/migration/**/*.ts`],
  subscribers: [`${dir}/subscriber/**/*.ts`],
  cli: {
    entitiesDir: `${dir}/entity`,
    migrationsDir: `${dir}/migration`,
    subscribersDir: `${dir}/subscriber`,
  },
};
