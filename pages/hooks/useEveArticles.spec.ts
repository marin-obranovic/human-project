import { renderHook, waitFor } from "@testing-library/react";
import { ArticlesEnum } from "../types";
import { FETCH_URL, useEveArticles } from "./useEveArticles";

const mockData = {
  date: "",
  excerpt: "",
  post_category_id: 2,
  post_image: "",
  post_thumbnail: "",
  slug: "",
  title: "test jest text",
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([mockData]),
  })
);

describe("useEveArticles", () => {
  describe("when hook loaded", () => {
    let renderHookResult: any;

    beforeEach(() => {
      const { result } = renderHook(() => useEveArticles());
      renderHookResult = result;
    });

    it("should call right endpoint", () => {
      expect(fetch).toHaveBeenCalledWith(FETCH_URL);
    });

    it("should return data in right format", async () => {
      await waitFor(() => {
        expect(renderHookResult.current.articles).toStrictEqual(
          expect.objectContaining({ "Show all": [mockData] })
        );
        expect(renderHookResult.current.articles).toStrictEqual(
          expect.objectContaining({
            [ArticlesEnum[mockData.post_category_id]]: [mockData],
          })
        );
      });
    });
  });
});
