import {Controller, forwardRef, Get, Inject, UseGuards} from '@nestjs/common';

import {HomAuthGuard} from '@hom-module/auth/guard';

import {PostService} from './index.service';

@Controller('posts')
export class PostController {
  constructor(@Inject(forwardRef(() => PostService)) private post: PostService) {}

  @UseGuards(HomAuthGuard)
  @Get('/')
  getPosts() {
    return this.post.getPosts();
  }
}
