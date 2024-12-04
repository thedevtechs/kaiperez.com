// components/IncomeVsLifeExpectancyChart.tsx

import React, { useEffect, useRef } from 'react';
import { Paper, Typography, Box } from '@mui/material';
import * as d3 from 'd3';
import { incomeLifeExpectancyData, CountryDataPoint } from '../../data/incomeLifeExpectancyData';

const IncomeVsLifeExpectancyChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current || !tooltipRef.current) return;

    const margin = { top: 20, right: 120, bottom: 70, left: 70 };
    const width = 840 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

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

    // X scale (GDP per capita)
    const x = d3
      .scaleLog()
      .domain([1000, d3.max(incomeLifeExpectancyData, (d) => d.income)! * 1.1])
      .range([0, width]);

    // Y scale (Life Expectancy)
    const y = d3
      .scaleLinear()
      .domain([40, d3.max(incomeLifeExpectancyData, (d) => d.lifeExpectancy)! * 1.05])
      .range([height, 0]);

    // Color scale (Region)
    const color = d3
      .scaleOrdinal<string>()
      .domain(Array.from(new Set(incomeLifeExpectancyData.map((d) => d.region))))
      .range(d3.schemeTableau10);

    // Size scale (Population)
    const size = d3
      .scaleSqrt()
      .domain([0, d3.max(incomeLifeExpectancyData, (d) => d.population)!])
      .range([5, 30]);

    // Add gridlines
    const gridlines = svg.append('g');
    gridlines
      .selectAll('line.horizontal')
      .data(y.ticks())
      .enter()
      .append('line')
      .attr('class', 'gridline')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', (d) => y(d))
      .attr('y2', (d) => y(d))
      .attr('stroke', '#e0e0e0')
      .attr('stroke-dasharray', '3 3');

    gridlines
      .selectAll('line.vertical')
      .data(x.ticks())
      .enter()
      .append('line')
      .attr('class', 'gridline')
      .attr('x1', (d) => x(d))
      .attr('x2', (d) => x(d))
      .attr('y1', 0)
      .attr('y2', height)
      .attr('stroke', '#e0e0e0')
      .attr('stroke-dasharray', '3 3');

    // Add X axis
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(10, '~s')
          .tickFormat((d) => `$${d3.format('.2s')(d as number)}`)
      )
      .selectAll('text')
      .attr('font-size', '12px')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    // X axis label
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', height + 50)
      .attr('text-anchor', 'middle')
      .attr('font-size', '14px')
      .text('GDP per Capita (USD)');

    // Add Y axis
    svg
      .append('g')
      .call(d3.axisLeft(y).ticks(10))
      .selectAll('text')
      .attr('font-size', '12px');

    // Y axis label
    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', -50)
      .attr('text-anchor', 'middle')
      .attr('font-size', '14px')
      .text('Life Expectancy (Years)');

    // Add dots
    svg
      .selectAll('circle')
      .data(incomeLifeExpectancyData)
      .enter()
      .append('circle')
      .attr('cx', (d) => x(d.income))
      .attr('cy', (d) => y(d.lifeExpectancy))
      .attr('r', (d) => size(d.population))
      .attr('fill', (d) => color(d.region) as string)
      .attr('stroke', 'black')
      .attr('stroke-width', 0.5)
      .attr('opacity', 0.8)
      .on('mouseover', function (event, d) {
        const [mouseX, mouseY] = d3.pointer(event);

        d3.select(tooltipRef.current)
          .style('opacity', 1)
          .html(`
            <strong>${d.country}</strong><br>
            GDP per Capita: $${d.income.toLocaleString()}<br>
            Life Expectancy: ${d.lifeExpectancy} years<br>
            Population: ${d.population.toLocaleString()}
          `)
          .style('left', `${mouseX + 20}px`)
          .style('top', `${mouseY}px`);
      })
      .on('mouseout', function () {
        d3.select(tooltipRef.current).style('opacity', 0);
      });

    // Legend for regions
    const legend = svg
      .selectAll('.legend')
      .data(Array.from(new Set(incomeLifeExpectancyData.map((d) => d.region))))
      .enter()
      .append('g')
      .attr('transform', (_, i) => `translate(${width + 10},${i * 25})`);

    legend
      .append('rect')
      .attr('x', 0)
      .attr('y', 5)
      .attr('width', 15)
      .attr('height', 15)
      .attr('fill', (d) => color(d) as string);

    legend
      .append('text')
      .attr('x', 20)
      .attr('y', 17)
      .attr('font-size', '12px')
      .text((d) => d);

    // Legend for size
    const sizeLegendValues = [1_000_000, 100_000_000, 1_000_000_000];
    const sizeLegend = svg
      .append('g')
      .attr('transform', `translate(${width + 10},${250})`);

    sizeLegendValues.forEach((value, index) => {
      sizeLegend
        .append('circle')
        .attr('cx', 10)
        .attr('cy', index * 40)
        .attr('r', size(value))
        .attr('fill', 'none')
        .attr('stroke', 'black');

      sizeLegend
        .append('text')
        .attr('x', 25)
        .attr('y', index * 40 + 5)
        .attr('font-size', '12px')
        .text(`${d3.format('.2s')(value)}`);
    });

    sizeLegend
      .append('text')
      .attr('x', 10)
      .attr('y', sizeLegendValues.length * 40 + 20)
      .attr('font-size', '12px')
      .text('Population');
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, position: 'relative' }}>
      <Typography variant="h5" gutterBottom>
        GDP per Capita vs. Life Expectancy
      </Typography>
      <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 2 }}>
        Exploring the Relationship Between Wealth and Health
      </Typography>
      <Box ref={chartRef} sx={{ position: 'relative' }} />
      <Box
        ref={tooltipRef}
        sx={{
          position: 'absolute',
          backgroundColor: 'rgba(44, 62, 80, 0.9)',
          color: 'white',
          padding: '10px',
          borderRadius: '4px',
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.2s',
          zIndex: 10,
        }}
      />
    </Paper>
  );
};

export default IncomeVsLifeExpectancyChart;
