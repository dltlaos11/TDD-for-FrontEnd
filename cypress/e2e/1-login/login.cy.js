describe("로그인 화면", () => {
  it("사용자는 아이디와 비밀번호를 사용해서 로그인한다", () => {
    // given - 로그인 페이지에 접근한다 🟠
    cy.visit("/login");

    cy.get("[data-cy=emailInput]").as("emailInput");
    cy.get("[data-cy=passwordInput]").as("passwordInput");
    // data-cy 속성을 사용해서 cypress가 요소를 찾을 수 있음
    // jest에서 error-message를 찾을 때 data-testid 속성을 사용한 것처럼
    // e.g. LoginPage

    // when - 아이디와 비밀번호를 입력하고 로그인 버튼을 클릭한다🟠
    cy.get("@emailInput").type("test@email.com");
    cy.get("@passwordInput").type("password");

    cy.get("@emailInput").invoke("val").should("eq", "test@email.com");
    cy.get("@passwordInput").invoke("val").should("eq", "password");
    // 제대로 된 검증을 위해선 입력값을 하드코딩, Typing

    cy.intercept(
      {
        method: "POST",
        url: "/user/login",
      },
      { token: "AUTH_TOKEN" } // res body
    ).as("login"); // alias 부여
    // jest와 마찬가지로 req가 요청된다.
    // jest는 nock을 통해 mocking했지만, cypress는 별도의 패키지 없이 intercept 기능 사용

    cy.get("[data-cy=loginButton]").should("exist").click();
    // should("exist"), 존재한다면
    // then - 로그인에 성공하고 메인화면으로 이동한다🟠
    cy.url().should("include", "/");
  });
});
