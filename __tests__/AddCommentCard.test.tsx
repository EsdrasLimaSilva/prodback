import AddCommentCard from "@/app/components/AddCommentCard";
import store from "@/app/redux/store";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

jest.mock("next/navigation", () => ({
    ...require("next-router-mock"),
    useSearchParams: () => [{ revalidade: 1 }],
    usePathname: jest.fn(),
}));

describe("AddComment Card", () => {
    beforeEach(() =>
        render(
            <Provider store={store}>
                <AddCommentCard comments={[]} />
            </Provider>
        )
    );

    it("Should render correctly", () => {
        expect(screen.getByTestId("addcommentcard")).toBeInTheDocument();
    });

    it("Should render with 250 characters left", () => {
        expect(screen.getByText(/250 characters left/i)).toBeInTheDocument();
    });

    it("Should reduce the number of characters as the user types", () => {
        const commentInput = screen.getByTestId(
            "textareacomment"
        ) as HTMLTextAreaElement;
        fireEvent.change(commentInput, { target: { value: "abc" } });

        // expect(commentInput.value).toBe("abc");
        expect(screen.getByText(/247 characters left/i)).toBeInTheDocument();
    });
});
