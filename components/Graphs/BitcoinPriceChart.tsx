// components/BitcoinPriceChart.tsx

import React, { useEffect, useRef } from 'react';
import { Typography, Paper, Box } from '@mui/material';
import * as d3 from 'd3';
import { bitcoinData, BitcoinDataPoint } from '../../data/bitcoinData';

const BitcoinPriceChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current || !tooltipRef.current) return;

    const margin = { top: 20, right: 20, bottom: 50, left: 80 };
    const width = 840;
    const height = 400;

    d3.select(chartRef.current).select("svg").remove();

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleTime()
      .domain(d3.extent(bitcoinData, (d) => d.date) as [Date, Date])
      .range([0, width - margin.left - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(bitcoinData, (d) => d.price)!])
      .range([height - margin.top - margin.bottom, 0]);

    const line = d3
      .line<BitcoinDataPoint>()
      .x((d) => x(d.date))
      .y((d) => y(d.price));

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("class", "text-xs text-gray-500");

    svg
      .append("g")
      .call(d3.axisLeft(y).tickFormat((d) => `$${(d as number).toLocaleString()}`))
      .selectAll("text")
      .attr("class", "text-xs text-gray-500");

    svg
      .append("path")
      .datum(bitcoinData)
      .attr("fill", "none")
      .attr("stroke", "#3498db")
      .attr("stroke-width", 3)
      .attr("d", line);

    svg
      .selectAll(".dot")
      .data(bitcoinData)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => x(d.date))
      .attr("cy", (d) => y(d.price))
      .attr("r", 5)
      .attr("fill", "#e74c3c")
      .on("mouseover", function (event, d) {
        d3.select(this).transition().duration(200).attr("r", 8);

        const xPos = x(d.date) + margin.left;
        const yPos = y(d.price) + margin.top;

        d3.select(tooltipRef.current)
          .style("opacity", 1)
          .html(`
            <strong>Date:</strong> ${d.date.toLocaleDateString()}<br>
            <strong>Price:</strong> $${d.price.toLocaleString()}
          `)
          .style("left", `${xPos + 15}px`)
          .style("top", `${yPos - 30}px`);
      })
      .on("mouseout", function () {
        d3.select(this).transition().duration(200).attr("r", 5);

        d3.select(tooltipRef.current).style("opacity", 0);
      });
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        backgroundColor: 'background.paper',
        borderRadius: 2,
        position: 'relative',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Bitcoin Price Analysis
      </Typography>
      <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 2 }}>
        Historical Performance (2014-2024)
      </Typography>
      <Box
        ref={chartRef}
        sx={{
          backgroundColor: 'background.default',
          borderRadius: 2,
          p: 2,
          position: 'relative',
        }}
      />
      <Box
        ref={tooltipRef}
        sx={{
          position: 'absolute',
          backgroundColor: 'rgba(44, 62, 80, 0.9)',
          color: 'white',
          p: 1.5,
          borderRadius: 2,
          fontSize: '0.875rem',
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.2s',
          zIndex: 10,
        }}
      />
    </Paper>
  );
};

export default BitcoinPriceChart;
