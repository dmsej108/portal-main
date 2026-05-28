'use client';

import { useCallback, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import type { ColDef, GridReadyEvent } from 'ag-grid-community';
import { SButton, SIcon, SSelect } from '@zzou/design-system';
import BlockListPanel from './BlockListPanel';
import BlockDetailForm from './BlockDetailForm';
import MainPreview from './MainPreview';
import {
  MOCK_VERSIONS,
  MOCK_DEPLOY_HISTORY,
  VERSION_STATUS_LABEL,
  moveBlock,
  type MainVersion,
  type MainBlock,
} from './main-data';

const AgGridReact = dynamic(
  () => import('@/lib/config/ag-grid').then((m) => ({ default: m.AgGridReact })),
  { ssr: false },
);

const statusFilterOptions = [
  { label: '전체', value: '' },
  { label: '운영중', value: 'LIVE' },
  { label: '예약', value: 'SCHEDULED' },
  { label: '임시저장', value: 'DRAFT' },
];

export default function PersonalBankingMainPage() {
  const [versions, setVersions] = useState<MainVersion[]>(MOCK_VERSIONS);
  const [activeVersionId, setActiveVersionId] = useState('V3');
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>('B1');
  const [statusFilter, setStatusFilter] = useState('');

  const visibleVersions = useMemo(
    () => versions.filter((v) => !statusFilter || v.status === statusFilter),
    [versions, statusFilter],
  );

  const activeVersion = versions.find((v) => v.id === activeVersionId) ?? versions[0];
  const blocks = activeVersion?.blocks ?? [];
  const selectedBlock = blocks.find((b) => b.id === selectedBlockId) ?? null;

  const updateVersionBlocks = (versionId: string, nextBlocks: MainBlock[]) => {
    setVersions((prev) =>
      prev.map((v) => (v.id === versionId ? { ...v, blocks: nextBlocks } : v)),
    );
  };

  const handleMoveBlock = (id: string, direction: 'up' | 'down') => {
    if (!activeVersion) return;
    updateVersionBlocks(activeVersion.id, moveBlock(activeVersion.blocks, id, direction));
  };

  const handleSelectVersion = (id: string) => {
    setActiveVersionId(id);
    const first = versions.find((v) => v.id === id)?.blocks[0];
    setSelectedBlockId(first?.id ?? null);
  };

  const onGridReady = useCallback((params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
  }, []);

  const [historyCols] = useState<ColDef[]>([
    { field: 'deployId', headerName: '배포ID', width: 100, cellClass: 'centered' },
    { field: 'versionName', headerName: '버전', width: 120 },
    { field: 'deployAt', headerName: '배포일시', width: 160, cellClass: 'centered' },
    { field: 'deployBy', headerName: '배포자', width: 100, cellClass: 'centered' },
    { field: 'result', headerName: '결과', width: 90, cellClass: 'centered' },
    { field: 'remark', headerName: '비고', flex: 1, minWidth: 160 },
  ]);

  if (!activeVersion) return null;

  return (
    <div className="ep-main">
      <div className="ui-data-filter">
        <div className="form-item">
          <div className="item">
            <label>버전상태</label>
            <SSelect
              options={statusFilterOptions}
              size="small"
              style={{ width: 120 }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            />
          </div>
          <div className="btn-filter-set">
            <SButton
              variant="outline"
              size="small"
              leftIcon={<SIcon name="search" size="small" aria-hidden />}
              onClick={() => {}}
            >
              조회
            </SButton>
          </div>
        </div>
      </div>

      <div className="ep-main__versions">
        {visibleVersions.map((v) => (
          <button
            key={v.id}
            type="button"
            className={`ep-main__version-card${activeVersionId === v.id ? ' is-active' : ''}`}
            onClick={() => handleSelectVersion(v.id)}
          >
            <span className={`ep-main__status ep-main__status--${v.status.toLowerCase()}`}>
              {VERSION_STATUS_LABEL[v.status]}
            </span>
            <strong>{v.versionName}</strong>
            <span className="ep-main__meta">배포 {v.publishAt}</span>
            <span className="ep-main__meta">블록 {v.blocks.length}개</span>
          </button>
        ))}
        <button type="button" className="ep-main__version-card ep-main__version-card--add" onClick={() => alert('신규 버전 (목업)')}>
          + 새 버전
        </button>
      </div>

      <div className="table-util flex space-between">
        <span className="table-total">
          <strong>{activeVersion.versionName}</strong> 구성 편집 · 최종 수정 {activeVersion.updatedAt} ({activeVersion.updatedBy})
        </span>
        <div className="flex align-center btn-set-m">
          <SButton variant="outline" size="small" onClick={() => alert('미리보기 URL (목업)')}>
            앱 미리보기
          </SButton>
          <SButton variant="outline" size="small" onClick={() => alert('예약 배포 (목업)')}>
            예약 배포
          </SButton>
          <SButton variant="primary" size="small" onClick={() => alert('즉시 배포 (목업)')}>
            배포
          </SButton>
        </div>
      </div>

      <div className="ep-main__workspace mt-20">
        <BlockListPanel
          blocks={blocks}
          selectedId={selectedBlockId}
          onSelect={setSelectedBlockId}
          onMove={handleMoveBlock}
          onAdd={() => alert('블록 추가 (목업)')}
        />
        <MainPreview blocks={blocks} versionName={activeVersion.versionName} />
        <BlockDetailForm
          block={selectedBlock}
          onSave={() => alert('블록 저장 (목업)')}
          onDelete={() => alert('블록 삭제 (목업)')}
        />
      </div>

      <div className="ep-main__history">
        <h3 className="ep-main__history-title">배포 이력</h3>
        <div className="ag-theme tbl-wrap" style={{ marginTop: 0 }}>
          <AgGridReact
            rowData={MOCK_DEPLOY_HISTORY}
            columnDefs={historyCols}
            domLayout="autoHeight"
            onGridReady={onGridReady}
          />
        </div>
      </div>
    </div>
  );
}
