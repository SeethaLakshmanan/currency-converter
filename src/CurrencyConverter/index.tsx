import { Button, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Currency } from "../models/currency";
import { convert, getAllCurrencies } from "../requests";
import Amount from "./Amount";
import CurrencySelector from "./CurrencySelector";
import Notification from "./Notification";

interface Notification {
  isOpen: boolean;
  message: string;
}

const CurrencyConverter = (): JSX.Element => {
  const [amount, setAmount] = useState<number>(0);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [result, setResult] = useState(0);
  const defaultNotification = {
    isOpen: false,
    message: "",
  };
  const [notification, setNotification] =
    useState<Notification>(defaultNotification);

  useEffect(() => {
    async function getCurrencies() {
      const response = await getAllCurrencies();
      setCurrencies(response);
    }
    getCurrencies();
  }, []);

  const handleAmountChange = (value: number) => {
    setAmount(value);
  };

  const handleConvertClick = async () => {
    if (fromCurrency === "") {
      setNotification({ isOpen: true, message: "Select 'From' currency" });
      return;
    }
    if (toCurrency === "") {
      setNotification({ isOpen: true, message: "Select 'TO' currency" });
      return;
    }
    if (amount <= 0) {
      setNotification({
        isOpen: true,
        message: "Select 'Amount' greater than zero",
      });
      return;
    }
    setResult(await convert(amount, fromCurrency, toCurrency));
  };

  const closeNotification = () => {
    setNotification(defaultNotification);
  };

  const getResult = () => {
    return result !== 0
      ? `${fromCurrency} ${amount} in ${toCurrency} is ${result}`
      : result;
  };

  return (
    <>
      <Grid container justifyContent="center" alignItems="center">
        <Stack gap={4}>
          <Typography fontWeight={700} fontSize={20}>
            Currency Converter
          </Typography>
          <Stack gap={2} sx={{ border: "4px solid black", padding: "16px" }}>
            <Amount amount={amount} handleAmountChange={handleAmountChange} />
            <Typography>From</Typography>
            <CurrencySelector
              currencies={currencies}
              selectedCurrency={fromCurrency}
              onCurrencyChange={(value) => setFromCurrency(value)}
            />
            <Typography>To</Typography>
            <CurrencySelector
              currencies={currencies}
              selectedCurrency={toCurrency}
              onCurrencyChange={(value) => setToCurrency(value)}
            />
            <Button
              sx={{
                textTransform: "inherit",
                border: "1px solid black",
                color: "black",
              }}
              onClick={handleConvertClick}
            >
              Convert
            </Button>
            <Typography>Result</Typography>
            <Typography sx={{ display: "block" }}>{getResult()}</Typography>
          </Stack>
        </Stack>
      </Grid>
      <Notification
        isOpen={notification.isOpen}
        message={notification.message}
        closeNotification={closeNotification}
      />
    </>
  );
};

export default CurrencyConverter;

/**
 * TODOs
 * add a switch functionality for the from-to currencies
 * search functionality for dropdown
 * error handling
 */
