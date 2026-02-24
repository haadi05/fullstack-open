import { useState } from "react";

const Button = ({ onClick, name }) => {
  return <button onClick={onClick}>{name}</button>;
};

const Display = ({ name, value }) => {
  return (
    <p>
      {name} {value}
    </p>
  );
};

const Statistics = (props) => {
  if (props.all !== 0) {
    return (
      <>
        <Display name="good" value={props.good} />
        <Display name="neutral" value={props.neutral} />
        <Display name="bad" value={props.bad} />
        <Display name="all" value={props.all} />
        <Display
          name="average"
          value={
            (props.good * 1 + props.neutral * 0 + props.bad * -1) / props.all
          }
        />
        <Display name="positive" value={(props.good * 100) / props.all} />
      </>
    );
  } else {
    return <p>No feedback given</p>;
  }
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  const handleGoodReviews = () => {
    const goodReviews = good + 1;
    setGood(goodReviews);
    setAll(goodReviews + neutral + bad);
  };

  const handleNeutralReviews = () => {
    const neutralReviews = neutral + 1;
    setNeutral(neutralReviews);
    setAll(good + neutralReviews + bad);
  };

  const handleBadReviews = () => {
    const badReviews = bad + 1;
    setBad(badReviews);
    setAll(good + neutral + badReviews);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodReviews} name="good" />
      <Button onClick={handleNeutralReviews} name="neutral" />
      <Button onClick={handleBadReviews} name="bad" />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  );
};

export default App;
