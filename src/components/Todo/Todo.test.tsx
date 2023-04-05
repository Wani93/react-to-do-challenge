import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import TodoComp from "./Todo";
import type { Todo } from "./types";

describe("<Todo/>", () => {
  let todo: Todo;
  let onUpdate: jest.Mock;
  let onDelete: jest.Mock;

  beforeEach(() => {
    todo = { id: "1", text: "todo1", status: "active" };
    onUpdate = jest.fn();
    onDelete = jest.fn();

    render(<TodoComp todo={todo} onUpdate={onUpdate} onDelete={onDelete} />);
  });

  it("render", () => {
    expect(screen.getByText("todo1")).toBeInTheDocument();
  });

  it("handle change", async () => {
    await userEvent.click(screen.getByRole("checkbox"));

    expect(onUpdate).toBeCalledTimes(1);
    expect(onUpdate).toHaveBeenCalledWith({
      id: "1",
      text: "todo1",
      status: "completed",
    });
  });

  it("handle delete", async () => {
    await userEvent.click(screen.getByRole("button"));

    expect(onDelete).toBeCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith({
      id: "1",
      text: "todo1",
      status: "active",
    });
  });
});
