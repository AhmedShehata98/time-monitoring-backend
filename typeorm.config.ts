import { TypeOrmModule } from "@nestjs/typeorm";

export const typeOrmModule = TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    database: 'employees-monitoring',
    entities: [],
    synchronize: true,
  })