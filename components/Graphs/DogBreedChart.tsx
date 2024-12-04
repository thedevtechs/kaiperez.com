// components/DogBreedChart.tsx

import React, { useEffect, useRef } from 'react';
import { Paper, Typography, Box } from '@mui/material';
import * as d3 from 'd3';
import { dogBreedData, DogBreedData } from '../../data/dogBreedData';

const DogBreedChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const legendRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current || !tooltipRef.current || !legendRef.current) return;

    const width = 600;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    const modernPalette = [
      '#3498db',
      '#2ecc71',
      '#e74c3c',
      '#f39c12',
      '#9b59b6',
      '#1abc9c',
      '#34495e',
      '#7f8c8d',
    ];

    d3.select(chartRef.current).select('svg').remove();
    d3.select(legendRef.current).selectAll('*').remove();

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const colorScale = d3.scaleOrdinal<string>().domain(dogBreedData.map((d) => d.breed)).range(modernPalette);

    const pie = d3.pie<DogBreedData>().value((d) => d.percentage)(dogBreedData);

    const baseArc = d3
      .arc<d3.PieArcDatum<DogBreedData>>()
      .innerRadius(radius * 0.3)
      .outerRadius(radius * 0.7);

    const expandedArc = d3
      .arc<d3.PieArcDatum<DogBreedData>>()
      .innerRadius(radius * 0.3)
      .outerRadius(radius * 0.85);

    svg
      .selectAll('path')
      .data(pie)
      .enter()
      .append('path')
      .attr('d', baseArc)
      .attr('fill', (d) => colorScale(d.data.breed) as string)
      .attr('stroke', 'white')
      .attr('stroke-width', 2)
      .on('mouseover', function (event, d) {
        d3.select(this).transition().duration(200).attr('d', expandedArc);

        const [mouseX, mouseY] = d3.pointer(event);

        d3.select(tooltipRef.current)
          .style('opacity', 1)
          .html(`<strong>${d.data.breed}</strong><br>${d.data.percentage}%`)
          .style('left', `${mouseX + width / 2 + 15}px`)
          .style('top', `${mouseY + height / 2 - 30}px`);
      })
      .on('mouseout', function () {
        d3.select(this).transition().duration(200).attr('d', baseArc);

        d3.select(tooltipRef.current).style('opacity', 0);
      });

    svg
      .selectAll('text.static-label')
      .data(pie)
      .enter()
      .append('text')
      .attr('class', 'static-label')
      .attr('transform', (d) => {
        const centroid = baseArc.centroid(d);
        return d.data.percentage < 5
          ? `translate(${centroid[0] * 1.5}, ${centroid[1] * 1.5})`
          : `translate(${centroid[0]}, ${centroid[1]})`;
      })
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', 'white')
      .text((d) => `${d.data.percentage}%`);

    // Create Legend
    d3.select(legendRef.current)
      .selectAll('.legend-item')
      .data(dogBreedData)
      .enter()
      .append('div')
      .style('display', 'flex')
      .style('align-items', 'center')
      .style('margin', '5px 10px')
      .style('font-size', '12px')
      .html(
        (d) => `
          <div style="
            width: 15px; 
            height: 15px; 
            margin-right: 8px; 
            border-radius: 3px; 
            background-color: ${colorScale(d.breed)}
          "></div>
          ${d.breed} (${d.percentage}%)
        `
      );
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
        Dog Breed Ownership in the United States
      </Typography>
      <Box
        ref={chartRef}
        sx={{
          backgroundColor: 'background.default',
          borderRadius: 2,
          display: 'flex',
          justifyContent: 'center',
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
      <Box
        ref={legendRef}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          mt: 2,
        }}
      />
    </Paper>
  );
};

export default DogBreedChart;
