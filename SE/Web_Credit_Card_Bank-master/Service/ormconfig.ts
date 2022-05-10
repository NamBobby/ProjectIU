
import * as dotenv from 'dotenv';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
dotenv.config();
const {MS_DB_TYPE,MS_DB_PORT, MS_DB_HOST, MS_DB_USERNAME, MS_DB_PASSWORD, MS_DB_DATABASE} = process.env;


//remember access account in mysql server
const typeOrmConfig: MysqlConnectionOptions = {
    type: 'mysql',
    // name: 'hcmiu_se_db',
    host: MS_DB_HOST ,
    // host: "",
    port: parseInt(MS_DB_PORT),
    username: MS_DB_USERNAME ,
    password: MS_DB_PASSWORD ,
    database: "banking",
    entities: ['dist/src/**/*.entity{.ts,.js}'],
    synchronize: false, // true is Unsafe, not use for product and migration
    migrations: ['dist/src/migrations/*{.ts,.js}'],
    cli: {
        migrationsDir: 'src/migrations',
    },
}

export default typeOrmConfig;