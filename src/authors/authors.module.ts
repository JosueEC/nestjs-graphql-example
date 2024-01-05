import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsResolver } from './authors.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from './entities/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorEntity])],
  providers: [AuthorsResolver, AuthorsService],
  /**
   * Recuerda, cuando otro modulo require usar alguna de nuestros
   * archivos, debemos añadir ese archivo al array de exports y en
   * el modula que va a usar el archivo lo que hacemos es añadir
   * el modulo como tal, no solo el servicio exportado.
   *
   * Esto significa, aqui exportar AuthorService, pero en post.module
   * en el arrar imports hay que importar AuthorModule
   */
  exports: [AuthorsService],
})
export class AuthorsModule {}
