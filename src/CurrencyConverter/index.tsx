import { Button, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Currency } from "../models/currency";
import { convert, getAllCurrencies } from "../requests";
import Amount from "./Amount";
import CurrencySelector from "./CurrencySelector";
import Result from "./Result";

const CurrencyConverter = (): JSX.Element => {
  const [amount, setAmount] = useState<number>(0);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [result, setResult] = useState(0);

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
    setResult(await convert(amount, fromCurrency, toCurrency));
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Stack gap={4}>
        <Typography fontWeight={700} fontSize={20}>
          Currency Converter
        </Typography>
        <Stack gap={2} sx={{ backgroundColor: "#00acc1", padding: "16px" }}>
          <Amount amount={amount} handleAmountChange={handleAmountChange} />
          <Typography sx={{ color: "white", textAlign: "start" }}>
            From:
          </Typography>
          <CurrencySelector
            currencies={currencies}
            selectedCurrency={fromCurrency}
            onCurrencyChange={(value) => setFromCurrency(value)}
          />
          <Typography sx={{ color: "white", textAlign: "start" }}>
            To:
          </Typography>
          <CurrencySelector
            currencies={currencies}
            selectedCurrency={toCurrency}
            onCurrencyChange={(value) => setToCurrency(value)}
          />
          <Button
            sx={{
              color: "white",
              textTransform: "inherit",
              border: "1px solid white",
            }}
            onClick={handleConvertClick}
          >
            Convert
          </Button>
          <Result result={result} />
        </Stack>
      </Stack>
    </Grid>
  );
};

export default CurrencyConverter;

/**
 * TODOs
 * add a switch functionality for the from-to currencies
 * search functionality for dropdown
 * error handling
 */
