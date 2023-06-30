import FeedListHeader from "@/app/components/FeedListHeader";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Feed List Header", () => {
    const showModal = jest.fn();

    beforeEach(() => render(<FeedListHeader numOfFeedbacks={5} />));

    it("Should render correctly", () => {
        expect(screen.getByTestId(/feedlistheader/i)).toBeInTheDocument();
    });
});
