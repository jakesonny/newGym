export enum MembershipType {
	MONTHLY = 'MONTHLY',      // 일반 회원권: 월간
	QUARTERLY = 'QUARTERLY',  // 일반 회원권: 분기
	YEARLY = 'YEARLY',        // 일반 회원권: 연간
	LIFETIME = 'LIFETIME',    // 일반 회원권: 평생
	PT_PACKAGE = 'PT_PACKAGE', // PT 회원권: 집중 관리 프로그램
}

export enum MembershipStatus {
	ACTIVE = 'ACTIVE',
	EXPIRED = 'EXPIRED',
	SUSPENDED = 'SUSPENDED',
}

