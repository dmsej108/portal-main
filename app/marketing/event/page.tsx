"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import type { AgGridReact as AgGridReactType } from 'ag-grid-react';
import type { ColDef, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
import Searchbox from '@/components/ui/Searchbox';
import { useRouter } from 'next/navigation';
import { SButton, SIcon, SSelect, SPagination } from '@zzou/design-system';

const AgGridReact = dynamic(
  () => import('@/lib/config/ag-grid').then((m) => ({ default: m.AgGridReact })),
  { ssr: false }
);
const DatePickerComponent = dynamic(() => import('@/components/ui/DatePicker'), { ssr: false });

function ElectricButtonCell({ data }: ICellRendererParams) {
  return (
    <SButton
      variant="outline"
      size="small"
      onClick={() => console.log('row:', data)}
    >
      button
    </SButton>
  );
}

export default function Event() {
  const gridRef = useRef<AgGridReactType>(null);
  const router = useRouter();

  const fitColumns = useCallback(() => {
    gridRef.current?.api?.sizeColumnsToFit();
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', fitColumns);
    return () => window.removeEventListener('resize', fitColumns);
  }, [fitColumns]);
  const [dateRange, setDateRange] = useState<{ startDate: Date | null; endDate: Date | null }>({
    startDate: null,
    endDate: null,
  });

  const handleDateChange = (startDate: Date | null, endDate: Date | null) => {
    setDateRange({ startDate, endDate });
    console.log('날짜 변경:', { startDate, endDate });
  };

  const [rowData] = useState([
    { eventId: "112", eventName: "이벤트 목록 1", eventStartDate: "2026-01-01", eventEndDate: "2026-01-01", eventStatus: "게시", eventType: "일반", eventTarget: "모든 회원", benefitType: "즉시 지급" },
    { eventId: "113", eventName: "이벤트 2", eventStartDate: "2026-01-01", eventEndDate: "2026-01-01", eventStatus: "게시", eventType: "퀴즈", eventTarget: "뱅킹 회원", benefitType: "당첨후 지급" },
    { eventId: "114", eventName: "이벤트 3", eventStartDate: "2026-01-01", eventEndDate: "2026-01-01", eventStatus: "미게시", eventType: "룰렛", eventTarget: "증권 회원", benefitType: "혜택 없음" },
  ]);

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
          ref={gridRef}
          rowData={rowData}
          columnDefs={colDefs}
          domLayout="autoHeight"
          onGridReady={onGridReady}
        />
        {/* <Pagination itemCount={itemCount} cntPerPage={cntPerPage} currentPage={currentPage} onChangedPage={onChangedPage} /> */}
        <div className="pagination">
          <SPagination itemCount={itemCount} cntPerPage={cntPerPage} currentPage={currentPage} onChangedPage={onChangedPage} />
        </div>
      </div>
    </div>
  );
}
