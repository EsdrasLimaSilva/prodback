import TagItem from "@/app/components/TagItem";
import store from "@/app/redux/store";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

import "@testing-library/jest-dom";

describe("Tag item", () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <TagItem tag="All" />
            </Provider>
        );
    });

    it("Should render correctly", () => {
        expect(screen.getByText(/all/i)).toBeInTheDocument;
    });
});
