import "react-datepicker/dist/react-datepicker.css";

import fr from "date-fns/locale/fr";
import { useEffect, useState } from "react";
import { registerLocale } from "react-datepicker";

import {
  CustomButton,
  DataRangeWrapper,
  DateRangeComponent,
  DateRangeCustom,
  DateRangeLabel,
} from "./dateRange.styled";
import { addMonths } from "shared/utils/global.utils";

// @ts-ignore
registerLocale("fr", fr);

interface DateRangeProps {
  dateRange: Date[];
  setDateRange: (dateRange: Date[]) => void;
  cancelAction: () => void;
  approveAction: (dateRange: Date[]) => void;
  disabled: boolean;
}

const DateRange = ({
  dateRange = [null, null],
  setDateRange,
  cancelAction,
  approveAction,
  disabled,
}: DateRangeProps) => {
  const minimumValidationDate = addMonths(new Date(), -7);
  const maximumValidationDate = new Date();

  const [open, setOpen] = useState(false);
  const [localDateRage, setLocalDateRange] = useState(dateRange);
  const [startDate, endDate] = localDateRage;

  const openDateModal = () => setOpen(true);
  const closeDateModal = () => setOpen(false);

  const initDateModal = () => {
    setOpen(false);
    const [startDate, endDate] = dateRange;
    if (startDate && endDate) {
      setLocalDateRange([startDate, endDate]);
    } else {
      setLocalDateRange([minimumValidationDate, maximumValidationDate]);
    }
  };

  useEffect(() => {
    initDateModal();
  }, [JSON.stringify(dateRange)]);

  return (
    <DataRangeWrapper>
      <DateRangeComponent>
        <DateRangeLabel htmlFor="dateRange">
          Date de début - Date de fin
        </DateRangeLabel>
        <DateRangeCustom
          id={"dateRange"}
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => {
            openDateModal();
            setLocalDateRange(update);
          }}
          locale={"fr"}
          dateFormat="dd/MM/yyyy"
          onKeyDown={(e) => {
            e.preventDefault();
          }}
          placeholderText="DD/MM/YYYY - DD/MM/YYYY"
          open={open}
          onInputClick={openDateModal}
          onClickOutside={initDateModal}
          disabled={disabled}
        >
          <div>
            <CustomButton
              onClick={() => {
                setDateRange([minimumValidationDate, maximumValidationDate]);
                setLocalDateRange([
                  minimumValidationDate,
                  maximumValidationDate,
                ]);
                cancelAction();
                closeDateModal();
              }}
            >
              Réinitialiser
            </CustomButton>
            <CustomButton
              onClick={() => {
                approveAction(localDateRage);
                closeDateModal();
              }}
              disabled={!localDateRage.every(Boolean)}
            >
              Rechercher
            </CustomButton>
          </div>
        </DateRangeCustom>
      </DateRangeComponent>
    </DataRangeWrapper>
  );
};

export default DateRange;
