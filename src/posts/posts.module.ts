import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { AuthorsModule } from 'src/authors/authors.module';

/**
 * En GraphQL usamos 'resolvers' en lugar de 'controllers'. Los
 * resolvers se deben agregar como modulos en el array de providers
 * para que nest core tenga conocimiento de los mismo. A diferencia
 * de REST donde tenemos el array de 'controllers' para dar
 * conociminento de nuestros controladores a nest core
 */
@Module({
  imports: [TypeOrmModule.forFeature([PostEntity]), AuthorsModule],
  providers: [PostsService, PostsResolver],
})
export class PostsModule {}
