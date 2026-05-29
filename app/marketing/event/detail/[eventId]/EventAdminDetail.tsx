'use client';

import { STable, type STableRow } from '@dmsej108/design-system';
import FormTitle from '@/components/ui/FormTitle';
import type { EventDetailValues } from '@/app/marketing/event/event-data';
import {
  formatBenefitAmount,
  formatDisplayValue,
  formatEventPeriod,
  formatMarketingPushAgreement,
  getEventLabel,
} from '@/app/marketing/event/event-labels';

type EventAdminDetailProps = {
  eventId: string;
  data: EventDetailValues;
};

function buildAdminTableRows(eventId: string, data: EventDetailValues, targetLabel: string): STableRow[] {
  const participationStepsValue =
    data.participationSteps.length > 0 ? (
      <ol className="event-admin-detail__steps">
        {data.participationSteps.map((step, index) => (
          <li key={`${step}-${index}`}>{step}</li>
        ))}
      </ol>
    ) : (
      '-'
    );

  return [
    {
      cells: [
        { label: '이벤트 ID', value: eventId },
        { label: '조회수', value: data.viewCount.toLocaleString() },
      ],
    },
    {
      cells: [{ label: '이벤트명', value: data.eventName, fullValue: true }],
    },
    {
      cells: [
        { label: '이벤트 유형', value: getEventLabel('eventType', data.eventType) },
        { label: '게시 여부', value: getEventLabel('eventStatus', data.eventStatus) },
      ],
    },
    {
      cells: [{ label: '이벤트 대상', value: targetLabel, fullValue: true }],
    },
    {
      cells: [
        { label: '이벤트 기간', value: formatEventPeriod(data.eventStartDate, data.eventEndDate) },
        { label: '당첨자 발표일', value: formatDisplayValue(data.winnerAnnouncementDate) },
      ],
    },
    {
      cells: [
        { label: '혜택 구분', value: getEventLabel('benefitType', data.benefitType) },
        { label: '참여제한', value: getEventLabel('useType', data.useType) },
      ],
    },
    {
      cells: [
        {
          label: 'PUSH 수신동의',
          value: formatMarketingPushAgreement(data.marketingPushAgreement),
          fullValue: true,
        },
      ],
    },
    {
      cells: [
        { label: '버튼 이벤트', value: getEventLabel('buttonEvent', data.buttonEvent) },
        { label: '버튼 명', value: formatDisplayValue(data.buttonName) },
      ],
    },
    {
      cells: [{ label: '외부 링크', value: formatDisplayValue(data.externalLink), fullValue: true }],
    },
    {
      cells: [
        { label: '선착순 설정', value: getEventLabel('fcfsUse', data.fcfsUse) },
        { label: '선착순 인원', value: formatDisplayValue(data.numberOfParticipants) },
      ],
    },
    {
      cells: [
        {
          label: '지급 혜택',
          value: formatBenefitAmount(data.benefitList, data.benefitAmount),
          fullValue: true,
        },
      ],
    },
    {
      cells: [
        {
          label: '배너 설명',
          value: formatDisplayValue(data.eventBannerDescription),
          fullValue: true,
        },
      ],
    },
    {
      cells: [{ label: '참여 방법', value: participationStepsValue, fullValue: true }],
    },
    {
      cells: [
        {
          label: '경품 안내',
          value: formatDisplayValue(data.prizeDescription),
          fullValue: true,
        },
      ],
    },
  ];
}

export default function EventAdminDetail({ eventId, data }: EventAdminDetailProps) {
  const targetLabel = data.targetDescription ?? getEventLabel('eventTarget', data.eventTarget);
  const rows = buildAdminTableRows(eventId, data, targetLabel);

  return (
    <div className="event-admin-detail">
      <FormTitle title="이벤트 상세 정보" />
      <STable rows={rows} columns={2} layout="fixed" bordered className="mt-10" />
    </div>
  );
}
