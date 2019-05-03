import { config } from 'dotenv';
import { GraphQLServer, Options } from 'graphql-yoga';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import * as TypeORM from 'typeorm';
import * as resolvers from './resolvers';


async function bootstrap() {
  try {
    // Leer variables de entorno del archivo .env
    config();

    // Registrar contenedor de IOC de terceros para TypeORM
    TypeORM.useContainer(Container);

    // Crear una conexión TypeORM
    await TypeORM.createConnection();

    // Construir esquema ejecutable con TypeGraphQL
    const schema = await buildSchema({
      // Registrar resolvers para query's y mutations
      resolvers: Object.values(resolvers),
      // Registrar contenedor de IOC de terceros para TypeGraphQL
      container: Container,
    });

    // Crear servidor de GraphQL con graphql-yoga
    const server = new GraphQLServer({ schema });

    // Configurar las opciones del servidor
    const serverOptions: Options = {
      port: process.env.API_PORT || 4000,
      endpoint: '/graphql',
      playground: '/playground',
    };

    // Iniciar el servidor
    server.start(serverOptions, ({ port, playground }) => {
      console.log(`Server is running, GraphQL Playground available at http://localhost:${port}${playground}`);
    });
  } catch (err) {
    console.error(err);
  }
}

bootstrap();
