import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import Heading from '../../components/heading';
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import 'tippy.js/themes/light-border.css';
import data from '../../data/gender.json';
import gradient from '../../images/gradient.svg';

const BubbleChart = ({ title, metric, date, note }) => {
    const chartRef = useRef();
    const [winWidth, setWinWidth] = useState(0);
    let preTooltips = [];

    function drawChart(winWidth) {
        if (chartRef.current) {
            chartRef.current.innerHTML = '';
        }

        // Get the dimensions of the chart-wrapper element
        const chartWrapper = chartRef.current.parentElement;
        const style = getComputedStyle(chartWrapper);
        const paddingLeft = parseFloat(style.paddingLeft);
        const paddingRight = parseFloat(style.paddingRight);

        const margin = { top: 30, right: 30, bottom: 30, left: 30 };
        const width = chartWrapper.clientWidth - margin.left - margin.right - paddingLeft - paddingRight;
        const height = 500 - margin.top - margin.bottom;

        const svg = d3.select(chartRef.current)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')


        // Add SVG background
        svg.append('image')
            .attr('xlink:href', gradient)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .attr('x', 0)
            .attr('y', 0);

        console.log("Data:", data);

        // Create a hierarchy from the data
        const root = d3.hierarchy(data)
            .sum(d => d.value);

        // Create a bubble layout with pack
        const pack = d3.pack()
            .size([width, height])
            .padding(3);

        // Apply the pack layout to the root hierarchy node
        const nodes = pack(root).descendants().filter(d => d.depth > 0);

        console.log("Nodes:", nodes);

        // Create bubbles (circles) for each node
        const bubble = svg.selectAll("circle")
            .data(nodes)
            .enter()
            .append("circle")
            .attr("class", "bubble")
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
            .attr("r", d => d.r)
            .style("fill", "rgba(255,255,255,0.3)");

        // Initialize tippy for the bubbles
        tippy(bubble.nodes(), {
            allowHTML: true,
            theme: 'light-border',
        });

        // TOOLTIPS
        const setTooltips = () => {
            preTooltips.forEach(t => t.destroy());

            bubble.attr("data-tippy-content", (d) => {
                return `<span class='tippy-label'>${d.data.name}</span>`;
            });

            preTooltips = tippy(bubble.nodes(), {
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
        <div className='bubble-wrapper'>
            <Heading level={1} text={title} />
            <Heading level={2} text={metric + ", " + date} />
            <Heading level={3} text={"Hover over the chart to see the data points"} type={'instructions'}/>
            <div ref={chartRef}></div>
            <Heading level={4} text={note} />
        </div>
    );
};

export default BubbleChart;