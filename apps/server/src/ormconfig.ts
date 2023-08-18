import { DataSource } from 'typeorm';
import { EnvConfig } from '../../../packages/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

// Entities
import { User } from './users';
import { Article } from './articles';
import { Comment } from './comments';

export default new DataSource({
  type: EnvConfig.DATABASE_TYPE as any,
  host: EnvConfig.DATABASE_HOST,
  port: EnvConfig.DATABASE_PORT,
  username: EnvConfig.DATABASE_USER,
  password: EnvConfig.DATABASE_PASSWORD,
  database: EnvConfig.DATABASE_NAME,
  entities: [User, Article, Comment],
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: EnvConfig.DEVELOPMENT,
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
});