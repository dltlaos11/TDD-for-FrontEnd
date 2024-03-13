import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import SignupPage from "../pages/SignupPage";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {},
});

describe("회원가입 테스트", () => {
  // it("should display an error message when password and confirm password are not identical", ()=> {});
  test("비밀번호와 비밀번호 확인 값이 일치하지 않으면 에러메세지가 표시된다", async () => {
    // given - 회원가입 페이지가 그려짐🟠
    const routes = [
      {
        path: "/signup",
        element: <SignupPage />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/signup"],
      initialIndex: 0,
    });
    // 해당 컴포넌트에서 react-router-dom, react-query 사용중이여서 실제 페이지 Routing처럼 Provider로 감싸야

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );
    // when - 비밀번호와 비밀번호 확인 값이 일치하지 않음, 이벤트(fireEvent()) 발생으로 각 input에 값 대입 🟠
    // <Label htmlFor="xxx" />는 id 값이 "xxx"인 <input> 요소와 연결된 <label> 요소를 생성.
    // 이렇게 하면 사용자가 <label> 요소를 클릭하면 해당 id 값을 가진 <input> 요소가 선택.
    // 이렇게 <label> 요소와 <input> 요소를 연결함으로써 웹 접근성을 개선하고 사용자 경험을 향상시킬 수 있다.

    const passwordInput = screen.getByLabelText("비밀번호");
    const confirmPasswordInput = screen.getByLabelText("비밀번호 확인");

    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "wrongPassword" },
    });

    // then - 에러메세지가 표시됨 🟠
    const errorMessage = await screen.findByTestId("error-message");
    //   <ErrorMessage data-testid="error-message">
    //   비밀번호가 일치하지 않습니다
    // </ErrorMessage>
    // error-message data-testid로 찾아서 테스트
    expect(errorMessage).toBeInTheDocument();
    // 해당 컴포넌트에서 log 확인 가능
  });
});
