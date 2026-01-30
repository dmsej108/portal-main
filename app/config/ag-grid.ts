"use client";

import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

// Register AG Grid modules (앱 전체에서 한 번만 실행)
ModuleRegistry.registerModules([AllCommunityModule]);

// AG Grid 컴포넌트도 함께 export
export { AgGridReact };
