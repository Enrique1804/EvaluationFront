import { useQuery } from "@apollo/client";
import React from "react";
import { infoItem } from "../../App";
import { Link, useParams } from "react-router-dom";
import { Container, Typography, Paper, Grid } from "@mui/material";

export default function ItemInfo() {
  const { itemId } = useParams();
  const itemIdNumber = parseInt(itemId, 10);
  const { loading, error, data } = useQuery(infoItem, {
    variables: { itemId: itemIdNumber },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const item = data.Item;

  return (
    <Container maxWidth="xl">
      <Link to="/">Back</Link>
      <Paper elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h5" gutterBottom>
              Item Details
            </Typography>
            <Typography variant="body1">ItemID: {item.itemId}</Typography>
            <Typography variant="body1">ItemName: {item.itemName}</Typography>
            <Typography variant="body1">
              Description: {item.description}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5" gutterBottom>
              Location Details
            </Typography>
            <Typography variant="body1">
              LocationID: {item.location.locationId}
            </Typography>
            <Typography variant="body1">
              State: {item.location.state}
            </Typography>
            <Typography variant="body1">
              Address: {item.location.address}
            </Typography>
            <Typography variant="body1">
              PhoneNumber: {item.location.phoneNumber}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
