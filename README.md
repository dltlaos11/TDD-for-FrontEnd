# TDD-for-FrontEnd

### 간단한 테스트 코드 문법 소개

- `describe`, `it 또는 test`, `beforeEach`, `beforeAll`, `afterEach`, `AfterAll`
- `Cypress`, `Jest` 모두 동일
  - `Jest`가 로그 확인에 용이

::it(or test)

- 테스트 코드의 역할을 문장으로

::describe

- 관련있는 테스트들을 하나로 묶는 것 -> 응집도를 높일 수 있음
- `describe`에 테스트하고자 하는 `page`나 `component`를 첫 번쨰 매개변수에 작성

::beforeEach

- describe block안에 있는 각각의 it 의 작동 전에 동작하는 함수

### 환경설정

1. root에 `jest.config.cjs` 추가
2. package.json에

```json
"jest": {
    "preset": "ts-jest",
    "testEnvironment": "js-environment-jsdom",
  },
```

- `scripts`에 `"unit-test": "jest --watchAll"`추가
- 이전에는 `"test": "jest"`사용했었음

### 테스트 파일 생성

- 컴포넌트 옆에 테스트 생성
  - `Signup.spec.tsx`
- dir 생성, `__test__`

### Cypress

- 유닛테스트를 위해 만들어진 `jest`에 비해 `cypress`를 추천
- FE에서 유닛테스트의 개념이 모호
  - 모듈 정의 애매
  - 함수 테스트의 필요성 부재
- e2e 테스트
- `install`
  ```plain
  npm install --save-dev cypress
  ```
- `"cypress": "npx cypress open"`, 스크립트 추가(수동)
- `configuration` 설정
  - 포트 번호 수정
- 화면과 함께 테스트가 진행되서 사용자가 어떤 식으로 사용할지 예측 가능
- `it`사용 불가
- 컨벤션에 맞게, `jest`와 같이 사용은 ❌, `Assertion` 문제로 호환 안됨
  - `cypress` 설치하면(전제)
  - `"types": ["jest"]`와 공식문서에서 `exclude` 추가하면 가능하긴함
- 테스트 코드는 이벤트를 중심으로 사용자가 사용하는 기능을 테스트 해야

### 스토리북

- UI 테스트
- 버튼의 다양한 상태(`Primary`, `Secondary`, disabled, enabled, safari, chrome, viewport, ...)
- 디자인시스템(ui 통일감) 구축 및 유지
- `yarn` 사용시, `yarn berry` 전환 필요(err문제)
- `install`
  ```plain
  npx storybook@latest init
  ```
  - `"storybook": "storybook dev -p 6006"` 추가(자동)
- `<Button/>`, `<Button/>`을 활용한 `<Header/>`,`<Header/>`를 활용한 `<Page/>`
  - `Atomic Desgin Pattern`과 유사
  - `atom`, `molecule`, `organism`
- 배포
  - `"build-storybook": "storybook build"`
  - `npx http-server ./storybook-static`
  - `build`폴더의 위치만 변경
  - aws s3 버킷에 정적 파일 업로드
- 웹 접근성 테스트(`addon`추가)
  - `npm install --save-dev @storybook/addon-a11y`
  - `main.ts` `addon`추가

### 테스트 자동화

- `cypress cloud`, `cypress`에서 무료로 제공하는 클라우드
  - `Specs` 선언한 테스트 종류
  - `github Action`처럼 이벤트 이후 테스트가 자동으로 실행

### Amplify

- `baseDirectory`
- `environment variables settings`
- 프로비저닝(`Docker set`)-빌드-배포
- 도메인 관리
  - Route53 구입했다면 바로 처리
  - GoDaddy, Gabia -> CNAME connect
- `start-server-and-test` package -> Edit scripts
- `amplify.yml` 수정
- `{"backendDuration": 0}` -> determine expense
