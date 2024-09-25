"use client"

import Box from '@mui/material/Box'
import * as d3 from "d3"
import { GetParam } from './MotorControl'
import { Suspense, useEffect, useState } from 'react'
import { RegisterList } from './ClientComponents'

type graphPoint = { x: number, y: number }

export default async function DutyCurve({
    motorNumber
}: {
    motorNumber: number
}){
    /*
    
    */
    const [graphData, setGraphData] = useState<{ x: number, y: number }[]>(
        [
            { x: 0, y: 0 } as graphPoint
        ]
    )
    useEffect(
        () => {
            const fetchData = async () => {
                try{
                    const localstartduty = await GetParam(motorNumber, 'STARTDUTY') / 5.12
                    const localstopduty = await GetParam(motorNumber, 'STOPDUTY') / 2.56
                    const localstartrpm = await GetParam(motorNumber, 'STARTRPM')
                    const localchangeduty = await GetParam(motorNumber, 'CHANGEDUTY') * 2 / 5.12
                    const localchangerpm = localstartrpm + (await GetParam(motorNumber, 'SPEEDSLOP') * 0.08 * (localchangeduty - localstopduty))
                    const localmaxduty = (await GetParam(motorNumber, 'MAXDUTY') + 257) / 5.12
                    const localmaxrpm = localchangerpm + (await GetParam(motorNumber, 'SPEEDSLOP2') * 0.08 * (localmaxduty - localchangeduty))
                    const result = [
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
                    setGraphData(result)
                }
                catch (error){
                    console.error('Fetches failed for Graph: ', error)
                }
            }
            fetchData()
        }, [ motorNumber ]
    )
    /*
    
    */
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