import { useEffect, useState } from "react";
import { Article, Articles, ArticlesEnum } from "../types";

const mapResponseToArticles = (response: Article[]) => {
  const returnValue: Articles = { "Show all": [] };

  response.forEach((item) => {
    if (returnValue[ArticlesEnum[item.post_category_id]]) {
      returnValue[ArticlesEnum[item.post_category_id]].push(item);
    } else {
      returnValue[ArticlesEnum[item.post_category_id]] = [item];
    }
    returnValue["Show all"].push(item);
  });
  return returnValue;
};

export const FETCH_URL = "https://www.alpha-orbital.com/last-100-news.json";

export const useEveArticles = () => {
  const [articles, setArticles] = useState<Articles>({});

  useEffect(() => {
    fetch(FETCH_URL)
      .then((res) => res.json())
      .then((res: Article[]) => {
        setArticles(mapResponseToArticles(res));
      })
      .catch(console.log);
  }, []);

  return { articles };
};
