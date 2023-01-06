import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import InformationIcon from "@mui/icons-material/InfoOutlined";
import { Currency } from "../models/currency";

interface CurrencySelectorProps {
  currencies: Currency[];
  selectedCurrency: string;
  onCurrencyChange: (value: string) => void;
}

const CurrencySelector = ({
  currencies,
  selectedCurrency,
  onCurrencyChange,
}: CurrencySelectorProps): JSX.Element => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onCurrencyChange(event.target.value);
  };

  return (
    <FormControl>
      <InputLabel>Select a currency</InputLabel>
      <Select
        label="Select a currency"
        value={selectedCurrency}
        onChange={handleChange}
        sx={{ backgroundColor: "white", textAlign: "center" }}
        renderValue={(selected) => <Typography>{selected}</Typography>}
      >
        {currencies.map(({ key, value }) => (
          <MenuItem key={key} value={key}>
            <Typography>{key}</Typography>
            <Tooltip title={value} placement="bottom" arrow>
              <IconButton sx={{ color: "black" }}>
                <InformationIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CurrencySelector;
