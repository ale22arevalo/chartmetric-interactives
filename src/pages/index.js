import * as React from "react";
import LineChart from '../components/linechart';
import Heading from '../components/heading';
import ladygaga from '../data/ladygaga.json';

const IndexPage = () => {
  const data = ladygaga.map(item => ({
    date: new Date(item.Date),
    value: item['Monthly Listeners']
  }));

const title = 'Lady Gaga';
const description = 'Monthly Listeners';

  return (
    <main>
      <div className="hero">
        <Heading level={1} text={"HMC Chart Templates"} />
      </div>
      <div style={{ width: "100%", height: "100%" }}>
        <LineChart 
          data={data} 
          title={title} 
          description={description}
          lineColor={"steelblue"}
        />
      </div>
    </main>
  );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;