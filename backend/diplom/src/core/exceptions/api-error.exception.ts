import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiError extends HttpException {
	constructor (status: number, response: string) {
		super(response, status);
	}

	static Unauthorized(message?:string):ApiError {
		return new ApiError(
			HttpStatus.UNAUTHORIZED,
			message || 'Пользователь не авторизован'
		);
	}

	static BadRequest(message:string):ApiError {
		return new ApiError(
			HttpStatus.BAD_REQUEST,
			message
		);
	}

	static NotFound(message:string):ApiError {
		return new ApiError(
			HttpStatus.NOT_FOUND,
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