import React, { useRef, useEffect, useState } from 'react'
import * as d3 from 'd3'

const LineChart = ({ data }) => {

    const chartRef = useRef()
    const [winWidth, setWinWidth] = useState(500)

    function drawChart(winWidth) {
        if (chartRef.current){
            chartRef.current.innerHTML = ''
        }

        const margin = { top: 20, right: 20, bottom: 30, left: 50 }
        const width = winWidth - margin.left - margin.right
        const height = 500 - margin.top - margin.bottom

        const svg = d3.select(chartRef.current)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)
        
        const x = d3.scaleLinear()
            .domain(d3.extent(data, d => d.date))
            .range([0, width])
        
        svg.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x)
            .tickValues(data.map(d => d.date).filter((d, i) => i % 2 === 0))
            .tickFormat(d3.timeFormat('%b %d'))
        )
        .selectAll('text')
        .attr("y", 10)
       
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .range([height, 0])

    svg.append('g')
        .call(d3.axisLeft(y))
        .attr('transform', 'translate(-10, 0)')
        .selectAll('text')
        .attr('x', -10)
    
    svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1.5)
        .attr('d', d3.line()
            .x(d => x(d.date))
            .y(d => y(d.value))
        )
    
    svg.append('g')
        .selectAll('dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => x(d.date))
        .attr('cy', d => y(d.value))
        .attr('r', 5)
        .attr('fill', 'steelblue')

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
        <div ref={chartRef}></div>
    ) 
}

export default LineChart