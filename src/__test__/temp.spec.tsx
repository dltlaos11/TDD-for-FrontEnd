describe("테스트하고자 하는 컴포넌트", () => {
  beforeEach(() => {
    console.log("beforeEach");
  });
  beforeAll(() => {
    console.log("beforeAll");
  });
  afterEach(() => {
    console.log("afterEach");
  });
  afterAll(() => {
    console.log("afterAll");
  });
  it("should test component A", () => {
    console.log("it");
  });
  test("테스트케이스 1번, OO를 테스트", () => {
    console.log("test");
  });
});
// scripts 추가, jest 설치
// It, test 전에 beforeEach 로그 확인 | 각각의 테스트케이스 전에
// It, test 전에 beforeAll은 1번만,
