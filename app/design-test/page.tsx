"use client";

import { useState } from "react";
import { SButton, SCard, SInput } from "@dmsej108/design-system";

export default function DesignSystemTestPage() {
  const [value, setValue] = useState("");

  return (
    <main style={{ padding: 32, display: "flex", justifyContent: "center" }}>
      <SCard title="Design System 테스트" description="@dmsej108/design-system 설치 확인용 페이지입니다." style={{ width: 420 }}>
        <div style={{ display: "grid", gap: 16 }}>
          <SInput
            label="테스트 입력"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="값을 입력하세요"
          />
          <SButton
            variant="primary"
            size="large"
            onClick={() => alert(`입력값: ${value}`)}
          >
            값 확인
          </SButton>
        </div>
      </SCard>
    </main>
  );
}
