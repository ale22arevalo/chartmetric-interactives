import * as React from "react";
import "../styles/styles.css";
import LineChart from '../components/charts/linechart';
import BubbleChart from "../components/charts/bubblechart";
import Heading from '../components/heading';
import ladygaga from '../data/ladygaga.json';

const IndexPage = () => {
  const data = ladygaga.map(item => ({
    date: new Date(item.Date),
    value: item['Monthly Listeners']
  }));

const title = 'Ariana Grande';
const metric = 'Spotify Monthly Listeners';
const date = 'as of Sep. 10'
const note = 'Chart: Alejandra Arevalo | Data: Spotify'
const symbol = 'star'
const symbolColor = '#9c0000'

const bubbleTitle = 'Artist Demographics';
const bubbleMetric = 'Top 100 artists by Spotify Monthly Listeners';

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
          symbolColor={symbolColor}
          symbol={symbol}
        />
        <BubbleChart 
          data={data} 
          title={bubbleTitle} 
          metric={bubbleMetric}
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