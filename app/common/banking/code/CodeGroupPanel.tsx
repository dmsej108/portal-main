'use client';

import type { CodeGroup } from './code-data';

interface CodeGroupPanelProps {
  groups: CodeGroup[];
  selectedGroupCode: string;
  onSelect: (groupCode: string) => void;
  onAddGroup: () => void;
}

export default function CodeGroupPanel({
  groups,
  selectedGroupCode,
  onSelect,
  onAddGroup,
}: CodeGroupPanelProps) {
  return (
    <div className="code-group-panel">
      <div className="code-group-panel__head">
        <strong>코드 그룹</strong>
        <button type="button" className="code-group-panel__add" onClick={onAddGroup}>
          + 그룹
        </button>
      </div>
      <ul className="code-group-panel__list">
        {groups.map((g) => (
          <li key={g.groupCode}>
            <button
              type="button"
              className={`code-group-panel__item${selectedGroupCode === g.groupCode ? ' is-selected' : ''}${g.useYn === 'N' ? ' is-off' : ''}`}
              onClick={() => onSelect(g.groupCode)}
            >
              <span className="code-group-panel__code">{g.groupCode}</span>
              <span className="code-group-panel__name">{g.groupName}</span>
              <span className="code-group-panel__count">{g.codeCount}건</span>
            </button>
          </li>
        ))}
      </ul>
      {groups.length === 0 && <p className="code-group-panel__empty">등록된 그룹이 없습니다.</p>}
    </div>
  );
}
