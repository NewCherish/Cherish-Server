import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RESPONSE_MESSAGE } from 'src/common/objects';
import { wrapSuccess } from 'src/utils/success';
import { AuthService } from './auth.service';
import {
  ResponseSigninData,
  ResponseSigninDto,
} from './dto/response-signin.dto';
import { CreateSigninDto } from './dto/create-signin.dto';
import { Validation } from 'src/utils/validation';

@Controller('auth')
@ApiTags('Auth')
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
export class AuthController {
  constructor(
    private authService: AuthService,
    private validation: Validation,
  ) {}

  @Post('signin/social')
  @ApiOperation({
    summary: '소셜 로그인 API',
    description:
      '카카오/애플 로그인을 진행하고, access/refresh token을 발급합니다.',
  })
  @ApiCreatedResponse({ type: ResponseSigninDto })
  @ApiBadRequestResponse({
    description:
      'Bad Request - 소셜 로그인 토큰을 보내지 않거나 kakao, apple 둘 다 보낸 경우',
  })
  @ApiNotFoundResponse({
    description:
      'Not Found - 소셜 로그인 토큰에 해당하는 유저 정보가 없는 경우',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - 소셜 로그인 토큰이 없거나 유효하지 않은 경우',
  })
  async signin(
    @Body() createSigninDto: CreateSigninDto,
  ): Promise<ResponseSigninDto> {
    await this.validation.validationSignin(createSigninDto);

    const { socialType } = createSigninDto;

    let data: ResponseSigninData;

    switch (socialType) {
      case 'kakao':
        data = <ResponseSigninData>(
          await this.authService.createKakaoUser(createSigninDto)
        );
        break;
      case 'apple':
    }

    return wrapSuccess(
      HttpStatus.CREATED,
      RESPONSE_MESSAGE.SIGNIN_USER_SUCCESS,
      data,
    );
  }
}
