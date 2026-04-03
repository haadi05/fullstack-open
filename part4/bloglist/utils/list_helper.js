const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const likesArray = blogs.map((blog) => blog.likes);
  const reducer = (sum, item) => (sum = sum + item);
  return likesArray.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const likesArray = blogs.map((blog) => blog.likes);

  const reducer = (max, item) => {
    if (item > max) {
      max = item;
    }
    return max;
  };

  const mostLikedCount = likesArray.reduce(reducer, 0);
  const favBlogsList = blogs.filter((blog) => blog.likes === mostLikedCount);
  return favBlogsList[0];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
