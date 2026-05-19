"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import type { ColDef } from 'ag-grid-community';
import Searchbox from '@/components/ui/Searchbox';
import Pagination from '@/components/ui/Pagination';
import { useRouter } from 'next/navigation';

const AgGridReact = dynamic(
  () => import('@/lib/config/ag-grid').then((m) => ({ default: m.AgGridReact })),
  { ssr: false }
);
const DatePickerComponent = dynamic(() => import('@/components/ui/DatePicker'), { ssr: false });

export default function Sub() {
  const router = useRouter();
  const [dateRange, setDateRange] = useState<{ startDate: Date | null; endDate: Date | null }>({
    startDate: null,
    endDate: null,
  });

  const handleDateChange = (startDate: Date | null, endDate: Date | null) => {
    setDateRange({ startDate, endDate });
    console.log('날짜 변경:', { startDate, endDate });
    // 여기서 API 호출 등 추가 작업 가능
    // 예: fetchData(startDate, endDate);
  };

  // dateRange 사용 예시
  // const searchData = () => {
  //   if (dateRange.startDate && dateRange.endDate) {
  //     // API 호출 등
  //     console.log('검색:', dateRange);
  //   }
  // };
  // Row Data: The data to be displayed.
  const [rowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ]);

  const [colDefs] = useState<ColDef[]>([
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" },
  ]);
  const listCount=[
    { label: '10개씩 보기', value: '10' },
    { label: '20개씩 보기', value: '20' },
    { label: '30개씩 보기', value: '30' },
    { label: '40개씩 보기', value: '40' }
  ]
  
  return (
    <div className="tbl-wrap" >
      <Searchbox>
        <DatePickerComponent onDateChange={handleDateChange} />
        <div className="item">
          <label>검색어</label>
          <div className="input">
            <input type="text" placeholder="검색어를 입력하세요" className="form-control"/>
          </div>
        </div>
      </Searchbox>
      <div className="table-util flex space-between">

        <div className="btn-set-m flex align-end">
          <button type="button" className="btn btn-ss" onClick={() => router.push('/sub/regist')}>등록</button>
        </div>
        <div className="btn-set-m flex align-end">
        <span className="table-total">조회결과 총 <strong>5</strong>건</span>
        <button type="button" className="btn btn-opt"><span className="ico-download"></span>파일다운로드</button>
        <select className="custom-select sm">
          {listCount.map((item, index) => (
            <option key={index} value={item.value}>{item.label}</option>
          ))}
        </select>
        </div>
      </div>
      <div className="ag-theme">
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          domLayout="autoHeight" 
        />
        <Pagination itemCount={0} cntPerPage={10} currentPage={1} onChangedPage={() => {}} />
      </div>
    </div>
  );
}
