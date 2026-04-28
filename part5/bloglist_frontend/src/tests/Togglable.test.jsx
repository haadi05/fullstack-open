import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";

describe("<Blog />", () => {
  const mockUser = { token: "testingToken", username: "user" };
  const mockBlog = {
    author: "author",
    id: "blogId",
    likes: 0,
    title: "blog",
    url: "example.com",
    user: { username: "usr", id: "userId" },
  };

  const { container } = render(
    <Blog
      user={mockUser}
      blog={mockBlog}
      blogsArray={[mockBlog]}
      setBlogsArray={vi.fn()}
    />,
  );

  test("blog's title and author are visible but url or likes are not visible by default", () => {
    const partialView = container.querySelector(".partialView");
    const fullView = container.querySelector(".fullView");

    expect(partialView).toBeInTheDocument();
    expect(fullView).not.toBeInTheDocument();
  });
});
