import SelectOrder from "@/app/components/SelectOrder";
import store from "@/app/redux/store";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

describe("Select Order Component", () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <SelectOrder />
            </Provider>
        );
    });

    it("Should render correctly", () => {
        expect(screen.getByTestId(/selecttest/i)).toBeInTheDocument();
    });

    it("Should have two options", () => {
        const selectComponent = screen.getByTestId(/selecttest/i);

        expect(selectComponent.childNodes).toHaveLength(2);
    });
});
