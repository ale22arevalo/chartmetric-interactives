import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import Heading from '../../components/heading';
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import 'tippy.js/themes/light-border.css';

const LineChart = ({ data, title, metric, date, note, lineColor, symbolColor, symbol }) => {

    const chartRef = useRef();
    const [winWidth, setWinWidth] = useState(0);
    let preTooltips = [];

    function drawChart(winWidth) {
        if (chartRef.current) {
            chartRef.current.innerHTML = '';
        }

        // Get the padding values of the .body-wrapper element
        const bodyWrapper = document.querySelector('.body-wrapper');
        const style = getComputedStyle(bodyWrapper);
        const paddingLeft = parseFloat(style.paddingLeft);
        const paddingRight = parseFloat(style.paddingRight);

        const margin = { top: 20, right: 50, bottom: 30, left: 60 };
        const width = winWidth - margin.left - margin.right - paddingLeft - paddingRight;
        const height = 500 - margin.top - margin.bottom;

        const svg = d3.select(chartRef.current)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        // X AXIS
        const x = d3.scaleTime()
            .domain([d3.min(data, (d) => d.date), d3.max(data, (d) => d.date)])
            .range([0, width]);

        svg.append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(x)
                .tickValues(data.map(d => d.date).filter((i, index) => index % Math.ceil(data.length / 5) === 0))
                .tickFormat(d3.timeFormat('%b' + '. ' + '%d'))
                .ticks(5)
                .tickSize(0)
            )
            .attr('class', 'x-axis')
            .selectAll('text')
            .attr('class', 'axis-label')
            .attr("y", 10);

        // Y AXIS
        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)])
            .range([height, 0]);

        svg.append('g')
            .call(d3.axisLeft(y)
                .tickFormat((d) => {
                    if (d === 0) {
                        return null;
                    } else {
                        if (d >= 1000000) {
                            return d % 1000000 === 0
                                ? `${(d / 1000000).toFixed(0)}M`
                                : d % 10000 === 0
                                    ? `${(d / 1000000).toFixed(1)}M`
                                    : `${(d / 1000000).toFixed(2)}M`;
                        } else if (d >= 1000) {
                            return `${(d / 1000).toFixed(0)}K`;
                        } else {
                            return `${d.toFixed(0)}`;
                        }
                    }
                })
                .ticks(5)
                .tickSize(-width)
            )
            .attr('class', 'y-axis')
            .attr('transform', 'translate(-10, 0)')
            .selectAll('text')
            .attr('class', 'axis-label')
            .attr('x', -10)
            .attr('stroke', 'none');

        // LINE PATH
        svg.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', lineColor)
            .attr('stroke-width', 5)
            .attr('d', d3.line()
                .x(d => x(d.date))
                .y(d => y(d.value))
            );

        // DATA DOTS
        const dots = svg.selectAll('dot')
            .data(data)
            .enter()
            .append(symbol === 'star' ? 'path' : 'circle')
            .attr('fill', 'rgba(255, 250, 250, 0.5)')
            .attr('stroke', symbolColor)
            .attr('cursor', 'pointer')
            .attr('opacity', 0);

        if (symbol === "star") {
            dots.attr('d', d3.symbol().type(d3.symbolStar).size(200))
                .attr('transform', d => `translate(${x(d.date)}, ${y(d.value)})`)
                .attr('stroke-width', 2);
        } else {
            dots.attr('cx', d => x(d.date))
                .attr('cy', d => y(d.value))
                .attr('r', 10)
                .attr('stroke-width', 2);
        }

        dots.on('mouseover', function (event, d) {
            d3.select(this).attr('opacity', 1);
        }).on('mouseout', function (event, d) {
            d3.select(this).attr('opacity', 0);
        });

        // TOOLTIPS
        const setTooltips = () => {
            preTooltips.forEach(t => t.destroy());

            dots.attr("data-tippy-content", (d) => {
                let value = d.value > 1000000 ? `${(d.value / 1000000).toFixed(1)}M` : d.value > 1000 ? `${(d.value / 1000).toFixed(0)}K` : d.value;
                return `<span class='tippy-label'>${d.date.toLocaleDateString('en-US', { month: 'short' }) + ". " + d.date.toLocaleDateString('en-US', { day: '2-digit' })}</br>
                <b class='tippy-label'>${value}</b>
              </span>`;
            });

            preTooltips = tippy(dots.nodes(), {
                allowHTML: true,
                theme: 'light-border',
            });
        };

        setTooltips();
    }

    useEffect(() => {
        drawChart(winWidth);
    }, [winWidth]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWinWidth(window.innerWidth);
        }
        const handleResize = () => setWinWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    });

    return (
        <div className='chart-wrapper'>
            <Heading level={1} text={title} />
            <Heading level={2} text={metric + ", " + date} />
            <Heading level={3} text={"Hover over the chart to see the data points"} type={'instructions'}/>
            <div ref={chartRef}></div>
            <Heading level={4} text={note} />
        </div>
    );
};

export default LineChart;