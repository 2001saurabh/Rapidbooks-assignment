import * as React from "react";
import PropTypes from "prop-types";
import { NumericFormat } from "react-number-format";
import MuiAlert from "@mui/material/Alert";
import {
  Snackbar,
  IconButton,
  Box,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";

import TransactionTable from "./TransactionTable";
import data from "../data/mock.json";
import { nanoid } from "nanoid";

const accounts = [
  {
    value: "Savings",
    label: "Savings Account",
  },
  {
    value: "Current",
    label: "Current Account",
  },
  {
    value: "Fixed",
    label: "Fixed Account",
  },
];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      allowLeadingZeros={false}
      allowNegative={true}
      valueIsNumericString={true}
      thousandSeparator={true}
      thousandsGroupStyle="lakh"
      prefix="₹"
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const Form = () => {
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [transaction, setTransaction] = React.useState(data);
  const [formData, setFormData] = React.useState({
    account: "",
    debit: 0,
    credit: 0,
    total: 0,
  });

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.account || formData.debit === 0 || formData.credit === 0) {
      setOpenSnackBar(true);
      return;
    }

    const newTransaction = {
      id: nanoid(),
      account: formData.account,
      debit: formData.debit,
      credit: formData.credit,
      total: formData.credit - formData.debit,
    };

    const newTransactions = [...transaction, newTransaction];
    setTransaction(newTransactions);

    setFormData({ account: "", debit: 0, credit: 0, total: 0 });
  };
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          required
          id="outlined-select-currency"
          select
          value={formData.account}
          label="Account Type"
          defaultValue="Savings"
          name="account"
          helperText="Please select your account Type"
          onChange={handleChange}
        >
          {accounts.map((option) => (
            <MenuItem required key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          required
          label="Debit Amount"
          value={formData.debit}
          onChange={handleChange}
          name="debit"
          id="formatted-debit-input"
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
        />
        <TextField
          required
          label="Credit Amount"
          value={formData.credit}
          onChange={handleChange}
          name="credit"
          id="formatted-credit-input"
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
        />
        <Button
          sx={{
            py: 2,
            px: 4,
            m: 1,
            bgcolor: "darkcyan",
            "&: hover": {
              border: 0,
              bgcolor: "darkcyan",
              opacity: "0.9",
            },
          }}
          variant="contained"
          type="submit"
        >
          Submit
        </Button>
        <Snackbar
          open={openSnackBar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="error"
            sx={{ width: "100%" }}
          >
            Input fields can't be empty!
          </Alert>
        </Snackbar>
      </Box>

      <TransactionTable
        transaction={transaction}
        setTransaction={setTransaction}
      />
    </div>
  );
};

export default Form;
