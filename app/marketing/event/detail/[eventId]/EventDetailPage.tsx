'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { SButton, STab } from '@dmsej108/design-system';
import { findEventById } from '@/app/marketing/event/event-data';
import EventAdminDetail from './EventAdminDetail';
import EventCustomerPreview from './EventCustomerPreview';

const EVENT_DETAIL_TABS = [
  { label: '어드민', value: 'admin' },
  { label: '사용자', value: 'customer' },
] as const;

export default function EventDetailPage() {
  const router = useRouter();
  const params = useParams<{ eventId: string }>();
  const eventId = params.eventId;
  const eventDetail = findEventById(eventId);
  const [activeTab, setActiveTab] = useState<string>(EVENT_DETAIL_TABS[0].value);

  const onDelete = () => {
    if (window.confirm('이벤트를 삭제하시겠습니까?')) {
      console.log('delete', eventId);
      alert('삭제 (목업)');
      router.push('/marketing/event');
    }
  };

  const onEdit = () => {
    alert('수정 페이지는 추후 구현 예정입니다. (목업)');
  };

  if (!eventDetail) {
    return (
      <div className="tbl-wrap">
        <div className="ui-title-3">
          <h3>이벤트를 찾을 수 없습니다.</h3>
        </div>
        <p className="mt-10">요청하신 이벤트 ID({eventId})에 해당하는 데이터가 없습니다.</p>
        <div className="btn-bottom-set flex justify-center mt-20">
          <SButton variant="primary" size="large" onClick={() => router.push('/marketing/event')}>
            목록으로
          </SButton>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="tbl-wrap event-detail-page">
        <STab
          tabs={[...EVENT_DETAIL_TABS]}
          value={activeTab}
          onChange={setActiveTab}
          variant="filled"
          className="event-detail-page__tabs"
        />

        {activeTab === 'admin' && <EventAdminDetail eventId={eventId} data={eventDetail} />}
        {activeTab === 'customer' && <EventCustomerPreview data={eventDetail} />}
      </div>

      <div className="btn-bottom-set flex justify-center">
        <SButton
          variant="outline"
          size="large"
          className="mr-10"
          type="button"
          onClick={() => router.push('/marketing/event')}
        >
          목록
        </SButton>
        <SButton variant="secondary" size="large" className="mr-10" type="button" onClick={onDelete}>
          삭제
        </SButton>
        <SButton variant="primary" size="large" type="button" onClick={onEdit}>
          수정
        </SButton>
      </div>
    </>
  );
}
