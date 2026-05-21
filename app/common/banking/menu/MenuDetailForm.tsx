'use client';

import FormTitle from '@/components/ui/FormTitle';
import {
  SButton,
  SCheckbox,
  SInput,
  SRadioGroup,
  SSelect,
} from '@zzou/design-system';
import type { MenuNode, MenuChannel, UseYn } from './menu-data';
import { CHANNEL_LABEL, CHANNEL_OPTIONS } from './menu-data';

interface MenuDetailFormProps {
  menu: MenuNode | null;
  breadcrumb: string[];
  onSave: () => void;
  onDelete: () => void;
  onAddChild: () => void;
}

const useYnOptions = [
  { label: '사용', value: 'Y' },
  { label: '미사용', value: 'N' },
];

const authOptions = [
  { label: '불필요', value: 'false' },
  { label: '로그인 필요', value: 'true' },
];

export default function MenuDetailForm({
  menu,
  breadcrumb,
  onSave,
  onDelete,
  onAddChild,
}: MenuDetailFormProps) {
  if (!menu) {
    return (
      <div className="menu-detail menu-detail--empty">
        <p>왼쪽 메뉴 트리에서 항목을 선택하세요.</p>
        <p className="menu-detail__sub">선택한 메뉴의 상세 정보를 조회·수정할 수 있습니다.</p>
      </div>
    );
  }

  const channelOptions = CHANNEL_OPTIONS.filter((c) => c.value !== 'ALL');

  return (
    <div className="menu-detail">
      <div className="menu-detail__breadcrumb">
        {breadcrumb.map((name, i) => (
          <span key={`${name}-${i}`}>
            {i > 0 && <em>/</em>}
            {name}
          </span>
        ))}
      </div>

      <FormTitle title="메뉴 상세" />

      <table className="table reg mt-10">
        <colgroup>
          <col style={{ width: '160px' }} />
          <col />
          <col style={{ width: '160px' }} />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">메뉴코드</th>
            <td>
              <SInput type="text" size="small" defaultValue={menu.menuCode} readOnly />
            </td>
            <th scope="row">정렬순서</th>
            <td>
              <SInput type="number" size="small" defaultValue={String(menu.sortOrder)} style={{ width: 80 }} />
            </td>
          </tr>
          <tr>
            <th scope="row">
              메뉴명<span className="ess"><span className="offscreen">필수입력</span></span>
            </th>
            <td colSpan={3}>
              <SInput type="text" size="small" defaultValue={menu.menuName} placeholder="메뉴명" />
            </td>
          </tr>
          <tr>
            <th scope="row">화면경로</th>
            <td colSpan={3}>
              <SInput type="text" size="small" defaultValue={menu.menuPath} placeholder="/account/list" />
              <p className="input-guide">앱·웹 라우팅에 사용되는 경로입니다.</p>
            </td>
          </tr>
          <tr>
            <th scope="row">노출채널</th>
            <td>
              <SSelect
                options={channelOptions}
                size="small"
                style={{ width: 160 }}
                defaultValue={menu.channel}
              />
            </td>
            <th scope="row">아이콘 ID</th>
            <td>
              <SInput type="text" size="small" defaultValue={menu.iconId} placeholder="ico-account" />
            </td>
          </tr>
          <tr>
            <th scope="row">사용여부</th>
            <td>
              <SRadioGroup
                name={`useYn-${menu.id}`}
                size="small"
                direction="horizontal"
                options={useYnOptions}
                value={menu.useYn}
                onChange={() => {}}
              />
            </td>
            <th scope="row">인증필요</th>
            <td>
              <SRadioGroup
                name={`auth-${menu.id}`}
                size="small"
                direction="horizontal"
                options={authOptions}
                value={String(menu.authRequired)}
                onChange={() => {}}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">노출매체</th>
            <td colSpan={3}>
              <div className="flex align-center gap-16">
                <SCheckbox size="small" checked={menu.mobileYn === 'Y'} onChange={() => {}} label="모바일" />
                <SCheckbox size="small" checked={menu.pcYn === 'Y'} onChange={() => {}} label="PC웹" />
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">채널 라벨</th>
            <td colSpan={3}>
              <span className="menu-detail__channel-tag">{CHANNEL_LABEL[menu.channel as MenuChannel]}</span>
              <span className="menu-detail__depth-tag">Depth {menu.depth}</span>
            </td>
          </tr>
          <tr>
            <th scope="row">최종수정</th>
            <td colSpan={3}>
              {menu.updatedAt} · {menu.updatedBy}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="menu-detail__footer flex space-between">
        <div className="btn-set-m">
          <SButton variant="outline" size="small" onClick={onAddChild}>
            하위메뉴 추가
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
