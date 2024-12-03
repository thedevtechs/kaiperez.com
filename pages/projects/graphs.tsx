import React, { useEffect, useRef } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  useTheme, 
  useMediaQuery 
} from '@mui/material';
import Head from 'next/head';
import * as d3 from 'd3';

// Define data types
type BitcoinDataPoint = {
  date: Date;
  price: number;
};

const BitcoinPriceChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current || !tooltipRef.current) return;

    const bitcoinData: BitcoinDataPoint[] = [
      {date: new Date(2014, 0, 1), price: 320},
      {date: new Date(2015, 0, 1), price: 280},
      {date: new Date(2016, 0, 1), price: 430},
      {date: new Date(2017, 0, 1), price: 960},
      {date: new Date(2018, 0, 1), price: 13000},
      {date: new Date(2019, 0, 1), price: 3800},
      {date: new Date(2020, 0, 1), price: 7300},
      {date: new Date(2021, 0, 1), price: 29000},
      {date: new Date(2022, 0, 1), price: 47000},
      {date: new Date(2023, 0, 1), price: 42000},
      {date: new Date(2024, 0, 1), price: 52000}
    ];

    const margin = {top: 20, right: 20, bottom: 50, left: 80};
    const width = 840;
    const height = 400;

    d3.select(chartRef.current).select("svg").remove();

    const svg = d3.select(chartRef.current)
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime()
      .domain(d3.extent(bitcoinData, d => d.date) as [Date, Date])
      .range([0, width - margin.left - margin.right]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(bitcoinData, d => d.price)!])
      .range([height - margin.top - margin.bottom, 0]);

    const line = d3.line<BitcoinDataPoint>()
      .x(d => x(d.date))
      .y(d => y(d.price));

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("class", "text-xs text-gray-500");

    svg.append("g")
      .call(d3.axisLeft(y).tickFormat(d => `$${(d as number).toLocaleString()}`))
      .selectAll("text")
      .attr("class", "text-xs text-gray-500");

    svg.append("path")
      .datum(bitcoinData)
      .attr("fill", "none")
      .attr("stroke", "#3498db")
      .attr("stroke-width", 3)
      .attr("d", line);

    svg.selectAll(".dot")
      .data(bitcoinData)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("cx", d => x(d.date))
      .attr("cy", d => y(d.price))
      .attr("r", 5)
      .attr("fill", "#e74c3c")
      .on("mouseover", function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", 8);

        // Position tooltip near the data point
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
      .on("mouseout", function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", 5);
        
        d3.select(tooltipRef.current)
          .style("opacity", 0);
      });
  }, []);

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        backgroundColor: 'background.paper', 
        borderRadius: 2,
        position: 'relative'
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
          position: 'relative'
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
          zIndex: 10
        }}
      />
    </Paper>
  );
};

type DogBreedData = {
  breed: string;
  percentage: number;
};

const DogBreedChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const legendRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current || !tooltipRef.current || !legendRef.current) return;

    const data: DogBreedData[] = [
      {breed: "Labrador Retriever", percentage: 13.5},
      {breed: "German Shepherd", percentage: 6.4},
      {breed: "Golden Retriever", percentage: 5.6},
      {breed: "French Bulldog", percentage: 4.7},
      {breed: "Bulldog", percentage: 4.2},
      {breed: "Poodle", percentage: 3.8},
      {breed: "Beagle", percentage: 3.6},
      {breed: "Other Breeds", percentage: 58.2}
    ];

    const width = 600;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    const modernPalette = [
      "#3498db", "#2ecc71", "#e74c3c", 
      "#f39c12", "#9b59b6", "#1abc9c", 
      "#34495e", "#7f8c8d"
    ];

    d3.select(chartRef.current).select("svg").remove();
    d3.select(legendRef.current).selectAll("*").remove();

    const svg = d3.select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width/2},${height/2})`);

    const colorScale = d3.scaleOrdinal<string>()
      .domain(data.map(d => d.breed))
      .range(modernPalette);

    const pie = d3.pie<DogBreedData>().value(d => d.percentage)(data);

    const baseArc = d3.arc<d3.PieArcDatum<DogBreedData>>()
      .innerRadius(radius * 0.3)
      .outerRadius(radius * 0.7);

    const expandedArc = d3.arc<d3.PieArcDatum<DogBreedData>>()
      .innerRadius(radius * 0.3)
      .outerRadius(radius * 0.85);

    svg.selectAll("path")
      .data(pie)
      .enter()
      .append("path")
      .attr("d", baseArc)
      .attr("fill", d => colorScale(d.data.breed) as string)
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .on("mouseover", function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("d", expandedArc);

        // Adjust tooltip positioning relative to the chart
        const [mouseX, mouseY] = d3.pointer(event);

        d3.select(tooltipRef.current)
          .style("opacity", 1)
          .html(`<strong>${d.data.breed}</strong><br>${d.data.percentage}%`)
          .style("left", `${mouseX + width / 2 + 15}px`)
          .style("top", `${mouseY + height / 2 - 30}px`);
      })
      .on("mouseout", function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("d", baseArc);

        d3.select(tooltipRef.current)
          .style("opacity", 0);
      });

    svg.selectAll("text.static-label")
      .data(pie)
      .enter()
      .append("text")
      .attr("class", "static-label")
      .attr("transform", d => `translate(${baseArc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("fill", "white")
      .text(d => d.data.percentage > 5 ? `${d.data.percentage}%` : '');

    // Create Legend
    d3.select(legendRef.current)
      .selectAll(".legend-item")
      .data(data)
      .enter()
      .append("div")
      .style("display", "flex")
      .style("align-items", "center")
      .style("margin", "5px 10px")
      .style("font-size", "12px")
      .html(d => `
        <div style="
          width: 15px; 
          height: 15px; 
          margin-right: 8px; 
          border-radius: 3px; 
          background-color: ${colorScale(d.breed)}
        "></div>
        ${d.breed} (${d.percentage}%)
      `);
  }, []);

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        backgroundColor: 'background.paper', 
        borderRadius: 2,
        position: 'relative'
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
          position: 'relative'
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
          zIndex: 10
        }}
      />
      <Box 
        ref={legendRef} 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          flexWrap: 'wrap', 
          mt: 2 
        }}
      />
    </Paper>
  );
};

export default function DataDashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <Head>
        <title>Data Visualization Dashboard</title>
        <meta name="description" content="Interactive Data Visualizations" />
      </Head>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography 
              variant="h4" 
              component="h1" 
              gutterBottom 
              sx={{ textAlign: 'center' }}
            >
              Interactive Data Visualizations
            </Typography>
          </Grid>
          <Grid 
            item 
            xs={12} 
            md={12}
          >
            <BitcoinPriceChart />
          </Grid>
          <Grid 
            item 
            xs={12} 
            md={12}
          >
            <DogBreedChart />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
