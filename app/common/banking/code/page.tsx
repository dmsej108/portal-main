'use client';

import { useCallback, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import type { ColDef, GridReadyEvent, RowClickedEvent } from 'ag-grid-community';
import { SButton, SIcon, SInput, SSelect } from '@dmsej108/design-system';
import CodeGroupPanel from './CodeGroupPanel';
import CodeDetailForm from './CodeDetailForm';
import {
  MOCK_CODE_GROUPS,
  MOCK_CODES,
  USE_YN_FILTER,
  filterCodes,
  findCodeById,
} from './code-data';

const AgGridReact = dynamic(
  () => import('@/lib/config/ag-grid').then((m) => ({ default: m.AgGridReact })),
  { ssr: false },
);

export default function CommonBankingCodePage() {
  const [selectedGroupCode, setSelectedGroupCode] = useState('CHANNEL_TYPE');
  const [selectedCodeId, setSelectedCodeId] = useState<string | null>('C001');
  const [useYn, setUseYn] = useState('');
  const [keyword, setKeyword] = useState('');
  const [applied, setApplied] = useState({ useYn: '', keyword: '' });

  const groupsWithCount = useMemo(
    () =>
      MOCK_CODE_GROUPS.map((g) => ({
        ...g,
        codeCount: MOCK_CODES.filter((c) => c.groupCode === g.groupCode).length,
      })),
    [],
  );

  const selectedGroup = groupsWithCount.find((g) => g.groupCode === selectedGroupCode);

  const rowData = useMemo(
    () =>
      filterCodes(MOCK_CODES, selectedGroupCode, applied.keyword, applied.useYn).sort(
        (a, b) => a.sortOrder - b.sortOrder,
      ),
    [selectedGroupCode, applied],
  );

  const selectedCode = selectedCodeId ? findCodeById(MOCK_CODES, selectedCodeId) : null;

  const stats = useMemo(() => {
    const groupCodes = MOCK_CODES.filter((c) => c.groupCode === selectedGroupCode);
    return {
      total: groupCodes.length,
      active: groupCodes.filter((c) => c.useYn === 'Y').length,
      inactive: groupCodes.filter((c) => c.useYn === 'N').length,
    };
  }, [selectedGroupCode]);

  const handleSearch = () => setApplied({ useYn, keyword });
  const handleReset = () => {
    setUseYn('');
    setKeyword('');
    setApplied({ useYn: '', keyword: '' });
  };

  const handleGroupSelect = (groupCode: string) => {
    setSelectedGroupCode(groupCode);
    const first = filterCodes(MOCK_CODES, groupCode, '', '').sort((a, b) => a.sortOrder - b.sortOrder)[0];
    setSelectedCodeId(first?.id ?? null);
  };

  const onRowClicked = (e: RowClickedEvent) => {
    if (e.data?.id) setSelectedCodeId(e.data.id);
  };

  const onGridReady = useCallback((params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
  }, []);

  const [colDefs] = useState<ColDef[]>([
    { field: 'code', headerName: '코드', width: 110, cellClass: 'centered' },
    { field: 'codeName', headerName: '코드명', width: 140 },
    { field: 'codeNameEn', headerName: '코드명(EN)', width: 120, cellClass: 'centered' },
    { field: 'sortOrder', headerName: '정렬', width: 70, cellClass: 'centered' },
    { field: 'useYn', headerName: '사용', width: 70, cellClass: 'centered' },
    { field: 'attr1', headerName: '속성1', width: 90, cellClass: 'centered' },
    { field: 'attr2', headerName: '속성2', width: 90, cellClass: 'centered' },
    { field: 'remark', headerName: '비고', flex: 1, minWidth: 120 },
    { field: 'updatedAt', headerName: '수정일', width: 100, cellClass: 'centered' },
  ]);

  return (
    <div className="code-manage">
      <div className="ui-data-filter">
        <div className="form-item">
          <div className="item">
            <label>그룹코드</label>
            <SInput type="text" size="small" value={selectedGroupCode} readOnly style={{ width: 160 }} />
          </div>
          <div className="item">
            <label>사용여부</label>
            <SSelect
              options={USE_YN_FILTER}
              size="small"
              style={{ width: 100 }}
              value={useYn}
              onChange={(e) => setUseYn(e.target.value)}
            />
          </div>
          <div className="item">
            <label>코드/코드명</label>
            <SInput
              placeholder="검색"
              size="small"
              style={{ width: 180 }}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <div className="flex align-center btn-filter-set">
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
          <span className="label">선택 그룹</span>
          <strong>{selectedGroup?.groupName ?? '-'}</strong>
        </li>
        <li>
          <span className="label">코드 수</span>
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

      <div className="code-manage__split">
        <CodeGroupPanel
          groups={groupsWithCount}
          selectedGroupCode={selectedGroupCode}
          onSelect={handleGroupSelect}
          onAddGroup={() => alert('코드 그룹 등록 (목업)')}
        />

        <div className="code-manage__main">
          <div className="table-util flex space-between">
            <span className="table-total">
              <strong>{selectedGroupCode}</strong> · 조회 <strong>{rowData.length}</strong>건
              {selectedGroup?.description && (
                <span className="code-manage__desc"> — {selectedGroup.description}</span>
              )}
            </span>
            <div className="flex align-center btn-set-m">
              <SButton variant="outline" size="small" onClick={() => alert('엑셀 다운로드 (목업)')}>
                다운로드
              </SButton>
              <SButton variant="primary" size="small" className="ml-5" onClick={() => alert('코드 등록 (목업)')}>
                코드 등록
              </SButton>
            </div>
          </div>

          <div className="ag-theme tbl-wrap">
            <AgGridReact
              rowData={rowData}
              columnDefs={colDefs}
              domLayout="autoHeight"
              rowSelection="single"
              onGridReady={onGridReady}
              onRowClicked={onRowClicked}
            />
          </div>

          <CodeDetailForm
            code={selectedCode && selectedCode.groupCode === selectedGroupCode ? selectedCode : null}
            groupName={selectedGroup?.groupName ?? ''}
            onSave={() => alert('저장 (목업)')}
            onDelete={() => alert('삭제 (목업)')}
            onNew={() => alert('신규 코드 (목업)')}
          />
        </div>
      </div>
    </div>
  );
}
