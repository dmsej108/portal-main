'use client';

import { useMemo, useState } from 'react';
import { SButton, SIcon, SInput, SSelect } from '@zzou/design-system';
import MenuTreePanel from './MenuTreePanel';
import MenuDetailForm from './MenuDetailForm';
import {
  MOCK_MENU_TREE,
  CHANNEL_OPTIONS,
  USE_YN_OPTIONS,
  countMenus,
  filterMenuTree,
  findMenuById,
  findMenuPath,
} from './menu-data';

export default function CommonBankingMenuPage() {
  const [channel, setChannel] = useState('');
  const [useYn, setUseYn] = useState('');
  const [keyword, setKeyword] = useState('');
  const [applied, setApplied] = useState({ channel: '', useYn: '', keyword: '' });
  const [selectedId, setSelectedId] = useState<string | null>('M004');

  const filteredTree = useMemo(
    () => filterMenuTree(MOCK_MENU_TREE, applied.keyword, applied.channel, applied.useYn),
    [applied],
  );

  const stats = useMemo(() => countMenus(MOCK_MENU_TREE), []);
  const selectedMenu = selectedId ? findMenuById(MOCK_MENU_TREE, selectedId) : null;
  const breadcrumb = selectedId ? findMenuPath(MOCK_MENU_TREE, selectedId) ?? [] : [];

  const handleSearch = () => {
    setApplied({ channel, useYn, keyword });
  };

  const handleReset = () => {
    setChannel('');
    setUseYn('');
    setKeyword('');
    setApplied({ channel: '', useYn: '', keyword: '' });
  };

  return (
    <div className="menu-manage">
      <div className="ui-data-filter">
        <div className="form-item">
          <div className="item">
            <label>노출채널</label>
            <SSelect
              options={CHANNEL_OPTIONS}
              size="small"
              style={{ width: 140 }}
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
            />
          </div>
          <div className="item">
            <label>사용여부</label>
            <SSelect
              options={USE_YN_OPTIONS}
              size="small"
              style={{ width: 100 }}
              value={useYn}
              onChange={(e) => setUseYn(e.target.value)}
            />
          </div>
          <div className="item">
            <label>메뉴명/코드</label>
            <SInput
              placeholder="메뉴명, 메뉴코드, 경로"
              variant="outline"
              size="small"
              style={{ width: 220 }}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <div className="btn-filter-set">
            <SButton
              variant="outline"
              size="small"
              leftIcon={<SIcon name="search" size="small" aria-hidden />}
              onClick={handleSearch}
            >
              조회
            </SButton>
            <SButton variant="secondary" size="small" className="ml-5" onClick={handleReset}>
              초기화
            </SButton>
          </div>
        </div>
      </div>

      <ul className="menu-manage__stats">
        <li>
          <span className="label">전체 메뉴</span>
          <strong>{stats.total}</strong>
        </li>
        <li>
          <span className="label">사용</span>
          <strong className="is-on">{stats.active}</strong>
        </li>
        <li>
          <span className="label">미사용</span>
          <strong className="is-off">{stats.inactive}</strong>
        </li>
      </ul>

      <div className="table-util flex space-between">
        <span className="table-total">
          조회결과 트리 <strong>{filteredTree.length}</strong>개 루트 그룹
        </span>
        <div className="flex align-center btn-set-m">
          <SButton variant="outline" size="small">
            메뉴 일괄등록
          </SButton>
          <SButton variant="primary" size="small" onClick={() => alert('최상위 메뉴 등록 (목업)')}>
            메뉴 등록
          </SButton>
        </div>
      </div>

      <div className="menu-manage__split mt-20">
        <MenuTreePanel
          tree={filteredTree}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
        <MenuDetailForm
          menu={selectedMenu}
          breadcrumb={breadcrumb}
          onSave={() => alert('저장 (목업)')}
          onDelete={() => alert('삭제 (목업)')}
          onAddChild={() => alert('하위메뉴 추가 (목업)')}
        />
      </div>
    </div>
  );
}
