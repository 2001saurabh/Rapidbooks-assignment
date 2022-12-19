import React from "react";
import {
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  styled,
  Paper,
  IconButton,
  Box,
  Button,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
const keys = [
  { id: "account", name: "Account Type" },
  {
    id: "debit",
    name: "Debit Amount",
    format: (value) => value.toLocaleString("hi-IN"),
  },
  {
    id: "credit",
    name: "Credit Amount",
    format: (value) => value.toLocaleString("hi-IN"),
  },
  {
    id: "total",
    name: "Total Amount",
    format: (value) => value.toLocaleString("hi-IN"),
  },
  
];

const TransactionTable = ({ transaction, setTransaction }) => {
  const handleDeleteRow = (transactionId) => {
    const newTransactions = [...transaction];

    const index = transaction.findIndex(
      (transaction) => transaction.id === transactionId
    );
    newTransactions.splice(index, 1);

    setTransaction(newTransactions);
  };
  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 570,
          my:2,

          "&::-webkit-scrollbar": {
            width: "10px",
          },
          "&::-webkit-scrollbar-track": {
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: " lightgray",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "dimgray",
          },
        }}
      >
        <Table
          sx={{
            minWidth: 650,
          }}
          stickyHeader
          aria-label="sticky table"
        >
          <TableHead>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              {keys?.map((row, idx) => (
                <TableCell
                  key={idx}
                  align="justify"
                  sx={{ fontWeight: 600, bgcolor: "#f2f2f2" }}
                >
                  {row.name}
                </TableCell>
              ))}
              <TableCell
               
                  align="justify"
                  sx={{ fontWeight: 600, bgcolor: "#f2f2f2" }}
                >
                  Actions
                </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {transaction.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  textDecoration: "none",
                }}
              >
                {keys.map((key) => {
                  const value = row[key.id];
                  return (
                    <TableCell align="justify" key={key.id}>
                      {key.format && typeof value === "number"
                        ? key.format(value)
                        : value}
                    </TableCell>
                  );
                })}
                
                <TableCell
                  align="justify"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                
                  <IconButton aria-label="delete" onClick={handleDeleteRow}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TransactionTable;
