export type UseYn = 'Y' | 'N';
export type VersionStatus = 'LIVE' | 'SCHEDULED' | 'DRAFT';
export type BlockType = 'HERO' | 'QUICK' | 'NOTICE' | 'PRODUCT' | 'BANNER' | 'CS';

export interface MainBlock {
  id: string;
  blockType: BlockType;
  blockName: string;
  title: string;
  subTitle: string;
  sortOrder: number;
  useYn: UseYn;
  linkUrl: string;
}

export interface MainVersion {
  id: string;
  versionName: string;
  status: VersionStatus;
  publishAt: string;
  updatedAt: string;
  updatedBy: string;
  blocks: MainBlock[];
}

export interface DeployHistory {
  deployId: string;
  versionName: string;
  deployAt: string;
  deployBy: string;
  result: '성공' | '실패' | '롤백';
  remark: string;
}

export const BLOCK_TYPE_LABEL: Record<BlockType, string> = {
  HERO: '히어로',
  QUICK: '퀵메뉴',
  NOTICE: '공지',
  PRODUCT: '추천상품',
  BANNER: '배너',
  CS: '고객센터',
};

export const VERSION_STATUS_LABEL: Record<VersionStatus, string> = {
  LIVE: '운영중',
  SCHEDULED: '예약',
  DRAFT: '임시저장',
};

export const MOCK_VERSIONS: MainVersion[] = [
  {
    id: 'V3',
    versionName: 'v3.2 운영',
    status: 'LIVE',
    publishAt: '2026-05-01 00:00',
    updatedAt: '2026-05-18 11:20',
    updatedBy: 'ent_admin',
    blocks: [
      { id: 'B1', blockType: 'HERO', blockName: '메인 히어로', title: '기업 프리미엄 뱅킹', subTitle: '맞춤형 자금관리', sortOrder: 1, useYn: 'Y', linkUrl: '/premium/intro' },
      { id: 'B2', blockType: 'QUICK', blockName: '퀵메뉴', title: '자주 쓰는 메뉴', subTitle: '이체·조회·승인', sortOrder: 2, useYn: 'Y', linkUrl: '' },
      { id: 'B3', blockType: 'NOTICE', blockName: '공지', title: '기업 공지', subTitle: '최근 3건 노출', sortOrder: 3, useYn: 'Y', linkUrl: '/notice' },
      { id: 'B4', blockType: 'PRODUCT', blockName: '추천상품', title: '기업대출·예금', subTitle: '금리 우대 상품', sortOrder: 4, useYn: 'Y', linkUrl: '/product' },
      { id: 'B5', blockType: 'BANNER', blockName: '프로모션', title: '5월 수수료 혜택', subTitle: '이벤트 배너', sortOrder: 5, useYn: 'Y', linkUrl: '/event/fee' },
      { id: 'B6', blockType: 'CS', blockName: '고객센터', title: '전담 PB 상담', subTitle: '평일 09~18', sortOrder: 6, useYn: 'N', linkUrl: '/cs' },
    ],
  },
  {
    id: 'V4',
    versionName: 'v3.3 예약',
    status: 'SCHEDULED',
    publishAt: '2026-06-01 00:00',
    updatedAt: '2026-05-19 09:05',
    updatedBy: 'ent_editor',
    blocks: [
      { id: 'B1', blockType: 'HERO', blockName: '메인 히어로', title: '스마트 기업금융', subTitle: 'AI 자금예측 오픈', sortOrder: 1, useYn: 'Y', linkUrl: '/premium/ai' },
      { id: 'B2', blockType: 'QUICK', blockName: '퀵메뉴', title: '자주 쓰는 메뉴', subTitle: '급여·세금·외화', sortOrder: 2, useYn: 'Y', linkUrl: '' },
      { id: 'B3', blockType: 'NOTICE', blockName: '공지', title: '기업 공지', subTitle: '최근 5건 노출', sortOrder: 3, useYn: 'Y', linkUrl: '/notice' },
      { id: 'B4', blockType: 'BANNER', blockName: '프로모션', title: '6월 기업고객 Week', subTitle: '사전 안내', sortOrder: 4, useYn: 'Y', linkUrl: '/event/june' },
    ],
  },
  {
    id: 'V5',
    versionName: 'v3.4 초안',
    status: 'DRAFT',
    publishAt: '-',
    updatedAt: '2026-05-20 14:40',
    updatedBy: 'ent_editor',
    blocks: [
      { id: 'B1', blockType: 'HERO', blockName: '메인 히어로', title: '초안 타이틀', subTitle: '작성중', sortOrder: 1, useYn: 'Y', linkUrl: '' },
      { id: 'B2', blockType: 'QUICK', blockName: '퀵메뉴', title: '퀵메뉴', subTitle: '', sortOrder: 2, useYn: 'Y', linkUrl: '' },
    ],
  },
];

export const MOCK_DEPLOY_HISTORY: DeployHistory[] = [
  { deployId: 'D1024', versionName: 'v3.2 운영', deployAt: '2026-05-01 00:02', deployBy: 'ent_admin', result: '성공', remark: '정기 배포' },
  { deployId: 'D1023', versionName: 'v3.1 운영', deployAt: '2026-04-01 00:01', deployBy: 'ent_admin', result: '성공', remark: '정기 배포' },
  { deployId: 'D1022', versionName: 'v3.0 운영', deployAt: '2026-03-15 18:30', deployBy: 'ent_ops', result: '롤백', remark: '히어로 링크 오류' },
  { deployId: 'D1021', versionName: 'v3.0 운영', deployAt: '2026-03-01 00:00', deployBy: 'ent_admin', result: '성공', remark: '신규 블록 추가' },
];

export function sortBlocks(blocks: MainBlock[]): MainBlock[] {
  return [...blocks].sort((a, b) => a.sortOrder - b.sortOrder);
}

export function moveBlock(blocks: MainBlock[], id: string, direction: 'up' | 'down'): MainBlock[] {
  const sorted = sortBlocks(blocks);
  const index = sorted.findIndex((b) => b.id === id);
  if (index < 0) return blocks;
  const swap = direction === 'up' ? index - 1 : index + 1;
  if (swap < 0 || swap >= sorted.length) return blocks;
  const next = [...sorted];
  [next[index], next[swap]] = [next[swap], next[index]];
  return next.map((b, i) => ({ ...b, sortOrder: i + 1 }));
}
