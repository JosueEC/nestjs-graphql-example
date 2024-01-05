import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { PostEntity } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { AuthorEntity } from 'src/authors/entities/author.entity';

@Resolver(() => PostEntity)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  /**
   * @Query es el decorador que nos permite definir funciones en el
   * resolver como funciones de consulta, es el equivalente al verbo
   * HTTP GET.
   *
   * En las opciones de este decorador podemos especificar lo que va
   * a ser retornado por la funcion. Hay que tener en cuenta que el
   * tipado que se usa en esta parte es el de GraphQL no el de
   * TypeScript
   *
   * NOTA: Este decorador viene del modulo graphql
   */
  @Query(() => [PostEntity])
  async posts(): Promise<Array<PostEntity>> {
    return this.postsService.findAll();
  }

  /**
   * @Mutation es el decorador que nos permite marcar funciones en
   * el resolver las cuales realizan una modificacion en la base de
   * datos. Este decorador es equivalente a los verbos POST, PUT,
   * DELETE, UPDATE y PATCH.
   *
   * De igual forma, podemos definir el tipo de dato de retorno de
   * esta mutacion en las opciones del decorador.
   */
  @Mutation(() => PostEntity)
  async createPost(@Args('post') post: CreatePostInput): Promise<PostEntity> {
    return this.postsService.createPost(post);
  }

  /**
   * @Args es el decorador que nos permite recibir datos a traves de
   * los endpoints, ya sea que se use como un body, como en la funcion
   * de arriba, o que se use como un Query en la funcion de abajo.
   *
   * Este decorador justamente seria el equivalente a los decoradores
   * @Query @Param y @Body
   *
   * * type: () => Int
   * Esta es la forma en la que podemos agregar tipado a los Args
   * para que sean reconocidos por GraphQL, recuerda que algunos
   * datos de TypeScript no son reconocidos por GraphQL.
   *
   * Por ejemplo, en este caso, si no agregamos la propiedad type
   * GraphQL genera el dato como un Float, ya que no conoce el tipo
   * de dato 'number', es por eso que es necesario añadir typer para
   * no tener errores de tipos entre GraphQL y TypeScript
   */
  @Query(() => PostEntity)
  async post(
    @Args('id', { type: () => Int }) postId: number,
  ): Promise<PostEntity> {
    return this.postsService.findPostById(postId);
  }

  /**
   * @ResolveFiled es el decorador usado para definir funciones para
   * campos anidados o que tienen relaciones.
   *
   * En este ejemplo Author tiene relacion con Post, y se quiere que
   * cuando se consulten las publicaciones, se puede acceder a la
   * informacion del Author a traves de su relacion. Esta funciones es
   * la que se encargara de recuperar esa informacion
   *
   * Como vez, la funcion getAuthor del authorService necesita del
   * authorId para poder buscar al Author, en los @ResolveFiled
   * podemos acceder a los valores de la @Query padre a traves del
   * decorador @Parent de esta forma es como de los mismos obtenemos
   * el authorId que necesitamos.
   */
  @ResolveField(() => AuthorEntity)
  async author(@Parent() post: PostEntity): Promise<AuthorEntity> {
    return this.postsService.getAuthor(post.authorId);
  }
}
