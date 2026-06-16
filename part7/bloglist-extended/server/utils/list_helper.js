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

const mostBlogs = (blogs) => {
  const authors = blogs.map((blog) => blog.author);
  let obj = {};

  authors.forEach((element) => {
    obj[element] ? (obj[element] += 1) : (obj[element] = 1);
  });

  const numOfBlogs = Object.values(obj);
  const maxNumOfBlogs = Math.max(...numOfBlogs);
  const authorWithMostBlogs = Object.keys(obj).find(
    (name) => obj[name] === maxNumOfBlogs,
  );

  return {
    author: authorWithMostBlogs,
    blogs: maxNumOfBlogs,
  };
};

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

const mostLikes = (blogs) => {
  let obj = {};

  blogs.forEach((blog) => {
    if (!obj[blog.author]) {
      obj[blog.author] = blog.likes;
    } else {
      obj[blog.author] += blog.likes;
    }
  });

  const likesArray = Object.values(obj);
  const highestLikes = Math.max(...likesArray);
  const authorWithMostLikes = Object.keys(obj).find(
    (author) => obj[author] === highestLikes,
  );

  return {
    author: authorWithMostLikes,
    likes: highestLikes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
