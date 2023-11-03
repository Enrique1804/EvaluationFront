import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom";
import ItemInfo from "./ItemInfo";
import { infoItem } from "../../App";

const itemInfoMock = {
  request: {
    query: infoItem,
    variables: {
      itemId: 1,
    },
  },
  result: {
    data: {
      Item: {
        itemId: 1,
        itemName: "Item Name",
        description: "Item Description",
        location: {
          locationId: 1,
          state: "State",
          address: "Address",
          phoneNumber: "123-456-7890",
        },
      },
    },
  },
};

describe("ItemInfo Component", () => {
  it("muestra los detalles del ítem", async () => {
    render(
      <MemoryRouter initialEntries={["/items/1"]}>
        <MockedProvider mocks={[itemInfoMock]} addTypename={false}>
            <Routes>
                <Route path="/items/:itemId" element={<ItemInfo/>}>
                </Route>
            </Routes>
        </MockedProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("ItemID: 1")).toBeInTheDocument();
      expect(screen.getByText("ItemName: Item Name")).toBeInTheDocument();
      expect(
        screen.getByText("Description: Item Description")
      ).toBeInTheDocument();
      expect(screen.getByText("Location Details")).toBeInTheDocument();
      expect(screen.getByText("LocationID: 1")).toBeInTheDocument();
      expect(screen.getByText("State: State")).toBeInTheDocument();
      expect(screen.getByText("Address: Address")).toBeInTheDocument();
      expect(screen.getByText("PhoneNumber: 123-456-7890")).toBeInTheDocument();
    });
  });
});
