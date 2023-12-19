import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiError extends HttpException {
	constructor (status: number, response: string) {
		super(response, status);
	}

	static Unauthorized():ApiError {
		return new ApiError(
			HttpStatus.UNAUTHORIZED,
			'Пользователь не авторизован'
		);
	}

	static BadRequest(message:string):ApiError {
		return new ApiError(
			HttpStatus.BAD_REQUEST,
			message
		);
	}

	static InternalServerError(message:string):ApiError {
		return new ApiError(
			HttpStatus.INTERNAL_SERVER_ERROR,
			message
		);
	}
}