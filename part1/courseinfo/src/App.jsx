//header component
const Header = (prop) => {
  return (
    <div>
      <h1>{prop.course.name}</h1>
    </div>
  );
};

//parts componet
const Parts = (prop) => {
  return (
    <div>
      <p>
        {prop.parts[0].name} {prop.parts[0].exercises}
      </p>
      <p>
        {prop.parts[1].name} {prop.parts[1].exercises}
      </p>
      <p>
        {prop.parts[2].name} {prop.parts[2].exercises}
      </p>
    </div>
  );
};

//content component
const Content = (prop) => {
  return (
    <div>
      <Parts parts={prop.course.parts} />
    </div>
  );
};

//total component
const Total = (prop) => {
  return (
    <p>
      Number of exercises{" "}
      {prop.course.parts[0].exercises +
        prop.course.parts[1].exercises +
        prop.course.parts[2].exercises}
    </p>
  );
};

//app component
const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      { name: "Fundamentals of React", exercises: 10 },
      { name: "Using props to pass data", exercises: 7 },
      { name: "State of a component", exercises: 14 },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default App;
