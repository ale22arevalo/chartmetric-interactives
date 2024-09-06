import * as React from "react"
import LineChart from '../components/linechart'

const data = [
  { date: new Date("2023-01-25"), value: 10 },
  { date: new Date("2023-03-22"), value: 15 },
  { date: new Date("2023-05-19"), value: 13 },
  { date: new Date("2023-06-12"), value: 20 },
];

const IndexPage = () => {
  return (
    <main>
      <div style={{width: "100%", height: "100%"}}>
        <LineChart data={data}/>
      </div>
    </main>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
