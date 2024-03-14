import "@testing-library/jest-dom"; // 🔥

import nock from "nock";
// import nock = require("nock");
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import LoginPage from "../pages/LoginPage";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
  // 이 설정은 모든 쿼리에 대해 재시도를 비활성화. 따라서 모든 쿼리가 실패할 경우 자동으로 재시도되지 않음.
  //   logger: {
  //     log: console.log,
  //     warn: console.warn,
  //     // ✅ no more errors on the console for tests
  //     error: process.env.NODE_ENV === "test" ? () => {} : console.error,
  //   },
});

// const testWrapper = ({ children }) => (
//   <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
// );

describe("로그인 테스트", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    // console.error()를 mock함수로 만들어서 호출되지 않도록 함
    // QueryClient의 logger 대체
    // 한 가지 문제점이 있다, 테스트를 돌릴때마다 서버에 요청이 간다.
    // http request를 mocking하는 것, 실제 서버에서 badrequest가 응답이 온것처럼 -> nock
    // 서버에 요청없이 test code 동작
  });

  afterAll(() => {
    jest.restoreAllMocks();
    // 모든게 끝나면 원상복귀
  });
  test("로그인에 실패하면 에러메세지가 나타난다.", async () => {
    // given - 로그인 페이지가 그려짐🟠
    const routes = [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/login"],
      initialIndex: 0,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );
    // when - 사용자가 로그인에 실패🟠
    nock("https://localhost:8080")
      .post(`/user/login`, {
        email: "wrong@email.com",
        password: "wrongPassword",
      })
      .reply(400, { msg: "SUCH_USER_DOES_NOT_EXIST" });

    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const emailInput = screen.getByLabelText("이메일");
    const passwordInput = screen.getByLabelText("비밀번호");

    fireEvent.change(emailInput, {
      target: { value: "wrong@email.com" },
    });
    fireEvent.change(passwordInput, { target: { value: "wrongPassword" } });
    const loginButton = screen.getByRole("button", { name: "로그인" });
    fireEvent.click(loginButton);
    // 로그인 수행시 axios 상에서 error가 나서 console.error()가 찍힘
    // react-query에서는 test환경시 loggin을 꺼놓는 것을 권장
    // 조금 더 확실한 방법은 mocking

    const { result } = renderHook(() => useLogin(), {
      wrapper,
    });

    // then - 에러메세지가 나타남🟠
    await waitFor(async () => {
      expect(result.current.isSuccess).toBe(false);
      // hook의 결과만 테스트 -> 반쪽짜리 테스트, 에러메세지까지해야 완전한 테스트
      const errorMessage = await screen.findByTestId("error-message");
      expect(errorMessage).toBeInTheDocument();
      // 에러메세지를 http call(req)한 다음에 isError를 확인해서 보여주는데, isError가 false이기 때문
      // http call(req)이 안일어났기 떄문에 무의미한 테스트 코드
    });
  });
});
