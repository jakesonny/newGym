import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * 헥사곤 6개 지표 (객체 형태, 값 없으면 null)
 */
export class HexagonIndicatorsDto {
  @ApiPropertyOptional({ description: '하체 근력 점수 (0-100)', example: 75, nullable: true })
  lowerBodyStrength?: number | null;

  @ApiPropertyOptional({ description: '심폐 지구력 점수 (0-100)', example: 60, nullable: true })
  cardiorespiratoryEndurance?: number | null;

  @ApiPropertyOptional({ description: '근지구력 점수 (0-100)', example: 70, nullable: true })
  muscularEndurance?: number | null;

  @ApiPropertyOptional({ description: '유연성 점수 (0-100)', example: 65, nullable: true })
  flexibility?: number | null;

  @ApiPropertyOptional({ description: '체성분 밸런스 점수 (0-100)', example: 80, nullable: true })
  bodyComposition?: number | null;

  @ApiPropertyOptional({ description: '부상 안정성 점수 (0-100)', example: 72, nullable: true })
  stability?: number | null;
}

export class HexagonDataDto {
  @ApiProperty({
    description: '6개 평가 항목 점수 (객체, 값 없으면 null)',
    type: HexagonIndicatorsDto,
    example: {
      lowerBodyStrength: 75,
      cardiorespiratoryEndurance: 60,
      muscularEndurance: 70,
      flexibility: 65,
      bodyComposition: 80,
      stability: 72,
    },
  })
  indicators: HexagonIndicatorsDto;

  @ApiProperty({ description: '평가 일시 (ISO 8601)', example: '2024-03-15T10:00:00Z' })
  assessedAt: string;

  @ApiProperty({ description: '버전', example: 'v1' })
  version: string;

  @ApiPropertyOptional({
    description: '초기 평가 데이터 (compare=true일 때만 포함)',
    nullable: true,
  })
  initial?: {
    indicators: HexagonIndicatorsDto;
    assessedAt: string;
    version: string;
  } | null;
}
