import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";
import { beforeEach } from "vitest";

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
  const mockHandleLikeUpdate = vi.fn();

  let container;
  beforeEach(() => {
    return ({ container } = render(
      <Blog
        user={mockUser}
        blog={mockBlog}
        handleLikeUpdate={mockHandleLikeUpdate}
        handleDeleteBlog={vi.fn()}
      />,
    ));
  });

  test("blog's title and author are visible but url or likes are not visible by default", () => {
    const partialView = container.querySelector(".partialView");
    const fullView = container.querySelector(".fullView");

    expect(partialView).toBeInTheDocument();
    expect(fullView).not.toBeInTheDocument();
  });

  test("blog's URL and likes are shown when 'show' button is clicked.", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("show");
    await user.click(button);

    const fullView = container.querySelector(".fullView");
    expect(fullView).toBeInTheDocument();
  });

  test("when button is clicked twice, event handler received as props is called twice", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("show");
    await user.click(button);

    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandleLikeUpdate.mock.calls).toHaveLength(2);
  });
});
