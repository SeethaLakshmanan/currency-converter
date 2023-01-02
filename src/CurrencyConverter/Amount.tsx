import { TextField, Typography } from "@mui/material";
import { ChangeEvent } from "react";

interface AmountProps {
  amount: number;
  handleAmountChange: (value: number) => void;
}

const Amount = ({ amount, handleAmountChange }: AmountProps): JSX.Element => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleAmountChange(parseFloat(event.target.value));
  };

  return (
    <>
      <Typography sx={{ color: "white", textAlign: "start" }}>
        Amount to convert:
      </Typography>
      <TextField
        type="Number"
        sx={{ backgroundColor: "white" }}
        value={amount}
        onChange={handleInputChange}
      />
    </>
  );
};

export default Amount;
