import React, { useRef, useEffect, useState } from 'react'
import * as d3 from 'd3'
import Heading from '../components/heading'
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import 'tippy.js/themes/light-border.css';

const LineChart = ({ data, title, description, lineColor }) => {

    const chartRef = useRef()
    const [winWidth, setWinWidth] = useState(500)
    let preTooltips = []

    function drawChart(winWidth) {
        if (chartRef.current){
            chartRef.current.innerHTML = ''
        }

        const margin = { top: 20, right: 20, bottom: 30, left: 100 }
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
            .tickValues(data.map(d => d.date).filter((d, i) => i % 4 === 0))
            .tickFormat(d3.timeFormat('%b' + '. ' + '%d'))
        )
        .selectAll('text')
        .attr("y", 10)
       
        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)])
            .range([height, 0])

        svg.append('g')
            .call(d3.axisLeft(y)
            .tickFormat((d, i) => {
                    if (i % 2 === 0) {
                        if (d >= 1000000) {
                            return d % 1000000 === 0
                                ? `${(d / 1000000).toFixed(0)}M`
                                : d % 10000 === 0
                                    ? `${(d / 1000000).toFixed(1)}M`
                                    : `${(d / 1000000).toFixed(2)}M`
                        } else if (d >= 1000) {
                            return `${(d / 1000).toFixed(0)}K`
                        } else {
                            return `${d.toFixed(0)}`
                        }
                    } else {
                        return null
                    }
                })
            .ticks(5)
            .tickSize(-width)
            )
            .attr('class', 'grid')
            .attr('transform', 'translate(-10, 0)')
            .selectAll('text')
            .attr('class', 'axis-label')
            .attr('x', -10)
            .attr('stroke', 'none')
        
        svg.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', lineColor)
            .attr('stroke-width', 4)
            .attr('d', d3.line()
                .x(d => x(d.date))
                .y(d => y(d.value))
            )
        
        const dots = svg.selectAll('dot')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx', d => x(d.date))
            .attr('cy', d => y(d.value))
            .attr('r', 5)
            .attr('fill', 'rgba(255, 250, 250, 0.5)')
            .attr('stroke', lineColor)
            .attr('stroke-width', 2)
            .attr('cursor', 'pointer')
            .attr('opacity', 0)
      
          dots.on('mouseover', function (event, d) {
            d3.select(this).attr('opacity', 1)
          }).on('mouseout', function (event, d) {
            d3.select(this).attr('opacity', 0)
          })
      
          const setTooltips = () => {
            preTooltips.forEach(t => t.destroy())
      
            dots.attr("data-tippy-content", (d, i) => {
              let value = d.value > 1000000 ? `${(d.value / 1000000).toFixed(2)}M` : d.value > 1000 ? `${(d.value / 1000).toFixed(0)}K` : d.value
              return `<span class='tippy-label'>${d.date.toLocaleDateString('en-US', { month: 'short' }) + " '" + d.date.toLocaleDateString('en-US', { year: '2-digit' })}</br>
                <b class='tippy-label'>${value}</b>
              </span>`
            })
      
            preTooltips = tippy(dots.nodes(), {
              allowHTML: true,
              theme: 'light-border',
            })
          }
      
          setTooltips()

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
        <>
        <Heading level={1} text={title} />
        <Heading level={2} text={description} />
        <div ref={chartRef}></div>
        </>
    ) 
}

export default LineChart