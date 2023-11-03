import React from "react";
import {
  fireEvent,
  getByText,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import ItemTable from "./ItemTable";
import { MemoryRouter } from "react-router-dom";
import { itemsTabla } from "../../App";
import { MockedProvider } from "@apollo/client/testing";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import AddItem from "./AddItem";
import { mutation } from "./AddItem";

const dataMock = [
  {
    request: {
      query: mutation,
      variables: {
        itemId: 123,
        itemName: "Test Item",
        description: "Description",
        location: {
          state: "CDMX",
          address: "Polanco",
          phoneNumber: "12345",
        },
      },
    },
    result: {
      data: {
        createItem: {
          itemId: 123,
          itemName: "Test Item",
          description: "Description",
          location: {
            state: "CDMX",
            address: "Polanco",
            phoneNumber: "12345",
          },
        },
      },
    },
  },
];

describe("AddItem Component", () => {
  it("render form", async () => {
    render(
      <MockedProvider mocks={dataMock} addTypename={false}>
        <AddItem />
      </MockedProvider>
    );

    const itemIdInput = screen.getByLabelText("Item ID");
    const itemNameInput = screen.getByLabelText("Item Name");
    const descriptionInput = screen.getByLabelText("Description");
    const stateInput = screen.getByLabelText("State");
    const addressInput = screen.getByLabelText("Address");
    const phoneNumberInput = screen.getByLabelText("Phone Number");
    const submitButton = screen.getByText("Añadir Item");

    fireEvent.change(itemIdInput, { target: { value: 123 } });
    fireEvent.change(itemNameInput, { target: { value: "Test Item" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Description" },
    });
    fireEvent.change(stateInput, { target: { value: "CDMX" } });
    fireEvent.change(addressInput, { target: { value: "Polanco" } });
    fireEvent.change(phoneNumberInput, { target: { value: "12345" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      const anotherButton = screen.getByText("Añadir otro Item");
      fireEvent.click(anotherButton);
      expect(itemIdInput).toHaveValue("");
      expect(itemNameInput).toHaveValue("");
      expect(descriptionInput).toHaveValue("");
      expect(stateInput).toHaveValue("");
      expect(addressInput).toHaveValue("");
      expect(phoneNumberInput).toHaveValue("");
    });
  });

  it("muestra boton añadir otro item", async () => {
    render(
      <MockedProvider mocks={dataMock} addTypename={false}>
        <AddItem />
      </MockedProvider>
    );

    const itemIdInput = screen.getByLabelText("Item ID");
    const itemNameInput = screen.getByLabelText("Item Name");
    const descriptionInput = screen.getByLabelText("Description");
    const stateInput = screen.getByLabelText("State");
    const addressInput = screen.getByLabelText("Address");
    const phoneNumberInput = screen.getByLabelText("Phone Number");
    const submitButton = screen.getByText("Añadir Item");

    fireEvent.change(itemIdInput, { target: { value: 123 } });
    fireEvent.change(itemNameInput, { target: { value: "Test Item" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Description" },
    });
    fireEvent.change(stateInput, { target: { value: "CDMX" } });
    fireEvent.change(addressInput, { target: { value: "Polanco" } });
    fireEvent.change(phoneNumberInput, { target: { value: "12345" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      const addAnotherItemButton = screen.getByText("Añadir otro Item");
      expect(addAnotherItemButton).toBeInTheDocument();
    });
  });
});
