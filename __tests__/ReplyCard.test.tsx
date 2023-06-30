import ReplyCard from "@/app/components/ReplyCard";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import data from "./dummy.json";

describe("Reply card", () => {
    const showModal = jest.fn();

    beforeEach(() => {
        render(
            <ReplyCard
                reply={data.reply}
                commentId="54321"
                showModal={showModal}
            />
        );
    });

    it("Should render correctly", () => {
        expect(screen.getByTestId(/replycard/i)).toBeInTheDocument();
    });

    it("should call the showModal fn when clicking on 'reply'", () => {
        const replyButton = screen.getByText(/reply/i);

        expect(replyButton).toBeInTheDocument();
        fireEvent.click(replyButton);
        expect(showModal).toHaveBeenCalledTimes(1);
    });
});
