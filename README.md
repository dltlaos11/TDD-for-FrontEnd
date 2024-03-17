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
- 설치: `npm install --save-dev cypress`
- `"cypress": "npx cypress open"`, 스크립트 추가
- `configuration` 설정
  - 포트 번호 수정
- 화면과 함께 테스트가 진행되서 사용자가 어떤 식으로 사용할지 예측 가능
- `it`사용 불가
