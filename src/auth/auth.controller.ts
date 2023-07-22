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

import { AuthService } from './auth.service';
import {
  ResponseSigninData,
  ResponseSigninDto,
} from './dto/response-signin.dto';
import { CreateSigninDto } from './dto/create-signin.dto';
import { Validation } from 'src/utils/validation';
import { wrapSuccess } from 'src/utils/success';
import { RESPONSE_MESSAGE } from 'src/common/objects';
import { ERROR_DESCRIPTION, SIGNIN_DESCRIPTION } from 'src/constants/swagger';

@Controller('auth')
@ApiTags('Auth')
@ApiInternalServerErrorResponse({
  description: ERROR_DESCRIPTION.INTERNAL_SERVER_ERROR,
})
export class AuthController {
  constructor(
    private authService: AuthService,
    private validation: Validation,
  ) {}

  @Post('signin/social')
  @ApiOperation({
    summary: SIGNIN_DESCRIPTION.API_OPERATION.SUMMARY,
    description: SIGNIN_DESCRIPTION.API_OPERATION.DESCRIPTION,
  })
  @ApiCreatedResponse({ type: ResponseSigninDto })
  @ApiUnauthorizedResponse({
    description: SIGNIN_DESCRIPTION.ERROR_DESCRIPTION.UNAUTHORIZED,
  })
  @ApiBadRequestResponse({
    description: SIGNIN_DESCRIPTION.ERROR_DESCRIPTION.BAD_REQUEST,
  })
  @ApiNotFoundResponse({
    description: SIGNIN_DESCRIPTION.ERROR_DESCRIPTION.NOT_FOUND,
  })
  async signin(
    @Body() createSigninDto: CreateSigninDto,
  ): Promise<ResponseSigninDto> {
    await this.validation.validationSignin(createSigninDto);

    const { socialType } = createSigninDto;

    let data: ResponseSigninData;

    switch (socialType) {
      case 'kakao':
        data = await this.authService.createKakaoUser(createSigninDto);
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
