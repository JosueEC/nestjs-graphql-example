import { Injectable } from '@nestjs/common';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorEntity } from './entities/author.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
  ) {}

  async create(author: CreateAuthorInput): Promise<AuthorEntity> {
    return this.authorRepository.save(author);
  }

  async findAll(): Promise<Array<AuthorEntity>> {
    return this.authorRepository.find();
  }

  async findOne(authorId: number): Promise<AuthorEntity> {
    return this.authorRepository.findOneBy({ id: authorId });
  }

  async update(
    authorId: number,
    author: UpdateAuthorInput,
  ): Promise<UpdateResult> {
    return this.authorRepository.update(authorId, author);
  }

  async remove(authorId: number): Promise<DeleteResult> {
    return this.authorRepository.delete(authorId);
  }
}
