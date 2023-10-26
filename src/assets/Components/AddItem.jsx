import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

const AddItem = () => {
  const [itemId, setItemId] = useState("");
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [locationId, setLocationId] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container maxWidth="sm" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}>
      <br/>
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
            label="Location Id"
            variant="outlined"
            fullWidth
            value={locationId}
            onChange={(e) => setLocationId(e.target.value)}
          />
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

export default AddItem;
