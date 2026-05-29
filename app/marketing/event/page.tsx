"use client";

import { useCallback, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import type { ColDef, GridReadyEvent, RowClickedEvent } from 'ag-grid-community';
import Searchbox from '@/components/ui/Searchbox';
import { useRouter } from 'next/navigation';
import { SButton, SSelect, SPagination } from '@dmsej108/design-system';
import { MOCK_EVENT_LIST } from './event-data';

const AgGridReact = dynamic(
  () => import('@/lib/config/ag-grid').then((m) => ({ default: m.AgGridReact })),
  { ssr: false }
);

export default function Event() {
  const router = useRouter();

  const onGridReady = useCallback((params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
  }, []);

  const onRowClicked = useCallback(
    (event: RowClickedEvent) => {
      const eventId = event.data?.eventId;
      if (eventId) {
        router.push(`/marketing/event/detail/${eventId}`);
      }
    },
    [router],
  );

  const rowData = useMemo(() => MOCK_EVENT_LIST, []);

  const [colDefs] = useState<ColDef[]>([
    { field: "eventId", headerName: "이벤트ID", width: 100, cellClass: "centered" },
    { field: "eventName", headerName: "이벤트명", width: 450 },
    { field: "eventStartDate", headerName: "이벤트 시작일", width: 150, cellClass: "centered" },
    { field: "eventEndDate", headerName: "이벤트 종료일", width: 150, cellClass: "centered" },
    { field: "eventStatus", headerName: "게시 여부", width: 150, cellClass: "centered" },
    { field: "eventType", headerName: "이벤트 유형", width: 150, cellClass: "centered" },
    { field: "eventTarget", headerName: "이벤트 대상", width: 150, cellClass: "centered" },
    { field: "benefitType", headerName: "혜택 구분", width: 150, cellClass: "centered" },
    // { field: "make" },
    // { field: "model" },
    // { field: "price" },
    // { field: "electric", cellRenderer: ElectricButtonCell },
  ]);

  const listCount = [
    { label: '10개씩 보기', value: '10' },
    { label: '20개씩 보기', value: '20' },
    { label: '30개씩 보기', value: '30' },
    { label: '40개씩 보기', value: '40' }
  ];

  const onChangedPage = (pageNo: number) => {
    console.log('pageNo', pageNo);
    setCurrentPage(pageNo);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [cntPerPage] = useState(10);
  const [itemCount] = useState(200);

  return (
    <div className="tbl-wrap">
      <Searchbox>
        {/* <DatePickerComponent onDateChange={handleDateChange} />
        <div className="item">
          <label>검색어</label>
          <div className="input">
            <input type="text" placeholder="검색어를 입력하세요" className="form-control" />
          </div>
        </div> */}
      </Searchbox>
      <div className="table-util flex space-between">
        <div className="flex align-end">
          <span className="table-total">조회결과 총 <strong>{rowData.length}</strong>건</span>
        </div>
        <div className="btn-set-m flex align-end">
          {/* <SButton variant="outline" size="small" leftIcon={<SIcon name="download" size="small" aria-hidden />}>
            파일다운로드
          </SButton> */}
          <SSelect options={listCount} size="small" style={{ width: 100 }} />
          <SButton variant="primary" size="small" onClick={() => router.push('/marketing/event/regist')}>
            이벤트 등록
          </SButton>
        </div>
      </div>
      <div className="ag-theme">
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          domLayout="autoHeight"
          onGridReady={onGridReady}
          onRowClicked={onRowClicked}
          rowStyle={{ cursor: 'pointer' }}
        />
        {/* <Pagination itemCount={itemCount} cntPerPage={cntPerPage} currentPage={currentPage} onChangedPage={onChangedPage} /> */}
        <div className="pagination">
          <SPagination itemCount={itemCount} cntPerPage={cntPerPage} currentPage={currentPage} onChangedPage={onChangedPage} />
        </div>
      </div>
    </div>
  );
}
