import { useState } from "react";
import Header from "./components/Header/Header";
import TodoList from "./components/TodoList/TodoList";
import { DarkModeProvider } from "./context/DarkModeContext";

const filters = ["all", "active", "completed"] as const;
type Filters = typeof filters;
type Filter = Filters[number];

function App() {
  const [filter, setFilter] = useState<Filter>(filters[0]);

  return (
    <DarkModeProvider>
      <Header filters={filters} filter={filter} onFilterChange={setFilter} />
      <TodoList filter={filter} />
    </DarkModeProvider>
  );
}
export type { Filters, Filter };
export default App;
