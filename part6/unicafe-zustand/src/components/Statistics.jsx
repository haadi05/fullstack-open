import { useGoodReview, useNeutralReview, useBadReview } from "../store";

const Statistics = () => {
  const good = useGoodReview();
  const bad = useBadReview();
  const neutral = useNeutralReview();

  const all = good + bad + neutral;

  const average = (good * 1 + neutral * 0 + bad * -1) / all;
  const averageResult = average ? String(average.toFixed(1)) : 0;

  const positive = (good * 100) / all;
  const positiveResult = positive ? String(Math.round(positive)) : 0;

  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>all</td>
            <td>{all}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{averageResult}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{`${positiveResult} %`}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;
