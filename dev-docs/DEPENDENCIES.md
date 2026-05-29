# Dependencies Guide

이 문서는 `package.json`의 `dependencies`와 `devDependencies` 항목을 설명합니다.
프로젝트에서 어떤 라이브러리를 왜 사용하는지 빠르게 파악할 수 있습니다.

---

## 프로젝트 핵심 패키지

### dependencies

- `@hookform/resolvers` `^5.2.2`
  - `react-hook-form`과 `yup`, `zod`, `joi` 등의 검증 라이브러리를 연결하는 어댑터 역할을 합니다.
  - 폼 입력값을 스키마 기반으로 검사할 때 사용합니다.

- `ag-grid-community` `^35.0.0`
  - AG Grid의 핵심 데이터 그리드 엔진입니다.
  - 테이블, 정렬, 필터링, 페이징 등 데이터 그리드 기능을 제공합니다.

- `ag-grid-react` `^35.0.0`
  - AG Grid를 React 컴포넌트로 사용할 수 있게 해주는 바인딩 패키지입니다.

- `next` `16.1.1`
  - Next.js 프레임워크입니다.
  - 서버 사이드 렌더링, 라우팅, 빌드 최적화 등을 제공하여 React 앱을 더 쉽게 만듭니다.

- `react` `19.2.3`
  - React 기본 라이브러리입니다.
  - 컴포넌트 기반 UI를 만들 때 사용합니다.

- `react-dom` `19.2.3`
  - React 컴포넌트를 실제 DOM에 렌더링하는 역할을 합니다.

- `react-datepicker` `^9.1.0`
  - 날짜 선택 UI 컴포넌트를 제공합니다.
  - 사용자가 날짜를 선택할 수 있는 달력 입력창을 구현할 때 사용합니다.

- `react-hook-form` `^7.71.1`
  - React에서 폼 상태 관리를 간편하게 해주는 라이브러리입니다.
  - 입력값 관리, 검증, 에러 표시 등을 쉽게 처리합니다.

- `yup` `^1.7.1`
  - 객체 스키마 기반 유효성 검사 라이브러리입니다.
  - 폼 입력값의 구조와 타입을 검증하는 규칙을 정의할 때 사용합니다。

- `@dmsej108/design-system` `^0.1.0`
  - 사내 디자인 시스템 패키지입니다.
  - `Button`, `Input`, `Card`, `DatePicker` 등 공통 UI 컴포넌트를 제공합니다.
  - 테스트 페이지: `/design-test`

### devDependencies

- `@types/node` `^20`
  - Node.js 타입 정의입니다.
  - TypeScript 환경에서 Node 관련 API를 사용할 때 타입 검사를 돕습니다。

- `@types/react` `^19`
  - React 타입 정의입니다。
  - TypeScript로 React 컴포넌트를 작성할 때 필요한 타입 정보를 제공합니다。

- `@types/react-dom` `^19`
  - React DOM 관련 타입 정의입니다。

- `eslint` `^9`
  - 코드 품질과 스타일을 검사하는 도구입니다。

- `eslint-config-next` `16.1.1`
  - Next.js 프로젝트에 맞춘 ESLint 설정입니다。

- `typescript` `^5.9.3`
  - TypeScript 컴파일러입니다。
  - 정적 타입 검사를 수행하고 TS 코드를 JS로 변환합니다。

---

## 요약

- `dependencies`: 실제 앱 실행 시 필요한 라이브러리
- `devDependencies`: 개발 중 타입 검사, 린트, 빌드 도구로 사용하는 라이브러리

이 프로젝트는 `Next.js` 기반으로 React를 사용하며, `react-hook-form` + `yup` 조합으로 폼 검증을 처리합니다. `AG Grid`는 데이터 테이블 UI를 구성하는 데 사용됩니다.
