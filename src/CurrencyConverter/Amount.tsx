import { TextField, Typography } from "@mui/material";
import { ChangeEvent } from "react";

interface AmountProps {
  amount: number;
  handleAmountChange: (value: string) => void;
}

const Amount = ({ amount, handleAmountChange }: AmountProps): JSX.Element => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleAmountChange(event.target.value);
  };

  return (
    <>
      <Typography>Amount to convert</Typography>
      <TextField
        type="Number"
        inputProps={{
          min: 0,
          style: { textAlign: "center", backgroundColor: "white" },
        }}
        value={amount}
        onChange={handleInputChange}
      />
    </>
  );
};

export default Amount;
