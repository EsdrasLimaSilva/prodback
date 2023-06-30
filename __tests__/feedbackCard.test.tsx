import FeedbackCard from "@/app/components/FeedbackCard";
import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import store from "@/app/redux/store";

jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            route: "/",
            pathname: "",
            query: "",
            asPath: "",
            push: jest.fn(),
            events: {
                on: jest.fn(),
                off: jest.fn(),
            },
            beforePopState: jest.fn(() => null),
            prefetch: jest.fn(() => null),
        };
    },
}));

describe("Feedback card", () => {
    it("should render properly", () => {
        render(
            <Provider store={store}>
                <FeedbackCard
                    feedback={{
                        _id: "12456",
                        title: "title",
                        description: "description",
                        tags: [],
                        comments: [],
                        ups: 2,
                        date: "random date",
                    }}
                />
            </Provider>
        );

        const card = screen.getByTestId("feedcard");
        expect(card).toBeInTheDocument;
    });
});
