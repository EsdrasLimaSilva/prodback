import FeedbackCard from "@/app/components/FeedbackCard";
import { queryByAttribute, render, screen } from "@testing-library/react";

describe("Feedback card", () => {
    it("should render properly", () => {
        render(
            <FeedbackCard
                feedback={{
                    _id: "12456",
                    title: "title",
                    description: "description",
                    tags: [],
                    comments: [],
                    ups: 2,
                }}
            />
        );

        const card = screen.getByTestId("feedcard");
        expect(card).toBeInTheDocument;
    });
});
