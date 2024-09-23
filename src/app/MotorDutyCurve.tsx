"use client"

import Box from '@mui/material/Box'
import * as d3 from "d3"

export default function DutyCurve(props: any){
    return (
        <Box
            sx={{
                width: 400,
                height: 400,
                backgroundColor: '#FFFFFF'
            }}
        >

        </Box>
    )
}

function Graph(){
    const width = 400
    const height = 400
    const marginTop = 20
    const marginRight = 20
    const marginBottom = 30
    const marginLeft = 40

    const xAxis = d3.scaleLinear()
        .domain([0, 100])
        .range([marginLeft, width - marginRight])

    const yAxis = d3.scaleLinear()
        .domain([0, 100]) // change to be a dynaimcally adjusting range from 0 to maxRPM
        .range([height - marginBottom, marginTop])

    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)

    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(xAxis));
  
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(yAxis));
  
    return (
        <svg width={width} height={height}>
            <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data)} />
            <g fill="white" stroke="currentColor" strokeWidth="1.5">
            {
                data.map((d, i) => (<circle key={i} cx={x(i)} cy={y(d)} r="2.5" />))
            }
      </g>
    </svg>
    )
}