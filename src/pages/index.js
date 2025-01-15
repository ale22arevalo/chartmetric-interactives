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
      <div className="hero">
        <Heading level={1} text={"HMC Chart Templates"} />
      </div>
      <div className="body-wrapper">
        <Heading level={2} text={"A library of interactive charts following the aesthetic of HMC"} />
        <div style={{backgroundColor: '#3F8FC2', padding: '1rem', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'}}>
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