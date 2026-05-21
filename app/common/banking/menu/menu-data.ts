export type UseYn = 'Y' | 'N';

export type MenuChannel = 'ALL' | 'PERSONAL' | 'STAR' | 'ENTERPRISE' | 'COMMON';

export interface MenuNode {
  id: string;
  menuCode: string;
  menuName: string;
  menuPath: string;
  depth: number;
  sortOrder: number;
  channel: MenuChannel;
  useYn: UseYn;
  authRequired: boolean;
  mobileYn: UseYn;
  pcYn: UseYn;
  iconId: string;
  updatedAt: string;
  updatedBy: string;
  children?: MenuNode[];
}

export const CHANNEL_OPTIONS = [
  { label: '전체 채널', value: 'ALL' },
  { label: '개인뱅킹', value: 'PERSONAL' },
  { label: '스타뱅킹', value: 'STAR' },
  { label: '기업뱅킹', value: 'ENTERPRISE' },
  { label: '뱅킹공통', value: 'COMMON' },
];

export const USE_YN_OPTIONS = [
  { label: '전체', value: '' },
  { label: '사용', value: 'Y' },
  { label: '미사용', value: 'N' },
];

export const CHANNEL_LABEL: Record<MenuChannel, string> = {
  ALL: '전체',
  PERSONAL: '개인뱅킹',
  STAR: '스타뱅킹',
  ENTERPRISE: '기업',
  COMMON: '공통',
};

export const MOCK_MENU_TREE: MenuNode[] = [
  {
    id: 'M001',
    menuCode: 'CB_ROOT',
    menuName: '뱅킹공통 루트',
    menuPath: '/',
    depth: 1,
    sortOrder: 1,
    channel: 'COMMON',
    useYn: 'Y',
    authRequired: false,
    mobileYn: 'Y',
    pcYn: 'Y',
    iconId: 'ico-home',
    updatedAt: '2026-05-18 14:22',
    updatedBy: 'admin01',
    children: [
      {
        id: 'M002',
        menuCode: 'CB_HOME',
        menuName: '홈/메인',
        menuPath: '/home',
        depth: 2,
        sortOrder: 1,
        channel: 'ALL',
        useYn: 'Y',
        authRequired: false,
        mobileYn: 'Y',
        pcYn: 'Y',
        iconId: 'ico-main',
        updatedAt: '2026-05-17 09:10',
        updatedBy: 'admin02',
      },
      {
        id: 'M003',
        menuCode: 'CB_ACCOUNT',
        menuName: '계좌',
        menuPath: '/account',
        depth: 2,
        sortOrder: 2,
        channel: 'COMMON',
        useYn: 'Y',
        authRequired: true,
        mobileYn: 'Y',
        pcYn: 'Y',
        iconId: 'ico-account',
        updatedAt: '2026-05-16 11:30',
        updatedBy: 'admin01',
        children: [
          {
            id: 'M004',
            menuCode: 'CB_ACCOUNT_LIST',
            menuName: '계좌조회',
            menuPath: '/account/list',
            depth: 3,
            sortOrder: 1,
            channel: 'COMMON',
            useYn: 'Y',
            authRequired: true,
            mobileYn: 'Y',
            pcYn: 'Y',
            iconId: 'ico-list',
            updatedAt: '2026-05-15 16:44',
            updatedBy: 'admin03',
          },
          {
            id: 'M005',
            menuCode: 'CB_ACCOUNT_HISTORY',
            menuName: '거래내역',
            menuPath: '/account/history',
            depth: 3,
            sortOrder: 2,
            channel: 'COMMON',
            useYn: 'Y',
            authRequired: true,
            mobileYn: 'Y',
            pcYn: 'N',
            iconId: 'ico-history',
            updatedAt: '2026-05-14 10:05',
            updatedBy: 'admin01',
          },
        ],
      },
      {
        id: 'M006',
        menuCode: 'CB_TRANSFER',
        menuName: '이체',
        menuPath: '/transfer',
        depth: 2,
        sortOrder: 3,
        channel: 'PERSONAL',
        useYn: 'Y',
        authRequired: true,
        mobileYn: 'Y',
        pcYn: 'Y',
        iconId: 'ico-transfer',
        updatedAt: '2026-05-13 13:20',
        updatedBy: 'admin02',
        children: [
          {
            id: 'M007',
            menuCode: 'CB_TRANSFER_IMM',
            menuName: '즉시이체',
            menuPath: '/transfer/immediate',
            depth: 3,
            sortOrder: 1,
            channel: 'PERSONAL',
            useYn: 'Y',
            authRequired: true,
            mobileYn: 'Y',
            pcYn: 'Y',
            iconId: 'ico-send',
            updatedAt: '2026-05-12 08:55',
            updatedBy: 'admin02',
          },
          {
            id: 'M008',
            menuCode: 'CB_TRANSFER_SCHED',
            menuName: '예약이체',
            menuPath: '/transfer/scheduled',
            depth: 3,
            sortOrder: 2,
            channel: 'PERSONAL',
            useYn: 'N',
            authRequired: true,
            mobileYn: 'Y',
            pcYn: 'Y',
            iconId: 'ico-calendar',
            updatedAt: '2026-05-11 17:40',
            updatedBy: 'admin04',
          },
        ],
      },
      {
        id: 'M009',
        menuCode: 'CB_GUIDE',
        menuName: '안내/고객센터',
        menuPath: '/guide',
        depth: 2,
        sortOrder: 4,
        channel: 'ALL',
        useYn: 'Y',
        authRequired: false,
        mobileYn: 'Y',
        pcYn: 'Y',
        iconId: 'ico-guide',
        updatedAt: '2026-05-10 12:00',
        updatedBy: 'admin01',
      },
      {
        id: 'M010',
        menuCode: 'CB_SETTINGS',
        menuName: '설정',
        menuPath: '/settings',
        depth: 2,
        sortOrder: 5,
        channel: 'STAR',
        useYn: 'Y',
        authRequired: true,
        mobileYn: 'Y',
        pcYn: 'N',
        iconId: 'ico-settings',
        updatedAt: '2026-05-09 15:18',
        updatedBy: 'admin03',
      },
    ],
  },
];

