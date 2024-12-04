import React, { useEffect, useRef } from 'react';
import { Paper, Typography, Box } from '@mui/material';
import * as d3 from 'd3';
import { housingData, HousingDataPoint } from '../../data/housingData';

const HousingMarketChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current || !tooltipRef.current) return;

    const margin = { top: 20, right: 20, bottom: 70, left: 60 };
    const width = 840 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    d3.select(chartRef.current).select('svg').remove();

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr(
        'viewBox',
        `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`
      )
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Stack the data
    const keys = ['purchased', 'sold'] as const;

    const color = d3.scaleOrdinal()
      .domain(keys)
      .range(['#3498db', '#e74c3c']);

    const stackedData = d3.stack<HousingDataPoint>().keys(keys)(housingData);

    const x = d3
      .scaleBand()
      .domain(housingData.map((d) => d.state))
      .range([0, width])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(housingData, (d) => d.purchased + d.sold)!])
      .nice()
      .range([height, 0]);

    // Draw the bars
    svg
      .selectAll('g')
      .data(stackedData)
      .enter()
      .append('g')
      .attr('fill', (d) => color(d.key) as string)
      .selectAll('rect')
      .data((d) => d)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.data.state)!)
      .attr('y', (d) => y(d[1]))
      .attr('height', (d) => y(d[0]) - y(d[1]))
      .attr('width', x.bandwidth())
      .on('mouseover', function (event, d) {
        const [mouseX, mouseY] = d3.pointer(event);

        // Explicitly cast this.parentNode to the correct type
        const parentGroup = d3.select(this.parentNode as SVGGElement);
        const parentDatum = parentGroup.datum() as d3.Series<HousingDataPoint, keyof HousingDataPoint>;

        const key = parentDatum.key as string;
        const value = d[1] - d[0];
        d3.select(tooltipRef.current)
          .style('opacity', 1)
          .html(`<strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${value.toLocaleString()}`)
          .style('left', `${mouseX + margin.left + 15}px`)
          .style('top', `${mouseY + margin.top - 30}px`);
      })
      .on('mouseout', function () {
        d3.select(tooltipRef.current).style('opacity', 0);
      });

    // Add X axis
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('class', 'text-xs text-gray-500')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    // Add Y axis
    svg
      .append('g')
      .call(d3.axisLeft(y).tickFormat(d3.format('.2s')))
      .selectAll('text')
      .attr('class', 'text-xs text-gray-500');

    // Add Legend
    const legend = svg
      .append('g')
      .attr('transform', `translate(${width - 100}, 10)`);

    legend
      .selectAll('rect')
      .data(keys)
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('y', (_, i) => i * 20)
      .attr('width', 15)
      .attr('height', 15)
      .attr('fill', (d) => color(d) as string);

    legend
      .selectAll('text')
      .data(keys)
      .enter()
      .append('text')
      .attr('x', 20)
      .attr('y', (_, i) => i * 20 + 12)
      .text((d) => d.charAt(0).toUpperCase() + d.slice(1))
      .attr('font-size', '12px')
      .attr('fill', 'black');
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
        Housing Market Analysis by State in 2023
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

export default HousingMarketChart;
