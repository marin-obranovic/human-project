import { ChangeEvent } from "react";
import styles from "../../styles/SearchBar.module.css";
import { Article } from "../types";

interface SearchBarProps {
  articles: Article[];
  onSearch: (value: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar = ({ articles, onSearch }: SearchBarProps) => {
  return (
    <div className={styles.search}>
      <input onChange={onSearch} />
      {articles.length > 0 && (
        <p>Amount of found articles: {articles.length}</p>
      )}
    </div>
  );
};