export function flattenMenus(nodes: MenuNode[], parentPath: string[] = []): { node: MenuNode; path: string[] }[] {
  return nodes.flatMap((node) => {
    const path = [...parentPath, node.menuName];
    const current = [{ node, path }];
    const child = node.children ? flattenMenus(node.children, path) : [];
    return [...current, ...child];
  });
}

export function findMenuById(nodes: MenuNode[], id: string): MenuNode | null {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findMenuById(node.children, id);
      if (found) return found;
    }
  }
  return null;
}

export function findMenuPath(nodes: MenuNode[], id: string, trail: string[] = []): string[] | null {
  for (const node of nodes) {
    const next = [...trail, node.menuName];
    if (node.id === id) return next;
    if (node.children) {
      const found = findMenuPath(node.children, id, next);
      if (found) return found;
    }
  }
  return null;
}

export function countMenus(nodes: MenuNode[]): { total: number; active: number; inactive: number } {
  const flat = flattenMenus(nodes);
  return {
    total: flat.length,
    active: flat.filter(({ node }) => node.useYn === 'Y').length,
    inactive: flat.filter(({ node }) => node.useYn === 'N').length,
  };
}

export function filterMenuTree(
  nodes: MenuNode[],
  keyword: string,
  channel: string,
  useYn: string,
): MenuNode[] {
  const kw = keyword.trim().toLowerCase();

  const match = (node: MenuNode) => {
    const channelOk = !channel || channel === 'ALL' || node.channel === channel || node.channel === 'ALL';
    const useOk = !useYn || node.useYn === useYn;
    const textOk =
      !kw ||
      node.menuName.toLowerCase().includes(kw) ||
      node.menuCode.toLowerCase().includes(kw) ||
      node.menuPath.toLowerCase().includes(kw);
    return channelOk && useOk && textOk;
  };

  const walk = (list: MenuNode[]): MenuNode[] =>
    list
      .map((node) => {
        const children = node.children ? walk(node.children) : [];
        if (match(node) || children.length > 0) {
          return { ...node, children: children.length ? children : node.children?.length ? children : undefined };
        }
        return null;
      })
      .filter((n): n is MenuNode => n !== null);

  return walk(nodes);
}
