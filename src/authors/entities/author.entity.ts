import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PostEntity } from 'src/posts/entities/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'author' })
@ObjectType()
export class AuthorEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  /**
   * @OneToMany en este caso, tenemos una relacion de 1:n, ya que un
   * author tiene muchas publicaciones relacionadas.
   *
   * Para definir esta relacion en GraphQL, la logica es similar a la
   * usada con TypeORM.
   *
   * Usando @Field definimos que esta columna es
   * un arreglo de relaciones con Post. En la entidad Post tambien
   * agregaremos una columna, la cual sera author y sera de tipo Author
   * para establecer la columna de relacion.
   *
   * Lo anterior fue para definir la relacion en GraphQL, ahora, para
   * hacer los mismo en la base de datos con TypeORM, la logica es
   * exactamente la misma que en una API REST, esta no cambia
   */
  @OneToMany(() => PostEntity, (post) => post.author)
  @Field(() => [PostEntity], { nullable: true })
  posts: Array<PostEntity>;
}
