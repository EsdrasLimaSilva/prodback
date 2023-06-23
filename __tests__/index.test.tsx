import {render, screen} from "@testing-library/react";
import Home from "@/app/page";
import "@testing-library/jest-dom";

describe("Home", () => {
    it("should render the home page", () => {
        render(<Home/>);

        const helloWorld = screen.getByText(/hello world/i);
        expect(helloWorld).toBeInTheDocument();
    })
})