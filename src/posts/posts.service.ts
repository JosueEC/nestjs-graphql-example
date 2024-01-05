import { Injectable } from '@nestjs/common';
import { PostEntity } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { AuthorsService } from 'src/authors/authors.service';
import { AuthorEntity } from 'src/authors/entities/author.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    private readonly authorService: AuthorsService,
  ) {}

  async findAll(): Promise<Array<PostEntity>> {
    return this.postRepository.find();
  }

  async createPost(post: CreatePostInput): Promise<PostEntity> {
    return this.postRepository.save(post);
  }

  async findPostById(postId: number): Promise<PostEntity> {
    return this.postRepository.findOne({
      where: {
        id: postId,
      },
    });
  }

  async getAuthor(authorId: number): Promise<AuthorEntity> {
    return this.authorService.findOne(authorId);
  }
}
