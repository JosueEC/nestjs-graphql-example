import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { AuthorsModule } from './authors/authors.module';

@Module({
  imports: [
    /**
     * Esta es la forma de configurar el modulo de GraphQL, al igual
     * que con muchos otros modulos este se configura a traves de la
     * funcion .forRoot() y recibe un objeto con la configuracion. En
     * este caso no parece ser necesario separar el objeto
     * ApolloDriverConfig en otro archivo, ya que los parametros de
     * configuracion parecen ser muy pocos.
     */
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      /**
       * Esta propiedad es la ruta donde se guardara nuestro codigo
       * .gql de los schemas que vayamos creando.
       *
       * La funcion join del modulo path de NodeJS nos permite unir
       * cadenas de texto, a traves de la funcion process.cwd() podemos
       * obtener la ruta del directorio raiz en el que estamos ubicados,
       * esto lo concatenamos con la ruta donde queremos guardar nuestros
       * archivos .gql
       */
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      /**
       * Esta es la forma en la que importamos las entidades de
       * forma dinamica al arreglo de entities en el app.module.
       * De lo contrario, tendriamos que ir agregando una por una
       * cada que creamos una nueva entidad.
       *
       * Esta sintaxis se lee de la siguiente forma:
       * *  __dirname
       * es la ruta del directorio en el que estamos ubicados
       *
       * *  /**
       * Esto se lee como 'cualquier carpeta en a partir de la ruta
       * que se concatena en la instruccion anterior'
       *
       * *  /*.entity{.ts,.js}
       * Y esto se lee como 'cualquier archivo que su nombre termine
       * en la palabra .entity y con cualquiera de las extensiones
       * .ts o .js'
       */
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      /**
       * Esta propiedad debe estar en false en produccion, en su lugar
       * usamos migraciones para aplicar cambios en bases de datos
       */
      synchronize: true,
    }),
    PostsModule,
    AuthorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
