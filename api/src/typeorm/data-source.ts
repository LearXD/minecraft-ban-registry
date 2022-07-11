import "reflect-metadata"
import { DataSource } from "typeorm";
import Ban from "../entities/Ban";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_DATABASE || 'test',
  synchronize: true,
  logging: false,
  entities: [Ban],
  subscribers: [],
  migrations: [],
})