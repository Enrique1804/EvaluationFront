import { gql, useMutation } from "@apollo/client";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

const AddItem = ({ onClose }) => {
  const [itemId, setItemId] = useState("");
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [createItemMutation] = useMutation(mutation);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const location = {
      state,
      address,
      phoneNumber,
    };
    try {
      const { data } = await createItemMutation({
        variables: {
          itemId: parseInt(itemId),
          itemName,
          description,
          location,
        },
      });
      onClose();
      console.log("Item creado");
    } catch (error) {
      console.error("Error al crear el item");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
    >
      <br />
      <Typography>Add a new Item</Typography>
      <Typography>Item Details</Typography>
      <form onSubmit={handleSubmit}>
        <Grid item xs={6}>
          <TextField
            label="Item ID"
            variant="outlined"
            fullWidth
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
          />
          <TextField
            label="Item Name"
            variant="outlined"
            fullWidth
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        <Typography>Location Details</Typography>
        <Grid item xs={6}>
          <TextField
            label="State"
            variant="outlined"
            fullWidth
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Grid>
        <br />
        <Button type="submit" variant="contained" color="primary">
          Add
        </Button>
      </form>
      <br />
    </Container>
  );
};

const mutation = gql`
  mutation createItem(
    $itemId: Int!
    $itemName: String!
    $description: String!
    $location: LocationInput!
  ) {
    createItem(
      itemId: $itemId
      itemName: $itemName
      description: $description
      location: $location
    ) {
      itemId
      itemName
      description
      location {
        state
        address
        phoneNumber
      }
    }
  }
`;

export default AddItem;
