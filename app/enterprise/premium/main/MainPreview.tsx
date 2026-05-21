'use client';

import type { MainBlock } from './main-data';
import { BLOCK_TYPE_LABEL, sortBlocks } from './main-data';

interface MainPreviewProps {
  blocks: MainBlock[];
  versionName: string;
}

function PreviewBlock({ block }: { block: MainBlock }) {
  if (block.useYn === 'N') return null;

  switch (block.blockType) {
    case 'HERO':
      return (
        <div className="ep-preview__hero">
          <strong>{block.title}</strong>
          <span>{block.subTitle}</span>
        </div>
      );
    case 'QUICK':
      return (
        <div className="ep-preview__quick">
          <p>{block.title}</p>
          <div className="ep-preview__quick-grid">
            {['이체', '조회', '승인', '급여'].map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </div>
      );
    case 'NOTICE':
      return (
        <div className="ep-preview__notice">
          <span className="ep-preview__tag">공지</span>
          {block.title} · 시스템 점검 안내 (05.25)
        </div>
      );
    case 'PRODUCT':
      return (
        <div className="ep-preview__card">
          <p className="ep-preview__card-title">{block.title}</p>
          <p className="ep-preview__card-sub">{block.subTitle}</p>
        </div>
      );
    case 'BANNER':
      return (
        <div className="ep-preview__banner">
          <span>{block.title}</span>
          <em>{block.subTitle}</em>
        </div>
      );
    case 'CS':
      return (
        <div className="ep-preview__cs">
          <span>{block.title}</span>
          <button type="button">{block.subTitle}</button>
        </div>
      );
    default:
      return null;
  }
}

export default function MainPreview({ blocks, versionName }: MainPreviewProps) {
  const active = sortBlocks(blocks).filter((b) => b.useYn === 'Y');

  return (
    <div className="ep-preview">
      <div className="ep-preview__toolbar">
        <span>미리보기</span>
        <em>{versionName}</em>
      </div>
      <div className="ep-preview__device">
        <div className="ep-preview__statusbar">
          <span>9:41</span>
          <span>기업/프리미엄</span>
        </div>
        <div className="ep-preview__body">
          {active.length === 0 && <p className="ep-preview__empty">노출 블록이 없습니다.</p>}
          {active.map((block) => (
            <div key={block.id} className="ep-preview__block" data-type={block.blockType}>
              <span className="ep-preview__block-label">{BLOCK_TYPE_LABEL[block.blockType]}</span>
              <PreviewBlock block={block} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
