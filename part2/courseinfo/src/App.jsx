// recives header-name from Course
const Header = ({ name }) => <h1>{name}</h1>;

// recives parts-array from Course
const Content = ({ parts }) => {
  return parts.map((part) => <Part key={part.id} part={part} />);
};

// recives a single part from array of parts from Content
const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

// recives total from Course
const Total = ({ total }) => {
  return <b>total of {total} exercises</b>;
};

// recives one course from Courses
const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total
        total={course.parts.reduce(
          (acc, curr) => (acc = acc + curr.exercises),
          0,
        )}
      />
    </div>
  );
};

// recives courses from App
const Courses = ({ courses }) => {
  return courses.map((course) => <Course key={course.id} course={course} />);
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return <Courses courses={courses} />;
};

export default App;
