import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import "../styles/styles.css";
import { gql, useMutation, useQuery } from "@apollo/client";
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
  const [deleItemMutation] = useMutation(mutation);
  const navegar = useNavigate();

  const { loading, error, data, refetch } = useQuery(itemsTabla);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const filteredItems = searchTerm
    ? data.Items.filter((item) => item.itemName.includes(searchTerm))
    : data.Items;

  const itemsToDisplay = searchTerm
    ? filteredItems
    : filteredItems.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleOpenItemForm = () => {
    setAddingItem(true);
  };

  const handleCloseItemForm = () => {
    setAddingItem(false);
    refetch();
  };

  const handleDeleteItem = async (itemId) => {
    try{
      const result = await deleItemMutation({
        variables: {itemId},
      });
      console.log("Item eliminado", result);
      refetch();
    } catch (error) {
      console.error("Error al eliminar el item", error);
    }
  }

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
          Añadir
        </Button>
      </div>
      <Typography fontWeight="bold">
        {Object.values(itemsToDisplay).length} items encontrados
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
            {itemsToDisplay.map((item) => (
              <TableRow key={item.itemId}>
                <TableCell>{item.itemId}</TableCell>
                <TableCell>
                  <Button onClick={() => (navegar(`/items/${item.itemId}`))}>{item.itemName}</Button>
                </TableCell>
                <TableCell>
                  <IconButton data-testid={"delete-button" + item.itemId} color="secondary" onClick={() => handleDeleteItem(item.itemId)}>
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
        color="primary"
      />
      <Dialog
        open={addingItem}
        onClose={handleCloseItemForm}
        maxWidth="sm"
        fullWidth
      >
        <AddItem onClose={handleCloseItemForm}/>
      </Dialog>
    </Container>
  );
};

export const mutation = gql`
  mutation deleteItem($itemId: Int!){
    deleteItem(itemId: $itemId){
      itemId
    }
  }
`;

export default ItemTable;
