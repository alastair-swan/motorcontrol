"use server"

import Box from '@mui/material/Box'
import * as d3 from "d3"
import { GetParam } from './MotorControl'
import { Suspense } from 'react'

export default async function DutyCurve({
    motorNumber
}: {
    motorNumber: number
}){
    let localstartduty = await GetParam(motorNumber, 'STARTDUTY') / 5.12
    let localstopduty = await GetParam(motorNumber, 'STOPDUTY') / 2.56
    let localstartrpm = await GetParam(motorNumber, 'STARTRPM')
    let localchangeduty = await GetParam(motorNumber, 'CHANGEDUTY') * 2 / 5.12
    let localchangerpm = localstartrpm + (await GetParam(motorNumber, 'SPEEDSLOP') * 0.08 * (localchangeduty - localstopduty))
    let localmaxduty = (await GetParam(motorNumber, 'MAXDUTY') + 257) / 5.12
    let localmaxrpm = localchangerpm + (await GetParam(motorNumber, 'SPEEDSLOP2') * 0.08 * (localmaxduty - localchangeduty))
    const graphData = 
    [
        {
            x: localstartduty, 
            y: 0
        },
        {
            x: localstartduty, 
            y: localstartrpm
        },
        {
            x: localstopduty, 
            y: localstartrpm
        },
        {
            x: localchangeduty, 
            y: localchangerpm
        },
        {
            x: localmaxduty, 
            y: localmaxrpm
        }
    ]

    return (
        <Box
            sx={{
                width: 400,
                height: 400,
                backgroundColor: '#FFFFFF'
            }}
        >
            <Suspense>
                <Graph data={graphData}/>
            </Suspense>
        </Box>
    )
}

function Graph({    
    data,
    width = 400,
    height = 400,
    marginTop = 20,
    marginRight = 20,
    marginBottom = 30,
    marginLeft = 40
}: {
    data: Array<{x: number, y:number}>,
    width?: number,
    height?: number,
    marginTop?: number,
    marginRight?: number,
    marginBottom?: number,
    marginLeft?: number
}) {
    const xAxis = d3.scaleLinear([0,100], [marginLeft, width - marginRight])

    const yAxis = d3.scaleLinear([0, 20000], [height - marginBottom, marginTop]);

    const line = d3.line((d: {x: number, y:number}) => xAxis(d.x), (d: {x: number, y:number}) => yAxis(d.y));

    const points = data.map((d, i) => {
        return (
            <circle
                key={i}
                r={2}
                cx={xAxis(d.x)}
                cy={yAxis(d.y)}
            />
        )
    })
    return (
        <svg width={width} height={height}>
            <path fill="none" stroke="#000000" strokeWidth="1.5" d={line(data) as string}/>
                <g fill="white" stroke="#000000" strokeWidth="1.5">
                    {data.map((d, i) => (<circle key={i} cx={xAxis(d.x)} cy={yAxis(d.y)} r="2.5" />))}
                </g>
            </svg>
    )
}