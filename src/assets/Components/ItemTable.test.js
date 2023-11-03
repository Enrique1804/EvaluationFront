import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ItemTable from "./ItemTable";
import { MemoryRouter } from "react-router-dom";
import { itemsTabla } from "../../App";
import { MockedProvider } from "@apollo/client/testing";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { mutation } from "./ItemTable";

const mocks = [
  {
    request: {
      query: itemsTabla,
    },
    result: {
      data: {
        Items: [
          {
            itemId: 1,
            itemName: "Item 1",
          },
          {
            itemId: 2,
            itemName: "Item 2",
          },
        ],
      },
    },
  },
];

const dataMock = [
  {
    request:{
      query: mutation,
      variables: {
        itemId: 1,
      },
    },
    result: {
      data: {
        deleteItem: {
          itemId: 1,
        },
      },
    },
  },
];

describe("ItemTable Component", () => {
  it("renders", async () => {
    render(
      <MemoryRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <ItemTable />
        </MockedProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).toBeNull();
    });

    expect(await screen.getByText("Item 1")).toBeInTheDocument();
    expect(await screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("Busqueda y actualización de items", async () => {
    render(
      <MemoryRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <ItemTable />
        </MockedProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).toBeNull();
    });

    const searchInput = screen.getByLabelText("Search");
    userEvent.type(searchInput, "Item 1");

    await screen.findByText("Item 1");
  });

  it("Eliminar Item", async () => {
    render(
      <MemoryRouter>
        <MockedProvider mocks={mocks.concat(dataMock)} addTypename={false}>
          <ItemTable />
        </MockedProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).toBeNull();
    });

    const deleteButton = screen.getByTestId("delete-button1");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
    });
  });
});
