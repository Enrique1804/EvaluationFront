import React, { useEffect, useState } from "react";
import ItemTable from "./assets/Components/ItemTable";
import { ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ItemInfo from "./assets/Components/ItemInfo";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export const itemsTabla = gql`
  query {
    Items {
      itemId
      itemName
    }
  }
`;

export const infoItem = gql`
  query itemInfo($itemId: Int!){
    Item(itemId: $itemId) {
      itemId
      itemName
      description
      location {
        locationId
        state
        address
        phoneNumber
      }
    }
  }
`;

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<ItemTable />}/>
            <Route path="/items/:itemId" element={<ItemInfo />}/>
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}
