import { Navigation } from "./Navigation";
import { fireEvent, render } from "@testing-library/react";
import { Articles } from "../types";
import "@testing-library/jest-dom/extend-expect";

describe("Navigation", () => {
  describe("when articles prop has array with atleast one item", () => {
    const mockOnSelectedTitle = jest.fn();
    let queryByTestId: any;
    const mockData: Articles = {
      mockTitle: [
        {
          date: "",
          excerpt: "",
          post_category_id: 2,
          post_image: "",
          post_thumbnail: "",
          slug: "",
          title: "test jest text",
        },
      ],
    };

    beforeEach(() => {
      queryByTestId = render(
        <Navigation articles={mockData} onSelectedTitle={mockOnSelectedTitle} />
      ).queryByTestId;
    });

    it("should show article titles", () => {
      expect(queryByTestId("navigation-item")).toBeInTheDocument();
      expect(queryByTestId("navigation-item")).toHaveTextContent("mockTitle");
    });

    describe("and title was clicked", () => {
      beforeEach(() => {
        fireEvent.click(queryByTestId("navigation-item"));
      });

      it("should call passed callback", () => {
        expect(mockOnSelectedTitle).toHaveBeenCalled();
      });
    });
  });

  describe("when articles prop is empty", () => {
    let queryByTestId: any;

    beforeEach(() => {
      queryByTestId = render(
        <Navigation articles={{}} onSelectedTitle={jest.fn()} />
      ).queryByTestId;
    });

    it("should return empty container", () => {
      expect(queryByTestId("navigation-item")).not.toBeInTheDocument();
    });
  });
});
