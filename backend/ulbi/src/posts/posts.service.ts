import { Injectable } from '@nestjs/common';
import { Post } from './posts.model';
import { CreatePostDTO } from './dto/create-post.dto';
import { FilesService } from 'src/files/files.service';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class PostsService {

	constructor(
		@InjectModel(Post)
		private postsRepository: typeof Post,
		private fileService: FilesService
	) {}

	async create(DTO: CreatePostDTO, image:any) {
		const fileName = await this.fileService.createFile(image);
		const post = await this.postsRepository.create({...DTO, image: fileName});
		return post;
	}

}
