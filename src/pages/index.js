import * as React from "react";
import LineChart from '../components/linechart';
import ladygaga from '../data/ladygaga.json';

const IndexPage = () => {
  const data = ladygaga.map(item => ({
    date: new Date(item.Date),
    value: item['Monthly Listeners']
  }));

  return (
    <main>
      <div style={{ width: "100%", height: "100%" }}>
        <LineChart data={data} />
      </div>
    </main>
  );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;