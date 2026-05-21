'use client';

import FormTitle from '@/components/ui/FormTitle';
import { SButton, SInput, SRadioGroup } from '@zzou/design-system';
import type { CommonCode } from './code-data';

const useYnOptions = [
  { label: '사용', value: 'Y' },
  { label: '미사용', value: 'N' },
];

interface CodeDetailFormProps {
  code: CommonCode | null;
  groupName: string;
  onSave: () => void;
  onDelete: () => void;
  onNew: () => void;
}

export default function CodeDetailForm({
  code,
  groupName,
  onSave,
  onDelete,
  onNew,
}: CodeDetailFormProps) {
  if (!code) {
    return (
      <div className="code-detail code-detail--empty">
        <p>그리드에서 코드를 선택하거나 신규 등록하세요.</p>
      </div>
    );
  }

  return (
    <div className="code-detail">
      <FormTitle title={`코드 상세 · ${groupName}`} />

      <table className="table reg mt-10">
        <colgroup>
          <col style={{ width: '140px' }} />
          <col />
          <col style={{ width: '140px' }} />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">그룹코드</th>
            <td>
              <SInput type="text" size="small" defaultValue={code.groupCode} readOnly />
            </td>
            <th scope="row">코드</th>
            <td>
              <SInput type="text" size="small" defaultValue={code.code} />
            </td>
          </tr>
          <tr>
            <th scope="row">
              코드명<span className="ess"><span className="offscreen">필수</span></span>
            </th>
            <td>
              <SInput type="text" size="small" defaultValue={code.codeName} />
            </td>
            <th scope="row">코드명(EN)</th>
            <td>
              <SInput type="text" size="small" defaultValue={code.codeNameEn} />
            </td>
          </tr>
          <tr>
            <th scope="row">정렬순서</th>
            <td>
              <SInput type="number" size="small" defaultValue={String(code.sortOrder)} style={{ width: 80 }} />
            </td>
            <th scope="row">사용여부</th>
            <td>
              <SRadioGroup
                name={`code-useYn-${code.id}`}
                size="small"
                direction="horizontal"
                options={useYnOptions}
                value={code.useYn}
                onChange={() => {}}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">속성1</th>
            <td>
              <SInput type="text" size="small" defaultValue={code.attr1} placeholder="부가속성" />
            </td>
            <th scope="row">속성2</th>
            <td>
              <SInput type="text" size="small" defaultValue={code.attr2} placeholder="부가속성" />
            </td>
          </tr>
          <tr>
            <th scope="row">비고</th>
            <td colSpan={3}>
              <SInput type="text" size="small" defaultValue={code.remark} />
            </td>
          </tr>
          <tr>
            <th scope="row">최종수정</th>
            <td colSpan={3}>
              {code.updatedAt} · {code.updatedBy}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="code-detail__footer flex space-between">
        <div className="btn-set-m">
          <SButton variant="outline" size="small" onClick={onNew}>
            신규
          </SButton>
          <SButton variant="outline" size="small" onClick={onDelete}>
            삭제
          </SButton>
        </div>
        <SButton variant="primary" size="small" onClick={onSave}>
          저장
        </SButton>
      </div>
    </div>
  );
}
