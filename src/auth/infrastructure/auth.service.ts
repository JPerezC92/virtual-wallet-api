import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
	// constructor(
	// 	private readonly prismaService: PrismaService,
	// 	private readonly bcryptPasswordCipher: BcryptPasswordCipher,
	// ) {}
	// async registerUser(
	// 	createuserDto: usersSchemas.UserCreateDto,
	// 	exceptionMap: ExceptionMap,
	// ): Promise<usersSchemas.UserEndpoint> {
	// 	try {
	// 		return await this.prismaService.$transaction(async (db) => {
	// 			return await UserRegister(
	// 				AuthPrismaRepository(db),
	// 				UsersPrismaRepository(db),
	// 				this.bcryptPasswordCipher,
	// 				UserModelToEndpoint,
	// 			).execute(createuserDto);
	// 		});
	// 	} catch (error) {
	// 		const HttpException = ExceptionHandler(exceptionMap).find(error);
	// 		throw HttpException();
	// 	}
	// }
}
