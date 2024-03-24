import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import useSignup from "../hooks/useSignup";
// import { Button } from "../stories/Button"; // NOT TDD, only storybook common components

export default function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { mutate: handleSignup, isSuccess } = useSignup();
  const isSignupBtnActive =
    !!email && !!password && password == confirmPassword;
  // !email || !password || password != confirmPassword;

  useEffect(() => {
    if (isSuccess) {
      alert("회원가입 성공");
      navigate("/login");
    }
  }, [isSuccess]);
  console.log("password: ", password);
  console.log("Wrongpassword: ", confirmPassword);

  /*
  1. 회원가입 버튼 비활성화
  2. 이메일, 비밀번호, 비밀번호 확인 input에 입력이 되면, 입력된 값이 state에 저장되도록
  3. 비밀번호와 비밀번호 확인이 일치하는지 확인
  4. 회원가입 버튼 비활성화
  5. 회원가입 버튼 누르면, useSignup 훅을 사용해서 회원가입 요청
  6. 회원가입 요청이 성공하면, alert로 회원가입 성공 메시지를 띄우고, 로그인 페이지로 이동
   */
  return (
    // <Wrapper>
    //   <div>
    //     <Header>
    //       <Title>이메일로 회원가입</Title>
    //       <CloseButton>
    //         <img
    //           alt="close"
    //           src={`https://kr.object.ncloudstorage.com/icons/ic-close-btn.svg`}
    //         />
    //       </CloseButton>
    //     </Header>
    //     <InputSection>
    //       <InputWrapper>
    //         <Label htmlFor="emailInput">이메일</Label>
    //         <Input
    //           id="emailInput"
    //           data-cy="emailInput"
    //           type="text"
    //           placeholder="이메일을 입력해주세요"
    //           onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
    //             setEmail(e.target.value)
    //           }
    //         />
    //       </InputWrapper>
    //       <InputWrapper>
    //         <Label htmlFor="passwordInput">비밀번호</Label>
    //         <Input
    //           id="passwordInput"
    //           data-cy="passwordInput"
    //           type="password"
    //           placeholder="비밀번호를 입력해주세요"
    //           onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
    //             setPassword(e.target.value)
    //           }
    //         />
    //       </InputWrapper>
    //       <InputWrapper>
    //         <Label htmlFor="confirmPasswordInput">비밀번호 확인</Label>
    //         <Input
    //           id="confirmPasswordInput"
    //           data-cy="confirmPasswordInput"
    //           type="password"
    //           placeholder="비밀번호를 한 번 더 입력해주세요"
    //           onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
    //             setConfirmPassword(e.target.value)
    //           }
    //         />
    //       </InputWrapper>
    //       {password != confirmPassword && (
    //         <ErrorMessage data-testid="error-message">
    //           비밀번호가 일치하지 않습니다
    //         </ErrorMessage>
    //       )}
    //     </InputSection>
    //   </div>

    //   <Button
    //     data-cy="signupButton"
    //     primary={true}
    //     label="회원가입"
    //     disabled={!email || !password || password !== confirmPassword}
    //     onClick={() => handleSignup({ username: email, password })}
    //   />

    //   스토리북 공용 버튼 컴포넌트 사용
    // NOT TDD ❌
    // </Wrapper>
    <Wrapper>
      <div>
        <Header>
          <Title>이메일로 회원가입</Title>
          <CloseButton>
            <img
              alt="close"
              src={`https://kr.object.ncloudstorage.com/icons/ic-close-btn.svg`}
            />
          </CloseButton>
        </Header>
        <InputSection>
          <InputWrapper>
            <Label htmlFor="emailInput">이메일</Label>
            <Input
              id="emailInput"
              data-cy="emailInput"
              type="text"
              placeholder="이메일을 입력해주세요"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="passwordInput">비밀번호</Label>
            <Input
              id="passwordInput"
              data-cy="passwordInput"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="confirmPasswordInput">비밀번호 확인</Label>
            <Input
              id="confirmPasswordInput"
              data-cy="confirmPasswordInput"
              type="password"
              placeholder="비밀번호를 한 번 더 입력해주세요"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
            />
          </InputWrapper>
          {password != confirmPassword && (
            <ErrorMessage data-testid="error-message">
              비밀번호가 일치하지 않습니다
            </ErrorMessage>
          )}
        </InputSection>
      </div>

      <SignupButton
        data-cy="signupButton"
        disabled={!isSignupBtnActive}
        onClick={() => handleSignup({ username: email, password })}
      >
        회원가입
      </SignupButton>
    </Wrapper>
  );
}

const ColumnSpaceBetween = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  ${ColumnSpaceBetween}
  height: 100%;
  background-color: var(--white);
  padding: 0 16px;

  > button {
    margin-bottom: 24px;
  }
`;
// margin-bottom: 24px; 이런 조건은 Selector를 사용해서 부여
// 버튼 위치가 Wrapper 안의 유일한 버튼

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
`;

const CloseButton = styled.button``;

const Title = styled.h1`
  color: var(--primary);
`;

const InputSection = styled.section`
  position: relative;
  margin-top: 40px;
`;

const Label = styled.label`
  margin-bottom: 16px;
  font-size: 14px;
  line-height: 21px;
  color: var(--primary);
`;

const Input = styled.input`
  margin-bottom: 24px;

  padding-bottom: 8px;
  border-bottom: 1px solid var(--mono-300);
  color: var(--mono-300);

  &:focus {
    color: var(--secondary);
    border-bottom: 1px solid var(--secondary);
  }
`;

const SignupButton = styled.button`
  width: 100%;
  padding: 16px;
  border-radius: 4px;
  background-color: ${(props) =>
    props.disabled ? "var(--mono-100)" : "var(--primary)"};
  color: ${(props) => (props.disabled ? "var(--mono-200)" : "var(--white)")};
  margin-bottom: 24px;
`;
// App.css

const ErrorMessage = styled.h6`
  font-size: 12px;
  line-height: 18px;
  color: var(--error);
  position: absolute;
  bottom: 0;
`;

const InputWrapper = styled.div`
  ${ColumnSpaceBetween}
`;
