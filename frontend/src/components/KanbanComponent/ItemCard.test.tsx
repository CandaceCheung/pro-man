import React from "react";
import { render, screen } from "@testing-library/react";
import { store } from "../../store";
import { Provider } from "react-redux";
import { ItemCard } from "./ItemCard";

test("test item card name", async () => {
    render(
        <Provider store={store}>
            <ItemCard id={1} name={"item"} date={"1.1.2023"} membersList={[]}/>
        </Provider>
    )
    const nameInCard = screen.getByText(/item/);
        expect(nameInCard).toBeInTheDocument();

});
