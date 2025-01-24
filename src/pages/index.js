import * as React from "react";
import "../styles/styles.css";
import LineChart from '../components/charts/linechart';
import BubbleChart from "../components/charts/bubblechart";
import Heading from '../components/heading';
import badbunny from '../data/badbunny.json';
import badbunnyphoto from '../images/badbunny.png';

const IndexPage = () => {
  const data = badbunny.map(item => ({
    date: new Date(item.Date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$1-$2')),
    value: item['Monthly Listeners']
  }));

const title = 'Bad Bunny';
const metric = 'Spotify monthly listeners';
const date = 'Aug. 20, 2024 to Jan. 15, 2025'
const note = 'Chart: Alejandra Arevalo | Data: Chartmetric'
const symbol = 'star'
const symbolColor = '#9c0000'

const bubbleTitle = 'Artist Demographics';
const bubbleMetric = 'Top 100 artists by Spotify Monthly Listeners';

  return (
    <main>
      <div id="viz_1">
          <LineChart 
            data={data} 
            title={title} 
            metric={metric}
            date = {date}
            note = {note}
            lineColor={"black"}
            symbolColor={symbolColor}
            symbol={symbol}
            textColor={"#FFFAEE"}
            image={badbunnyphoto}
          />
        </div>
        <div id="viz_2">
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