//header component
const Header = (prop) => {
  return (
    <div>
      <h1>{prop.course}</h1>
    </div>
  );
};

//part1 component
const Part1 = (prop) => {
  return (
    <div>
      <p>
        {prop.part1} {prop.exercises1}
      </p>
    </div>
  );
};

//part2 component
const Part2 = (prop) => {
  return (
    <div>
      <p>
        {prop.part2} {prop.exercises2}
      </p>
    </div>
  );
};

//part3 component
const Part3 = (prop) => {
  return (
    <div>
      <p>
        {prop.part3} {prop.exercises3}
      </p>
    </div>
  );
};

//content component
const Content = (prop) => {
  return (
    <div>
      <Part1 part1={prop.part1} exercises1={prop.exercises1} />
      <Part2 part2={prop.part2} exercises2={prop.exercises2} />
      <Part3 part3={prop.part3} exercises3={prop.exercises3} />
    </div>
  );
};

//total component
const Total = (prop) => {
  return (
    <p>
      Number of exercises {prop.exercises1 + prop.exercises2 + prop.exercises3}
    </p>
  );
};

//app component
const App = () => {
  const course = "Half Stack application development";
  const part1 = { name: "Fundamentals of React", exercises: 10 };
  const part2 = { name: "Using props to pass data", exercises: 7 };
  const part3 = { name: "State of a component", exercises: 14 };

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1}
        part2={part2}
        part3={part3}
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      />
      <Total
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      />
    </div>
  );
};

export default App;
