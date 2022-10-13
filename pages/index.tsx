import type { NextPage } from "next";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import styles from "../styles/Home.module.css";
import { Navigation } from "./components/Navigation";
import { SearchBar } from "./components/SearchBar";
import { useEveArticles } from "./hooks/useEveArticles";
import { Article } from "./types";

const Home: NextPage = () => {
  const { articles } = useEveArticles();
  const [selectedArticles, setSelectedType] = useState<string>("Show all");
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);

  const openFullArticle = (article: Article) => {
    window.open(`https://www.alpha-orbital.com/news/${article.slug}`);
  };

  const selectArticle = (title: string) => {
    setSelectedType(title);
    if (title !== selectedArticles) {
      setFilteredArticles([]);
    }
  };

  const onSearch = (value: ChangeEvent<HTMLInputElement>) => {
    if (value.target.value.length > 2) {
      setFilteredArticles(
        articles[selectedArticles].filter((item) =>
          item.title.toLowerCase().includes(value.target.value.toLowerCase())
        )
      );
    } else {
      setFilteredArticles([]);
    }
  };

  return (
    <div>
      <Navigation articles={articles} onSelectedTitle={selectArticle} />
      <SearchBar articles={filteredArticles} onSearch={onSearch} />
      <div className={styles.articles}>
        {articles[selectedArticles] &&
          (filteredArticles.length
            ? filteredArticles
            : articles[selectedArticles]
          ).map((item) => {
            return (
              <div className={styles.article}>
                <h2 onClick={() => openFullArticle(item)}>{item.title}</h2>
                <Image
                  onClick={() => openFullArticle(item)}
                  src={`https://www.alpha-orbital.com/assets/images/post_img/${item.post_image}`}
                  width={400}
                  height={400}
                />
                <p onClick={() => openFullArticle(item)}>Full article</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
