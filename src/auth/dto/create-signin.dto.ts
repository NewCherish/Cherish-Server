import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSigninDto {
  @ApiProperty({ required: true, description: 'kakao / apple' })
  @IsString()
  @IsNotEmpty()
  socialType: 'kakao' | 'apple';

  @ApiProperty({ required: true, description: 'nickname' })
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @ApiProperty({ required: true, description: 'push alarm fcm token' })
  @IsString()
  @IsNotEmpty()
  fcmToken: string;

  @ApiPropertyOptional({ description: 'kakao access token' })
  @IsOptional()
  @IsString()
  kakaoAccessToken?: string;

  @ApiPropertyOptional({ description: 'apple id token' })
  @IsOptional()
  @IsString()
  idToken?: string;

  @ApiPropertyOptional({ description: 'apple authorization code' })
  @IsOptional()
  @IsString()
  code?: string;
}
