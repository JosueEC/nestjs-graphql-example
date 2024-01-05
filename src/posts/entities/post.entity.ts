import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AuthorEntity } from 'src/authors/entities/author.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

/**
 * @ObjectType es el decorador que nos permite mapear entidades como
 * schemas de GraphQL.
 *
 * @Field es el decorador que nos permite añadir tipado a las
 * propiedades de la clase. En las opciones de Field podemos añadir
 * mas especificaciones de cada propiedad.
 *
 * * () => Int
 * La function de tipado es opcional, se usa cuando hay una posible
 * ambiguedad entre los tipos de TypeScript y los de GraphQL, en este
 * ejemplo TypeScript usa 'Number', pero GraphQL solo conoce 'Int'
 * para enteros o Float para punto flotante.
 *
 * Para el caso de string y boolean esto no es requerido.
 */

/**
 * Podemos usar una misma clase de TypeScript para diferentes mapeaos.
 * En este caso la estamos usando para mapear el schema de GraphQL y
 * tambien para mapear una entidad en TypeORM
 */
@Entity({ name: 'post' })
@ObjectType()
export class PostEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({})
  @Field()
  title: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  @Field({ nullable: true })
  content?: string;

  /**
   * Esta columna es para el caso en el deseamos almacenar el
   * id del author para despues poder hacer consultas en base
   * a este.
   *
   * Esta propiedad deberia ser añadida en el DTO de POST para
   * poder almacenarla al momento de crear el POST y tener la
   * relacion con el Author, ya que no puede existir un POST sin
   * estar relacionado a un Author
   */
  @Column()
  @Field(() => Int)
  authorId: number;

  /**
   * @ManyToOne esta es la otra parte de una relacion 1:n, donde aqui
   * estamos en 'n'.
   *
   * Para GraphQL hay que definir que esta columna es de tipo Author
   * para definir una relacion con Post.
   *
   * Para TypeORM la logica es la misma, usamos el decorador
   * @ManyToOne en conjunto con @OneToMany que esta en la entidad
   * Author, en esta parte las relaciones se definien igual que en una
   * API REST
   */
  @ManyToOne(() => AuthorEntity, (author) => author.posts)
  @Field(() => AuthorEntity)
  author: AuthorEntity;
}
