import React, { useRef, useEffect, useState } from 'react'
import * as d3 from 'd3'
import Heading from '../../components/heading';
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import 'tippy.js/themes/light-border.css';

const BubbleChart = ({data, title, metric, date, note, lineColor}) => {

    const chartRef = useRef()
    const [winWidth, setWinWidth] = useState(0)
    let preTooltips = []

    function drawChart(winWidth) {
        if (chartRef.current){
            chartRef.current.innerHTML = ''
        }

        const margin = { top: 20, right: 20, bottom: 30, left: 80 }
        const width = winWidth - margin.left - margin.right
        const height = 500 - margin.top - margin.bottom

        const svg = d3.select(chartRef.current)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)
        
        // TOOLTIPS
        const setTooltips = () => {
            preTooltips.forEach(t => t.destroy())
      
        //     dots.attr("data-tippy-content", (d) => {
        //       let value = d.value > 1000000 ? `${(d.value / 1000000).toFixed(1)}M` : d.value > 1000 ? `${(d.value / 1000).toFixed(0)}K` : d.value
        //       return `<span class='tippy-label'>${d.date.toLocaleDateString('en-US', { month: 'short' }) + ". " + d.date.toLocaleDateString('en-US', { day: '2-digit' })}</br>
        //         <b class='tippy-label'>${value}</b>
        //       </span>`
        //     })
      
        //     preTooltips = tippy(dots.nodes(), {
        //       allowHTML: true,
        //       theme: 'light-border',
        //     })
        //   }
      
          setTooltips()
    }
}

    useEffect(() => {
        drawChart(winWidth)
    }, [winWidth])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWinWidth(window.innerWidth)
        }
        const handleResize = () => setWinWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    })

    return (
        <div className='chart-wrapper'>
            <Heading level={1} text={title} />
            <Heading level={2} text={metric + ", " + date} />
            <div ref={chartRef}></div>
            <Heading level={4} text ={note} />
        </div>
    ) 
}

export default BubbleChart