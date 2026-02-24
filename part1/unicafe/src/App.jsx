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

const App = () => {
  // save clicks of each button to its own state
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
      <Display name="good" value={good} />
      <Display name="neutral" value={neutral} />
      <Display name="bad" value={bad} />
      <Display name="all" value={all} />
      <Display
        name="average"
        value={(good * 1 + neutral * 0 + bad * -1) / all}
      />
      <Display name="positive" value={(good * 100) / all} />
    </div>
  );
};

export default App;
