import { MOCK_EVENT_LIST } from '@/app/marketing/event/event-data';
import EventDetailPage from './EventDetailPage';

export function generateStaticParams() {
  return MOCK_EVENT_LIST.map((event) => ({
    eventId: event.eventId,
  }));
}

export default function Page() {
  return <EventDetailPage />;
}
