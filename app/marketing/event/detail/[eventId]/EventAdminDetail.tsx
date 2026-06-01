'use client';

import { STable } from '@dmsej108/design-system';
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

interface EventAdminTableData {
  eventId: string;
  viewCount: string;
  eventName: string;
  eventType: string;
  eventStatus: string;
  eventTarget: string;
  eventPeriod: string;
  winnerAnnouncementDate: string;
  benefitType: string;
  useType: string;
  marketingPushAgreement: string;
  buttonEvent: string;
  buttonName: string;
  externalLink: string;
  fcfsUse: string;
  numberOfParticipants: string;
  benefitAmount: string;
  eventBannerDescription: string;
  participationSteps: string[];
  prizeDescription: string;
}

function buildAdminTableData(eventId: string, data: EventDetailValues): EventAdminTableData {
  const targetLabel = data.targetDescription ?? getEventLabel('eventTarget', data.eventTarget);

  return {
    eventId,
    viewCount: data.viewCount.toLocaleString(),
    eventName: data.eventName,
    eventType: getEventLabel('eventType', data.eventType),
    eventStatus: getEventLabel('eventStatus', data.eventStatus),
    eventTarget: targetLabel,
    eventPeriod: formatEventPeriod(data.eventStartDate, data.eventEndDate),
    winnerAnnouncementDate: formatDisplayValue(data.winnerAnnouncementDate),
    benefitType: getEventLabel('benefitType', data.benefitType),
    useType: getEventLabel('useType', data.useType),
    marketingPushAgreement: formatMarketingPushAgreement(data.marketingPushAgreement),
    buttonEvent: getEventLabel('buttonEvent', data.buttonEvent),
    buttonName: formatDisplayValue(data.buttonName),
    externalLink: formatDisplayValue(data.externalLink),
    fcfsUse: getEventLabel('fcfsUse', data.fcfsUse),
    numberOfParticipants: formatDisplayValue(data.numberOfParticipants),
    benefitAmount: formatBenefitAmount(data.benefitList, data.benefitAmount),
    eventBannerDescription: formatDisplayValue(data.eventBannerDescription),
    participationSteps: data.participationSteps,
    prizeDescription: formatDisplayValue(data.prizeDescription),
  };
}

export default function EventAdminDetail({ eventId, data }: EventAdminDetailProps) {
  const tableData = buildAdminTableData(eventId, data);

  const columns = [
    { key: 'eventId', label: '이벤트 ID' },
    { key: 'viewCount', label: '조회수' },
    { key: 'eventName', label: '이벤트명', fullValue: true },
    { key: 'eventType', label: '이벤트 유형' },
    { key: 'eventStatus', label: '게시 여부' },
    { key: 'eventTarget', label: '이벤트 대상', fullValue: true },
    { key: 'eventPeriod', label: '이벤트 기간' },
    { key: 'winnerAnnouncementDate', label: '당첨자 발표일' },
    { key: 'benefitType', label: '혜택 구분' },
    { key: 'useType', label: '참여제한' },
    { key: 'marketingPushAgreement', label: 'PUSH 수신동의', fullValue: true },
    { key: 'buttonEvent', label: '버튼 이벤트' },
    { key: 'buttonName', label: '버튼 명' },
    { key: 'externalLink', label: '외부 링크', fullValue: true },
    { key: 'fcfsUse', label: '선착순 설정' },
    { key: 'numberOfParticipants', label: '선착순 인원' },
    { key: 'benefitAmount', label: '지급 혜택', fullValue: true },
    { key: 'eventBannerDescription', label: '배너 설명', fullValue: true },
    {
      key: 'participationSteps',
      label: '참여 방법',
      fullValue: true,
      render: (value: unknown) => {
        const steps = value as string[];
        if (steps.length === 0) return '-';

        return (
          <ol className="event-admin-detail__steps">
            {steps.map((step, index) => (
              <li key={`${step}-${index}`}>{step}</li>
            ))}
          </ol>
        );
      },
    },
    { key: 'prizeDescription', label: '경품 안내', fullValue: true },
  ];

  return (
    <div className="event-admin-detail">
      <FormTitle title="이벤트 상세 정보" />
      <STable
        columns={columns}
        data={tableData as unknown as Record<string, unknown>}
        columnsPerRow={2}
        bordered
        layout="fixed"
        className="mt-10"
      />
    </div>
  );
}
