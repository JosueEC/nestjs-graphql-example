import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import { AuthorEntity } from './entities/author.entity';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';

@Resolver(() => AuthorEntity)
export class AuthorsResolver {
  constructor(private readonly authorsService: AuthorsService) {}

  @Mutation(() => AuthorEntity)
  createAuthor(
    @Args('createAuthorInput') createAuthorInput: CreateAuthorInput,
  ) {
    return this.authorsService.create(createAuthorInput);
  }

  /**
   * * name: 'authors'
   * Esta es otra forma en la que podemos definir un nombre para las
   * @Query en este caso esta funcion seria llamada desde el cliente
   * con el nombre 'authors', si esta propiedad no estuviera agregada
   * entonces la @Query seria llamda con el nombre de la funcion, el
   * cual seria 'findAll'
   */
  @Query(() => [AuthorEntity], { name: 'authors' })
  findAll() {
    return this.authorsService.findAll();
  }

  @Query(() => AuthorEntity, { name: 'author' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.authorsService.findOne(id);
  }

  @Mutation(() => AuthorEntity)
  updateAuthor(
    @Args('updateAuthorInput') updateAuthorInput: UpdateAuthorInput,
  ) {
    return this.authorsService.update(updateAuthorInput.id, updateAuthorInput);
  }

  @Mutation(() => AuthorEntity)
  removeAuthor(@Args('id', { type: () => Int }) id: number) {
    return this.authorsService.remove(id);
  }
}
