export type UseYn = 'Y' | 'N';

export interface CodeGroup {
  groupCode: string;
  groupName: string;
  description: string;
  useYn: UseYn;
  codeCount: number;
}

export interface CommonCode {
  id: string;
  groupCode: string;
  code: string;
  codeName: string;
  codeNameEn: string;
  sortOrder: number;
  useYn: UseYn;
  attr1: string;
  attr2: string;
  remark: string;
  updatedAt: string;
  updatedBy: string;
}

export const USE_YN_FILTER = [
  { label: '전체', value: '' },
  { label: '사용', value: 'Y' },
  { label: '미사용', value: 'N' },
];

export const MOCK_CODE_GROUPS: CodeGroup[] = [
  { groupCode: 'CHANNEL_TYPE', groupName: '채널구분', description: '노출 채널 구분 코드', useYn: 'Y', codeCount: 5 },
  { groupCode: 'MENU_TYPE', groupName: '메뉴유형', description: '메뉴 블록/유형 코드', useYn: 'Y', codeCount: 6 },
  { groupCode: 'AUTH_LEVEL', groupName: '인증등급', description: '로그인/인증 레벨', useYn: 'Y', codeCount: 4 },
  { groupCode: 'BANNER_POS', groupName: '배너위치', description: '배너 노출 위치', useYn: 'Y', codeCount: 5 },
  { groupCode: 'NOTI_TYPE', groupName: '공지유형', description: '공지사항 분류', useYn: 'Y', codeCount: 4 },
  { groupCode: 'EVENT_TYPE', groupName: '이벤트유형', description: '마케팅 이벤트 유형', useYn: 'N', codeCount: 3 },
];

export const MOCK_CODES: CommonCode[] = [
  { id: 'C001', groupCode: 'CHANNEL_TYPE', code: 'ALL', codeName: '전체', codeNameEn: 'ALL', sortOrder: 1, useYn: 'Y', attr1: '', attr2: '', remark: '', updatedAt: '2026-05-10', updatedBy: 'admin01' },
  { id: 'C002', groupCode: 'CHANNEL_TYPE', code: 'PERSONAL', codeName: '개인뱅킹', codeNameEn: 'PERSONAL', sortOrder: 2, useYn: 'Y', attr1: 'PB', attr2: '', remark: '', updatedAt: '2026-05-10', updatedBy: 'admin01' },
  { id: 'C003', groupCode: 'CHANNEL_TYPE', code: 'STAR', codeName: '스타뱅킹', codeNameEn: 'STAR', sortOrder: 3, useYn: 'Y', attr1: 'SB', attr2: '', remark: '', updatedAt: '2026-05-11', updatedBy: 'admin02' },
  { id: 'C004', groupCode: 'CHANNEL_TYPE', code: 'ENTERPRISE', codeName: '기업뱅킹', codeNameEn: 'ENT', sortOrder: 4, useYn: 'Y', attr1: 'ENT', attr2: '', remark: '', updatedAt: '2026-05-11', updatedBy: 'admin02' },
  { id: 'C005', groupCode: 'CHANNEL_TYPE', code: 'COMMON', codeName: '뱅킹공통', codeNameEn: 'COMMON', sortOrder: 5, useYn: 'Y', attr1: 'CB', attr2: '', remark: '', updatedAt: '2026-05-12', updatedBy: 'admin01' },
  { id: 'C010', groupCode: 'MENU_TYPE', code: 'HERO', codeName: '히어로', codeNameEn: 'HERO', sortOrder: 1, useYn: 'Y', attr1: 'BLOCK', attr2: 'MAIN', remark: '메인 상단', updatedAt: '2026-05-08', updatedBy: 'admin03' },
  { id: 'C011', groupCode: 'MENU_TYPE', code: 'QUICK', codeName: '퀵메뉴', codeNameEn: 'QUICK', sortOrder: 2, useYn: 'Y', attr1: 'BLOCK', attr2: 'MAIN', remark: '', updatedAt: '2026-05-08', updatedBy: 'admin03' },
  { id: 'C012', groupCode: 'MENU_TYPE', code: 'NOTICE', codeName: '공지', codeNameEn: 'NOTICE', sortOrder: 3, useYn: 'Y', attr1: 'BLOCK', attr2: 'MAIN', remark: '', updatedAt: '2026-05-09', updatedBy: 'admin01' },
  { id: 'C013', groupCode: 'MENU_TYPE', code: 'BANNER', codeName: '배너', codeNameEn: 'BANNER', sortOrder: 4, useYn: 'Y', attr1: 'BLOCK', attr2: 'SUB', remark: '', updatedAt: '2026-05-09', updatedBy: 'admin01' },
  { id: 'C020', groupCode: 'AUTH_LEVEL', code: 'L0', codeName: '비로그인', codeNameEn: 'GUEST', sortOrder: 1, useYn: 'Y', attr1: '0', attr2: '', remark: '', updatedAt: '2026-04-20', updatedBy: 'admin01' },
  { id: 'C021', groupCode: 'AUTH_LEVEL', code: 'L1', codeName: '간편인증', codeNameEn: 'SIMPLE', sortOrder: 2, useYn: 'Y', attr1: '1', attr2: '', remark: '', updatedAt: '2026-04-20', updatedBy: 'admin01' },
  { id: 'C022', groupCode: 'AUTH_LEVEL', code: 'L2', codeName: '공동인증', codeNameEn: 'CERT', sortOrder: 3, useYn: 'Y', attr1: '2', attr2: '', remark: '', updatedAt: '2026-04-21', updatedBy: 'admin02' },
  { id: 'C030', groupCode: 'BANNER_POS', code: 'TOP', codeName: '상단', codeNameEn: 'TOP', sortOrder: 1, useYn: 'Y', attr1: '', attr2: '', remark: '메인 최상단', updatedAt: '2026-05-01', updatedBy: 'admin02' },
  { id: 'C031', groupCode: 'BANNER_POS', code: 'MID', codeName: '중단', codeNameEn: 'MIDDLE', sortOrder: 2, useYn: 'Y', attr1: '', attr2: '', remark: '', updatedAt: '2026-05-01', updatedBy: 'admin02' },
  { id: 'C040', groupCode: 'NOTI_TYPE', code: 'SYS', codeName: '시스템', codeNameEn: 'SYSTEM', sortOrder: 1, useYn: 'Y', attr1: '', attr2: '', remark: '', updatedAt: '2026-03-15', updatedBy: 'admin01' },
  { id: 'C041', groupCode: 'NOTI_TYPE', code: 'SVC', codeName: '서비스', codeNameEn: 'SERVICE', sortOrder: 2, useYn: 'Y', attr1: '', attr2: '', remark: '', updatedAt: '2026-03-15', updatedBy: 'admin01' },
];

export function filterCodes(
  codes: CommonCode[],
  groupCode: string,
  keyword: string,
  useYn: string,
): CommonCode[] {
  const kw = keyword.trim().toLowerCase();
  return codes.filter((c) => {
    if (groupCode && c.groupCode !== groupCode) return false;
    if (useYn && c.useYn !== useYn) return false;
    if (
      kw &&
      !c.code.toLowerCase().includes(kw) &&
      !c.codeName.toLowerCase().includes(kw) &&
      !c.codeNameEn.toLowerCase().includes(kw)
    ) {
      return false;
    }
    return true;
  });
}

export function findCodeById(codes: CommonCode[], id: string): CommonCode | undefined {
  return codes.find((c) => c.id === id);
}
