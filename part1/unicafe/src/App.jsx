import { useState } from "react";

const Button = ({ onClick, name }) => {
  return <button onClick={onClick}>{name}</button>;
};

const StatisticLine = ({ name, value }) => {
  return (
    <tbody>
      <tr>
        <td>{name}</td>
        <td>{value}</td>
      </tr>
    </tbody>
  );
};

const Statistics = (props) => {
  if (props.all !== 0) {
    return (
      <>
        <table>
          <StatisticLine name="good" value={props.good} />
          <StatisticLine name="neutral" value={props.neutral} />
          <StatisticLine name="bad" value={props.bad} />
          <StatisticLine name="all" value={props.all} />
          <StatisticLine
            name="average"
            value={
              (props.good * 1 + props.neutral * 0 + props.bad * -1) / props.all
            }
          />
          <StatisticLine
            name="positive"
            value={(props.good * 100) / props.all}
          />
        </table>
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
