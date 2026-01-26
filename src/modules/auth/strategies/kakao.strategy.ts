import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
	private readonly logger = new Logger(KakaoStrategy.name);

	constructor(
		private configService: ConfigService,
		private authService: AuthService,
	) {
		const clientID = configService.get<string>('KAKAO_CLIENT_ID');
		const clientSecret = configService.get<string>('KAKAO_CLIENT_SECRET');
		const callbackURL = configService.get<string>('KAKAO_REDIRECT_URI');

		// 설정 값 검증 및 로깅
		if (!clientID) {
			this.logger.error('KAKAO_CLIENT_ID가 설정되지 않았습니다.');
		}
		if (!callbackURL) {
			this.logger.error('KAKAO_REDIRECT_URI가 설정되지 않았습니다.');
		}

		this.logger.log('카카오 OAuth 설정 초기화:');
		this.logger.log(`  - Client ID: ${clientID ? `${clientID.substring(0, 8)}...` : '없음'}`);
		this.logger.log(`  - Callback URL: ${callbackURL || '없음'}`);
		this.logger.log(`  - Client Secret: ${clientSecret ? '설정됨' : '없음'}`);

		super({
			clientID,
			...(clientSecret && { clientSecret }), // Client Secret이 있을 때만 추가
			callbackURL,
		});
	}

	async validate(accessToken: string, refreshToken: string, profile: any) {
		try {
			this.logger.log('카카오 사용자 인증 시작');
			this.logger.debug(`카카오 프로필 ID: ${profile?.id}`);

			const { id, username, _json } = profile;

			// 카카오 사용자 정보 추출
			const kakaoUser = {
				provider: 'KAKAO',
				providerId: id.toString(),
				email: _json.kakao_account?.email,
				name: username || _json.kakao_account?.profile?.nickname || '카카오 사용자',
			};

			this.logger.log(`카카오 사용자 정보 추출 완료: ${kakaoUser.name} (${kakaoUser.providerId})`);

			// 사용자 검증/생성 및 토큰 반환
			const result = await this.authService.validateOrCreateSocialUser(kakaoUser);
			this.logger.log(`카카오 로그인 성공: 사용자 ID ${result.user.id}`);
			return result;
		} catch (error) {
			this.logger.error('카카오 사용자 인증 실패:', error);
			this.logger.error(`에러 메시지: ${error.message}`);
			if (error.stack) {
				this.logger.error(`스택 트레이스: ${error.stack}`);
			}
			throw error;
		}
	}
}

