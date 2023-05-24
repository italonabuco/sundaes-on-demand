import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { pricePerItem } from "../constants";

const OrderDetailsContext = createContext();

export function useOrderDetails() {
  const context = useContext(OrderDetailsContext);
  if (!context)
    throw new Error(
      "userOrderDetails must be called from within an OrderDetailsProvider"
    );

  return context;
}

export function OrderDetailsProvider(props) {
  const [optionsCounts, setOptionsCounts] = useState({
    scoops: {},
    toppings: {},
  });

  const updateItemCount = useCallback(
    (itemName, newItemCount, optionType) => {
      const newOptionCounts = { ...optionsCounts };
      newOptionCounts[optionType][itemName] = newItemCount;

      setOptionsCounts(newOptionCounts);
    },
    [optionsCounts]
  );

  const resetOrder = () => {
    setOptionsCounts({ scoops: {}, toppings: {} });
  };

  function calculateTotal(optionType) {
    return (
      Object.values(optionsCounts[optionType]).reduce(
        (total, value) => total + value,
        0
      ) * pricePerItem[optionType]
    );
  }

  const totals = {
    scoops: calculateTotal("scoops"),
    toppings: calculateTotal("toppings"),
  };

  const value = { optionsCounts, updateItemCount, resetOrder, totals };
  return <OrderDetailsContext.Provider value={value} {...props} />;
}
