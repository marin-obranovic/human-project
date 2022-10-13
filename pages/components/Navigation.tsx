import styles from "../../styles/Navigation.module.css";
import { Articles } from "../types";

interface NavigationProps {
  articles: Articles;
  onSelectedTitle: (title: string) => void;
}

export const Navigation = ({ articles, onSelectedTitle }: NavigationProps) => {
  return (
    <div className={styles.navigation} data-testid="navigation">
      {Object.entries(articles).map(([key, value]) => {
        if (value.length) {
          return (
            <div
              key={key}
              data-testid="navigation-item"
              onClick={() => onSelectedTitle(key)}
            >
              {key}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};
