import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreatePostDTO } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation } from '@nestjs/swagger';

@Controller('posts')
export class PostsController {

	constructor(
		private postsService: PostsService
	){}


	//* /posts
	@ApiOperation({ summary: 'Создание поста' })
	@Post()
	@UseInterceptors(FileInterceptor('image'))
	create(
		@Body() postDTO: CreatePostDTO,
		@UploadedFile() image
	) {
		return this.postsService.create(postDTO, image);
	}

}
