const createUser = async (request, name, username, password) => {
  await request.post("/api/users", {
    data: {
      name: name,
      username: username,
      password: password,
    },
  });
};

const login = async (page, username, password) => {
  await page.getByRole("textbox", { name: "username" }).fill(username);
  await page.getByRole("textbox", { name: "password" }).fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

const createBlog = async (page, title, author, url) => {
  await page.getByRole("button", { name: "create blog" }).click();
  await page.getByRole("textbox", { name: "title" }).fill(title);
  await page.getByRole("textbox", { name: "author" }).fill(author);
  await page.getByRole("textbox", { name: "url" }).fill(url);
  await page.getByRole("button", { name: "create" }).click();
  await page.getByText(title).waitFor();
};

module.exports = { login, createBlog, createUser };
