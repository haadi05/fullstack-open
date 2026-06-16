import { render, screen, cleanup } from "@testing-library/react";
import Blog from "../components/Blog";

describe("<Blog />", () => {
  const mockBlog = {
    author: "author",
    id: "blogId",
    likes: 0,
    title: "blog",
    url: "example.com",
    user: { username: "user", id: "userId" },
  };
  const mockHandleLikeUpdate = vi.fn();
  const mockHandleDelete = vi.fn();

  //test1
  test("Blog information and the number of likes are displayed to unauthenticated users but buttons are not", () => {
    cleanup();

    const { container } = render(
      <Blog
        blog={mockBlog}
        handleLikeUpdate={mockHandleLikeUpdate}
        handleDeleteBlog={mockHandleDelete}
      />,
    );

    const fullView = container.querySelector(".fullView");
    const buttons = container.querySelector("button");

    expect(fullView).toBeInTheDocument();
    expect(buttons).not.toBeInTheDocument();
  });

  //test2
  test("Authenticated users who are not the blog’s creator are shown only the like button", () => {
    cleanup();
    const User = { token: "testingToken", username: "otheruser" };

    render(
      <Blog
        user={User}
        blog={mockBlog}
        handleLikeUpdate={mockHandleLikeUpdate}
        handleDeleteBlog={mockHandleDelete}
      />,
    );

    const likeBtn = screen.queryByRole("button", { name: "like" });
    const deleteBtn = screen.queryByRole("button", { name: "delete" });

    expect(likeBtn).toBeInTheDocument();
    expect(deleteBtn).not.toBeInTheDocument();
  });

  //test3
  test("The blog’s creator is also shown the delete button", () => {
    cleanup();
    const blogCreator = { token: "testingToken", username: "user" };

    render(
      <Blog
        user={blogCreator}
        blog={mockBlog}
        handleLikeUpdate={mockHandleLikeUpdate}
        handleDeleteBlog={mockHandleDelete}
      />,
    );

    const likeBtn = screen.queryByRole("button", { name: "like" });
    const deleteBtn = screen.queryByRole("button", { name: "delete" });

    expect(likeBtn).toBeInTheDocument();
    expect(deleteBtn).toBeInTheDocument();
  });
});
