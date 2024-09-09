import * as React from "react";
import LineChart from '../components/charts/linechart';
import BubbleChart from "../components/charts/bubblechart";
import Heading from '../components/heading';
import ladygaga from '../data/ladygaga.json';

const IndexPage = () => {
  const data = ladygaga.map(item => ({
    date: new Date(item.Date),
    value: item['Monthly Listeners']
  }));

const title = 'Lady Gaga';
const metric = 'Spotify Monthly Listeners';
const date = 'as of Sep. 6'
const note = 'Chart: Alejandra Arevalo | Data: Spotify'
const symbol = 'star'

  return (
    <main>
      <div className="hero">
        <Heading level={1} text={"HMC Chart Templates"} />
      </div>
      <div className="body-wrapper">
        <Heading level={2} text={"A library of interactive charts following the aesthetic of HMC"} />
        <LineChart 
          data={data} 
          title={title} 
          metric={metric}
          date = {date}
          note = {note}
          lineColor={"steelblue"}
          symbol={symbol}
        />
        <BubbleChart 
          data={data} 
          title={title} 
          metric={metric}
          date = {date}
          note = {note}
          lineColor={"steelblue"}
        />
      </div>

    </main>
  );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;