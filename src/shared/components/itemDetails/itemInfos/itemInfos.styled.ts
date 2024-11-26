import styled from "styled-components";

const ItemInfoSection = styled.div`
  flex-grow: 1;
`;

const ItemTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  color: ${({ theme: { palette } }) => palette.enedis.grey["800"]};

  span {
    margin-left: 4px;
  }
`;

interface ItemDateProps {
  fontSize?: string;
}

const ItemDate = styled.div<ItemDateProps>`
  display: flex;

  svg {
    color: gray;
  }
  span {
    font-size: ${({ fontSize }) => fontSize ?? "13px"};
    color: ${({ theme: { palette } }) => palette.enedis.grey["800"]};
    font-weight: normal;
    margin-left: 5px;
  }
`;

interface ItemStatusProps {
  $enable: boolean;
  fontSize?: string;
}

const ItemStatus = styled.div<ItemStatusProps>`
  display: flex;
  margin-top: 1px;
  svg {
    color: ${({ $enable }) => {
      return $enable ? "green" : "red";
    }};
    font-size: 13px;
  }
  span {
    font-size: ${({ fontSize }) => fontSize ?? "13px"};
    color: ${({ theme: { palette } }) => palette.enedis.grey["800"]};
    font-weight: normal;
    margin-left: 5px;
  }
`;

const ItemOwner = styled.div`
  display: flex;
  margin-top: 1px;
  svg {
    color: darkred;
    font-size: 18px;
  }
  span {
    font-size: 12px;
    color: ${({ theme: { palette } }) => palette.enedis.grey["800"]};
    font-weight: 500;
    margin-left: 5px;
  }
`;

const ItemNameInput = styled.input`
  margin-left: 5px;
`;

const ItemDisplayNameWrapper = styled.div`
  align-items: center;
  height: 100%;
  padding-left: 5px;
`;

export {
  ItemDate,
  ItemDisplayNameWrapper,
  ItemInfoSection,
  ItemNameInput,
  ItemOwner,
  ItemStatus,
  ItemTitle,
};
