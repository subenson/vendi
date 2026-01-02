import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from '../../domain/model/user.model';
import { Organization } from '../../domain/model/organization.model';
import { Membership } from '../../domain/model/membership.model';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.PSQL_HOST || 'localhost',
  port: parseInt(process.env.PSQL_PORT || '5432', 10),
  username: process.env.PSQL_USERNAME,
  password: process.env.PSQL_PASSWORD,
  database: process.env.PSQL_DATABASE,
  entities: [User, Organization, Membership],
  migrations: ['dist/infrastructure/database/migrations/*.js'],
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
