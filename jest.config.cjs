const config = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom", // Update the testEnvironment configuration
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
  },
};

module.exports = config;
/*
혹은 package.json에
"jest": {
    "preset": "ts-jest",
    "testEnvironment": "jest-environment-jsdom", // Update the testEnvironment configuration
  },

npm run unit-test -- ./src/__test__/temp.spec.tsx
전체: npm run unit-test

css 해결 ❌ 문제
1. "identity-obj-proxy": "^3.0.0", 설치
moduleNameMapper: {
  '\\.(css|less)$': 'identity-obj-proxy',
},

2.
jest.config.js 파일에 transform 옵션을 추가하여 CSS 파일을 처리하는 방법을 지정할 수 있다.
다음은 babel-jest를 사용하여 CSS 파일을 변환

jest.config.cjs
transform: {
  '^.+\\.tsx?$': 'ts-jest',
  '^.+\\.css$': 'babel-jest',
},
moduleNameMapper: {
  '\\.(css|less)$': 'identity-obj-proxy',
},
moduleNameMapper는 모듈 이름을 다른 모듈로 매핑하는 데 사용되지만,
 Jest가 CSS 파일을 처리하도록 설정하려면 transform 옵션도 설정해야 합니다.

transform 옵션은 Jest가 테스트 파일을 실행하기 전에 특정 유형의 파일을 변환하는 방법을 지정.
이 경우, CSS 파일을 처리하는 방법을 지정해야

Jest가 TypeScript 파일을 ts-jest를 사용하여 변환하고,
CSS 파일을 babel-jest를 사용하여 변환하도록 지시. 이렇게 하면 Jest가 CSS 파일을 올바르게 처리 가능

기본적으로 Jest는 JavaScript 또는 TypeScript 코드를 이해하고 실행할 수 있지만,
CSS와 같은 다른 유형의 파일은 처리할 수 없다. 따라서 Jest가 CSS 파일을 올바르게 처리하려면 추가 설정이 필요


babel-jest는 JavaScript 코드를 Babel을 사용하여 변환하는 데 사용되는 Jest의 기본 변환기. 
그러나 TypeScript 프로젝트에서는 ts-jest를 사용하여 TypeScript 코드를 변환하므로 babel-jest가 필요하지 않을 수 있다.
위의 설정에서는 babel-jest를 사용하여 CSS 파일을 변환하도록 지시하고 있다.
이렇게 하면 Jest는 CSS 파일을 JavaScript 객체로 변환하여 처리할 수 있다.

또한, identity-obj-proxy 패키지를 사용하여 CSS 모듈을 JavaScript 객체로 대체.
이 객체는 CSS 클래스 이름을 같은 이름의 속성으로 가지며,
이 속성의 값은 클래스 이름과 동일. 이렇게 하면 Jest는 CSS 클래스 이름을 올바르게 처리할 수 있다.

moduleNameMapper 설정만으로도 CSS 모듈을 처리할 수 있다. 
이 설정은 CSS 파일을 identity-obj-proxy 모듈로 매핑하여 Jest가 CSS 클래스 이름을 올바르게 처리할 수 있게 한다.
*/
