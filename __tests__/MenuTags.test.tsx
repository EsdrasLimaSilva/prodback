import MenuTags from "@/app/components/MenuTags";
import store from "@/app/redux/store";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

describe("Menu Tags", () => {
    beforeEach(() =>
        render(
            <Provider store={store}>
                <MenuTags />
            </Provider>
        )
    );

    it("Should render correctly", () => {
        expect(screen.getByTestId(/menutags/i)).toBeInTheDocument();
    });

    it("Should have 6 tags", () => {
        const menuComponent = screen.getByTestId(/menutags/i);
        const list = menuComponent.lastChild!;

        expect(list.childNodes).toHaveLength(6);
    });
});
