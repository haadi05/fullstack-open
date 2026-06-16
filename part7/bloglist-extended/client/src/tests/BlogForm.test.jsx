import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "../components/BlogForm";

describe("<BlogForm/>", () => {
  test("event handler received as props with right details after a new blog is created", async () => {
    const createBlog = vi.fn();
    const user = userEvent.setup();

    render(<BlogForm setNotification={vi.fn()} createBlog={createBlog} />);

    const input1 = screen.getByLabelText("title");
    await user.type(input1, "test title");

    const input2 = screen.getByLabelText("author");
    await user.type(input2, "test author");

    const input3 = screen.getByLabelText("url");
    await user.type(input3, "test url");

    const button = screen.getByText("create");
    await user.click(button);

    expect(createBlog.mock.calls).toHaveLength(1);

    expect(createBlog.mock.calls[0][0].title).toBe("test title");
    expect(createBlog.mock.calls[0][0].author).toBe("test author");
    expect(createBlog.mock.calls[0][0].url).toBe("test url");
  });
});
