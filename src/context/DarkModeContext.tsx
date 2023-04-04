import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const DarkModeContext = createContext({
  darkmode: false,
  toggleDarkMode: () => {},
});

const updateDarkMode = (darkMode: boolean) => {
  if (darkMode) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
};

const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  const [darkmode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkmode);
    updateDarkMode(!darkmode);
  };

  useEffect(() => {
    const isDark =
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setDarkMode(isDark);
    updateDarkMode(isDark);
  }, []);

  return (
    <DarkModeContext.Provider value={{ darkmode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

const useDarkMode = () => useContext(DarkModeContext);

export { DarkModeProvider, useDarkMode };
