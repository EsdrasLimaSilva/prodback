import FeedListHeader from "@/app/components/FeedListHeader";
import store from "@/app/redux/store";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

describe("Feed List Header", () => {
    beforeEach(() =>
        render(
            <Provider store={store}>
                <FeedListHeader numOfFeedbacks={5} />
            </Provider>
        )
    );

    it("Should render correctly", () => {
        expect(screen.getByTestId(/feedlistheader/i)).toBeInTheDocument();
    });
});
