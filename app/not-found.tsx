'use client';

import Link from 'next/link';
import { SButton } from '@dmsej108/design-system';

export default function NotFound() {
  return (
    <div className="page-not-found">
      <p className="page-not-found__code" aria-hidden>
        404
      </p>
      <h1 className="page-not-found__title">페이지를 찾을 수 없습니다</h1>
      <p className="page-not-found__desc">
        요청하신 주소가 없거나 변경·삭제되었을 수 있습니다.
        <br />
        URL을 확인하시거나 아래 버튼으로 이동해 주세요.
      </p>
      <div className="page-not-found__actions">
        <Link href="/">
          <SButton variant="primary" size="medium">
            메인으로 이동
          </SButton>
        </Link>
      </div>
    </div>
  );
}
