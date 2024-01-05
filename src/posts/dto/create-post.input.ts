import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

/**
 * Tambien es necesario añadir anotaciones de GraphQL en los DTOs que
 * se reciben desde el cliente.
 *
 * @Field tiene el mismo funcionamiento que en una clase marcada con
 * ObjectType.
 *
 * @InputType es el decorador de GraphQL usado para marcar a los DTOs
 *
 * Y, de igual manera, podemos usar
 * demas antoaciones, como las de class-validator y class-transformer
 * para las validaciones de estos campos.
 */
@InputType()
export class CreatePostInput {
  @Field()
  @IsNotEmpty({
    message: 'The title field cannot be empty',
  })
  @IsString({
    message: 'The title field must be a string',
  })
  @MinLength(3)
  @MaxLength(100)
  title: string;

  @Field()
  @IsString({
    message: 'The content field must be a string',
  })
  @IsNotEmpty({
    message: 'The content field cannot be empty',
  })
  @MinLength(3)
  @MaxLength(500)
  content: string;

  @Field(() => Int)
  @IsNotEmpty({
    message: 'Cannot create a Post without an Author relationed',
  })
  @IsInt()
  @IsPositive()
  authorId: number;
}
