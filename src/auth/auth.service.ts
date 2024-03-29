import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';
import { User } from '@prisma/client';
import * as argon2 from 'argon2';
import { nanoid } from 'nanoid';

import { UsersService } from 'src/users/users.service';
import { ResponseSigninData } from './dto/response-signin.dto';
import { CreateSigninDto } from './dto/create-signin.dto';
import { ResponseTokenData } from './dto/response-token.dto';
import { JwtPayload, JwtToken } from 'src/common/interfaces';
import { forbidden, notFound } from 'src/utils/error';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly http: HttpService,
    private readonly usersService: UsersService,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  async getJwtToken(user: User): Promise<JwtToken> {
    const uniqueId: string =
      user.socialType === 'kakao' ? user.kakaoId.toString() : user.appleId;

    const payload: JwtPayload = {
      id: user.id,
      socialType: user.socialType,
      uniqueId,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.config.get<string>('accessTokenSecret'),
        expiresIn: '10d',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.config.get<string>('refreshTokenSecret'),
        expiresIn: '30d',
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async getHashedRefreshToken(refreshToken: string): Promise<string> {
    return await argon2.hash(refreshToken);
  }

  async updateToken(
    id: number,
    hashedRefreshToken: string,
  ): Promise<ResponseTokenData> {
    const user = <User>await this.usersService.getUserById(id);
    if (!user || !user.refreshToken) {
      throw notFound();
    }

    const isRefreshTokenMatch: boolean = await argon2.verify(
      user.refreshToken,
      hashedRefreshToken,
    );
    if (!isRefreshTokenMatch) {
      throw forbidden();
    }

    const newTokens = await this.getJwtToken(user);
    const newHashedRefreshToken = await this.getHashedRefreshToken(
      newTokens.refreshToken,
    );

    await this.usersService.updateRefreshTokenByUserId(
      user.id,
      newHashedRefreshToken,
    );

    return newTokens;
  }

  async createKakaoUser(
    createSigninDto: CreateSigninDto,
  ): Promise<ResponseSigninData> {
    const { kakaoAccessToken, socialType, nickname, fcmToken } =
      createSigninDto;

    const requestHeader = {
      Authorization: `Bearer ${kakaoAccessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    };

    const kakaoRequestUserUrl = `https://kapi.kakao.com/v2/user/me`;

    const userResponse = await firstValueFrom(
      this.http.get(kakaoRequestUserUrl, {
        headers: requestHeader,
      }),
    );
    if (!userResponse) {
      throw notFound();
    }

    this.logger.debug('get kakao user success', userResponse.data);

    const { id } = userResponse.data;
    const { email } = userResponse.data?.kakao_account;

    let user = await this.usersService.getUserByKaKaoId(id);

    if (!user) {
      const newUser = {
        uuid: nanoid(4),
        kakaoId: id,
        email: email ?? undefined,
        refreshToken: '',
        title: '',
        fcmToken,
        nickname,
        socialType,
      };

      user = await this.usersService.createUser(newUser);
    }

    const tokens: JwtToken = await this.getJwtToken(user);
    const hashedRefreshToken: string = await this.getHashedRefreshToken(
      tokens.refreshToken,
    );

    await this.usersService.updateRefreshTokenByUserId(
      user.id,
      hashedRefreshToken,
    );

    return {
      ...tokens,
      id: user.id,
    };
  }
}
