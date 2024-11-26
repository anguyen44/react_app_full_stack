import DatePicker from "react-datepicker";
import styled from "styled-components";

const DateRangeCustom = styled(DatePicker)`
  display: block;
  width: 212px;
  padding: 10px;
  border: 1px ${({ theme }) => theme.palette.enedis.grey["500"]} solid;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px;
  text-align: center;

  .react-datepicker-popper {
    z-index: 10;
  }

  &::placeholder {
    opacity: 0.5;
    color: gris;
    font-size: 13px;
    text-align: center;
  }
  &:hover {
    border: 1px ${({ theme }) => theme.palette.enedis.secondary.blue["500"]}
      solid;
  }
  &:focus {
    outline: none;
    border: 2px ${({ theme }) => theme.palette.enedis.secondary.blue["500"]}
      solid;
  }
`;

const DateRangeLabel = styled.label`
  color: ${({ theme }) => theme.palette.enedis.grey["800"]};
  position: absolute;
  top: -10px;
  left: 10px;
  padding: 2px;
  z-index: 1;

  font-size: 10px;
  font-weight: 500;
  display: inline-block;
  margin-bottom: 0.5rem;
  background-color: #fff;

  &:after {
    content: " ";
    width: 100%;
    height: 13px;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: -1;
  }
`;

const DateRangeComponent = styled.div`
  position: relative;
`;

const DataRangeWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  height: auto;
`;

const CustomButton = styled.button`
  margin: 10px 10px 10px 0;
`;

export {
  CustomButton,
  DataRangeWrapper,
  DateRangeComponent,
  DateRangeCustom,
  DateRangeLabel,
};
