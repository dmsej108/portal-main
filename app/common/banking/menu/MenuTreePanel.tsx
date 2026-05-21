'use client';

import { useMemo, useState } from 'react';
import { SButton } from '@zzou/design-system';
import type { MenuNode } from './menu-data';

interface MenuTreePanelProps {
  tree: MenuNode[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

function TreeNode({
  node,
  depth,
  selectedId,
  expandedIds,
  onToggle,
  onSelect,
}: {
  node: MenuNode;
  depth: number;
  selectedId: string | null;
  expandedIds: Set<string>;
  onToggle: (id: string) => void;
  onSelect: (id: string) => void;
}) {
  const hasChildren = Boolean(node.children?.length);
  const isOpen = expandedIds.has(node.id);
  const isSelected = selectedId === node.id;

  return (
    <li className="menu-tree__item">
      <div
        className={`menu-tree__row${isSelected ? ' is-selected' : ''}`}
        style={{ paddingLeft: `${12 + depth * 16}px` }}
      >
        {hasChildren ? (
          <button type="button" className="menu-tree__toggle" onClick={() => onToggle(node.id)} aria-expanded={isOpen}>
            <span className="menu-tree__chevron" aria-hidden>{isOpen ? '▼' : '▶'}</span>
          </button>
        ) : (
          <span className="menu-tree__toggle menu-tree__toggle--empty" />
        )}
        <button type="button" className="menu-tree__label" onClick={() => onSelect(node.id)}>
          <span className="menu-tree__name">{node.menuName}</span>
          <span className={`menu-tree__badge menu-tree__badge--${node.useYn === 'Y' ? 'on' : 'off'}`}>
            {node.useYn === 'Y' ? '사용' : '미사용'}
          </span>
        </button>
      </div>
      {hasChildren && isOpen && (
        <ul className="menu-tree__children">
          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              selectedId={selectedId}
              expandedIds={expandedIds}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function MenuTreePanel({ tree, selectedId, onSelect }: MenuTreePanelProps) {
  const allIds = useMemo(() => {
    const ids: string[] = [];
    const walk = (nodes: MenuNode[]) => {
      nodes.forEach((n) => {
        ids.push(n.id);
        if (n.children) walk(n.children);
      });
    };
    walk(tree);
    return ids;
  }, [tree]);

  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set(allIds));

  const toggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => setExpandedIds(new Set(allIds));
  const collapseAll = () => setExpandedIds(new Set());

  return (
    <div className="menu-tree-panel">
      <div className="menu-tree-panel__head">
        <strong>메뉴 트리</strong>
        <div className="menu-tree-panel__actions">
          <SButton variant="ghost" size="small" onClick={expandAll}>
            전체펼침
          </SButton>
          <SButton variant="ghost" size="small" onClick={collapseAll}>
            전체접기
          </SButton>
        </div>
      </div>
      <p className="menu-tree-panel__hint">메뉴를 선택하면 오른쪽에서 상세 정보를 수정할 수 있습니다.</p>
      <ul className="menu-tree">
        {tree.map((node) => (
          <TreeNode
            key={node.id}
            node={node}
            depth={0}
            selectedId={selectedId}
            expandedIds={expandedIds}
            onToggle={toggle}
            onSelect={onSelect}
          />
        ))}
      </ul>
      {tree.length === 0 && <p className="menu-tree-panel__empty">조회 조건에 맞는 메뉴가 없습니다.</p>}
    </div>
  );
}
