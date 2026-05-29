'use client';

import { SButton } from '@dmsej108/design-system';
import type { MainBlock } from './main-data';
import { BLOCK_TYPE_LABEL, sortBlocks } from './main-data';

interface BlockListPanelProps {
  blocks: MainBlock[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onMove: (id: string, direction: 'up' | 'down') => void;
  onAdd: () => void;
}

export default function BlockListPanel({
  blocks,
  selectedId,
  onSelect,
  onMove,
  onAdd,
}: BlockListPanelProps) {
  const sorted = sortBlocks(blocks);

  return (
    <div className="ep-block-list">
      <div className="ep-block-list__head">
        <strong>화면 블록</strong>
        <SButton variant="ghost" size="small" onClick={onAdd}>
          + 추가
        </SButton>
      </div>
      <ul className="ep-block-list__items">
        {sorted.map((block, index) => (
          <li
            key={block.id}
            className={`ep-block-list__item${selectedId === block.id ? ' is-selected' : ''}${block.useYn === 'N' ? ' is-off' : ''}`}
          >
            <button type="button" className="ep-block-list__main" onClick={() => onSelect(block.id)}>
              <span className="ep-block-list__order">{block.sortOrder}</span>
              <span className="ep-block-list__type">{BLOCK_TYPE_LABEL[block.blockType]}</span>
              <span className="ep-block-list__name">{block.blockName}</span>
              {block.useYn === 'N' && <span className="ep-block-list__off">OFF</span>}
            </button>
            <div className="ep-block-list__ctrl">
              <SButton variant="ghost" size="small" disabled={index === 0} onClick={() => onMove(block.id, 'up')}>
                ↑
              </SButton>
              <SButton
                variant="ghost"
                size="small"
                disabled={index === sorted.length - 1}
                onClick={() => onMove(block.id, 'down')}
              >
                ↓
              </SButton>
            </div>
          </li>
        ))}
      </ul>
      {sorted.length === 0 && <p className="ep-block-list__empty">블록을 추가해 주세요.</p>}
    </div>
  );
}
