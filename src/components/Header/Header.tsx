import { Filter, Filters } from "../../App";
import { useDarkMode } from "../../context/DarkModeContext";
import styles from "./Header.module.css";
import { HiMoon, HiSun } from "react-icons/hi";

const Header = ({
  filters,
  filter,
  onFilterChange,
}: {
  filters: Filters;
  filter: string;
  onFilterChange: React.Dispatch<React.SetStateAction<Filter>>;
}) => {
  const { darkmode, toggleDarkMode } = useDarkMode();

  return (
    <header className={styles.header}>
      <button className={styles.toggle} onClick={toggleDarkMode}>
        {darkmode ? <HiSun /> : <HiMoon />}
      </button>
      <ul className={styles.filters}>
        {filters.map((value) => (
          <li
            key={value}
            className={`
            ${styles.filter}
            ${filter === value && styles.selected}`}
            onClick={() => onFilterChange(value)}
          >
            {value}
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
