import "bootstrap/dist/css/bootstrap.min.css";

import { useSelector } from "react-redux";
import AlertDialog from "shared/components/Alert";
import AlertCard from "shared/components/Card";

import Routing from "./routing";

const App = () => {
  const dialogAlertInput = useSelector(
    (state) => state.globalUiReducer.alert.dialog,
  );

  const cardAlertInput = useSelector(
    (state) => state.globalUiReducer.alert.card,
  );

  return (
    <>
      <AlertDialog {...dialogAlertInput} />
      <AlertCard {...cardAlertInput} />
      <Routing />
    </>
  );
};

export default App;
