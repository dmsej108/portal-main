'use client';

import FormTitle from '@/components/ui/FormTitle';
import { SButton, SInput, SRadioGroup, SSelect, STextarea } from '@dmsej108/design-system';
import type { MainBlock, BlockType } from './main-data';
import { BLOCK_TYPE_LABEL } from './main-data';

const blockTypeOptions = (Object.keys(BLOCK_TYPE_LABEL) as BlockType[]).map((key) => ({
  label: BLOCK_TYPE_LABEL[key],
  value: key,
}));

const useYnOptions = [
  { label: '노출', value: 'Y' },
  { label: '미노출', value: 'N' },
];

interface BlockDetailFormProps {
  block: MainBlock | null;
  onSave: () => void;
  onDelete: () => void;
}

export default function BlockDetailForm({ block, onSave, onDelete }: BlockDetailFormProps) {
  if (!block) {
    return (
      <div className="ep-block-detail ep-block-detail--empty">
        <p>블록을 선택하세요.</p>
        <p className="ep-block-detail__sub">순서 변경 후 미리보기에서 노출을 확인할 수 있습니다.</p>
      </div>
    );
  }

  return (
    <div className="ep-block-detail">
      <FormTitle title="블록 설정" />

      <table className="table reg mt-10">
        <colgroup>
          <col style={{ width: '120px' }} />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">블록유형</th>
            <td>
              <SSelect options={blockTypeOptions} size="small" style={{ width: 160 }} defaultValue={block.blockType} />
            </td>
          </tr>
          <tr>
            <th scope="row">관리명</th>
            <td>
              <SInput type="text" size="small" defaultValue={block.blockName} />
            </td>
          </tr>
          <tr>
            <th scope="row">노출제목</th>
            <td>
              <SInput type="text" size="small" defaultValue={block.title} />
            </td>
          </tr>
          <tr>
            <th scope="row">부제목</th>
            <td>
              <SInput type="text" size="small" defaultValue={block.subTitle} />
            </td>
          </tr>
          <tr>
            <th scope="row">링크 URL</th>
            <td>
              <SInput type="text" size="small" defaultValue={block.linkUrl} placeholder="/banking/..." />
            </td>
          </tr>
          <tr>
            <th scope="row">노출여부</th>
            <td>
              <SRadioGroup
                name={`useYn-${block.id}`}
                size="small"
                direction="horizontal"
                options={useYnOptions}
                value={block.useYn}
                onChange={() => {}}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">메모</th>
            <td>
              <STextarea size="small" rows={3} placeholder="운영 참고 메모" defaultValue="" />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="ep-block-detail__footer flex space-between">
        <SButton variant="outline" size="small" onClick={onDelete}>
          블록 삭제
        </SButton>
        <SButton variant="primary" size="small" onClick={onSave}>
          저장
        </SButton>
      </div>
    </div>
  );
}
