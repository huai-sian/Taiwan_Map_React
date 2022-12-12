import styled from '@emotion/styled';

const ErrorTitle = styled.h2`
  text-align: center;
`;

export default function Error() {
  return (
    <div>
      <ErrorTitle>
        找不到相關資料
      </ErrorTitle>
    </div>
  )
}