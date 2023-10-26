import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import "../styles/styles.css";
import { gql, useQuery } from "@apollo/client";
import { itemsTabla } from "../../App";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  IconButton,
  Paper,
  Pagination,
  Button,
  Box,
  Typography,
  Container,
  Dialog,
} from "@mui/material";
import AddItem from "./AddItem";

const ItemTable = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [addingItem, setAddingItem] = useState(false);

  const { loading, error, data } = useQuery(itemsTabla);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleOpenItemForm = () => {
    setAddingItem(true);
  };

  const handleCloseItemForm = () => {
    setAddingItem(false);
  };

  return (
    <Container maxWidth="xl">
      <br />
      <div className="table-controls">
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenItemForm}
        >
          Add
        </Button>
      </div>
      <Typography fontWeight="bold">
        {Object.values(data.Items).length} items encontrados
      </Typography>
      <TableContainer component={Paper} className="responsive-table-container">
        <Table className="responsive-table">
          <TableHead>
            <TableRow>
              <TableCell>Item ID</TableCell>
              <TableCell>Item Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.Items.map((item) => (
              <TableRow key={item.itemId}>
                <TableCell>{item.itemId}</TableCell>
                <TableCell>
                  <Link to={`/items/${item.itemId}`}>{item.itemName}</Link>
                </TableCell>
                <TableCell>
                  <IconButton color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(Object.values(data.Items).length / itemsPerPage)}
        page={page}
        onChange={handleChangePage}
      />
      <Dialog
        open={addingItem}
        onClose={handleCloseItemForm}
        maxWidth="sm"
        fullWidth
      >
        <AddItem />
      </Dialog>
    </Container>
  );
};

const mutation = gql`
  mutation deleteItem($itemId: Int!){
    deleteItem(itemId: $itemId){
      itemId
    }
  }
`;

export default ItemTable;
