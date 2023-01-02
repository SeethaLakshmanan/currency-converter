import { TextField, Typography } from "@mui/material";

interface ResultProps {
  result: number;
}

const Result = ({ result }: ResultProps): JSX.Element => {
  return (
    <>
      <Typography sx={{ color: "white", textAlign: "start" }}>
        Result:
      </Typography>
      <TextField
        disabled
        type="Number"
        sx={{ backgroundColor: "#e0e0e0" }}
        value={result}
      />
    </>
  );
};

export default Result;
