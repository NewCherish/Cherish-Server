import { Logger } from '@nestjs/common';
import { CreateSigninDto } from 'src/auth/dto/create-signin.dto';
import { CustomException } from 'src/exceptions';
import { badRequest } from './error';
import { CreatePlantWaterLogDto } from 'src/plants/dto/plantwaterlog.dto';

export class Validation {
  private readonly logger = new Logger(Validation.name);

  async validationSignin(
    createSigninDto: CreateSigninDto,
  ): Promise<CustomException> {
    const { socialType, kakaoAccessToken, idToken, code } = createSigninDto;

    if (!kakaoAccessToken && !idToken && !code) {
      this.logger.error('empty field', createSigninDto);
      return badRequest();
    }

    if (kakaoAccessToken && idToken && code) {
      this.logger.error('duplicate apple, kakao', createSigninDto);
      return badRequest();
    }

    if (socialType === 'kakao' && !kakaoAccessToken) {
      this.logger.error('empty kakao access token', createSigninDto);
      return badRequest();
    }

    if (socialType === 'apple') {
      if ((idToken && !code) || (!idToken && code)) {
        this.logger.error('empty apple token', createSigninDto);
        return badRequest();
      }
    }
  }
}
