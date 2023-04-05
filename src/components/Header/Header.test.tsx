import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { Filter, Filters } from "../../App";
import userEvent from "@testing-library/user-event";

describe("<Header/>", () => {
  const filters: Filters = ["all", "active", "completed"] as const;
  let filter: Filter;
  let onFilterChange: jest.Mock;

  beforeEach(() => {
    filter = "all";
    onFilterChange = jest.fn();

    render(
      <Header
        filters={filters}
        filter={filter}
        onFilterChange={onFilterChange}
      />
    );
  });

  it("change filter value to active", async () => {
    const active = screen.getByText("active");

    await userEvent.click(active);

    expect(onFilterChange).toBeCalledTimes(1);
  });
});
