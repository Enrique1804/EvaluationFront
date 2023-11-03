import "@testing-library/jest-dom";
import App from "../../App";
import { render, screen } from "@testing-library/react";
import React from "react";

test('Renderiza App', async () => {
    render(<App/>)
    expect(await screen.findByText("Loading...")).toBeInTheDocument();
    expect(await screen.findByText("Item ID")).toBeInTheDocument();
    expect(await screen.findByText("Item Name")).toBeInTheDocument();
    expect(await screen.findByText("Actions")).toBeInTheDocument();
})