"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import Searchbox from '@/components/ui/Searchbox';
import Pagination from '@/components/ui/Pagination';
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
  const router = useRouter();
  const [dateRange, setDateRange] = useState<{ startDate: Date | null; endDate: Date | null }>({
    startDate: null,
    endDate: null,
  });

  const handleDateChange = (startDate: Date | null, endDate: Date | null) => {
    setDateRange({ startDate, endDate });
    console.log('날짜 변경:', { startDate, endDate });
  };

  const [rowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950 },
    { make: "Ford", model: "F-Series", price: 33850 },
    { make: "Toyota", model: "Corolla", price: 29600 },
  ]);

  const [colDefs] = useState<ColDef[]>([
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric", cellRenderer: ElectricButtonCell },
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
        <DatePickerComponent onDateChange={handleDateChange} />
        <div className="item">
          <label>검색어</label>
          <div className="input">
            <input type="text" placeholder="검색어를 입력하세요" className="form-control" />
          </div>
        </div>
      </Searchbox>
      <div className="table-util flex space-between">
        <div className="btn-set-m flex align-end">
          <SButton variant="outline" size="small" onClick={() => router.push('/marketing/event/regist')}>
            등록
          </SButton>
        </div>
        <div className="btn-set-m flex align-end">
          <span className="table-total">조회결과 총 <strong>5</strong>건</span>
          <SButton variant="outline" size="small" leftIcon={<SIcon name="download" size="small" aria-hidden />}>
            파일다운로드
          </SButton>
          <SSelect options={listCount} size="small" style={{ width: 100 }} />
        </div>
      </div>
      <div className="ag-theme">
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          domLayout="autoHeight"
        />
        {/* <Pagination itemCount={itemCount} cntPerPage={cntPerPage} currentPage={currentPage} onChangedPage={onChangedPage} /> */}
        <div className="pagination">
          <SPagination itemCount={itemCount} cntPerPage={cntPerPage} currentPage={currentPage} onChangedPage={onChangedPage} />
        </div>
      </div>
    </div>
  );
}
