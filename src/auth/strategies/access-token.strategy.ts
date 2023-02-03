import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/common/interfaces';
import { RESPONSE_MESSAGE } from 'src/common/objects';
import CustomException from 'src/exceptions/custom.exception';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('accessTokenSecret'),
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.id,
        isDeleted: false,
      },
    });

    if (!user) {
      throw new CustomException(
        HttpStatus.NOT_FOUND,
        RESPONSE_MESSAGE.NOT_FOUND,
      );
    }

    return {
      id: payload.id,
      uniqueId: payload.uniqueId,
      socialType: payload.socialType,
    };
  }
}
