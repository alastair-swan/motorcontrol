"use client"

import Box from '@mui/material/Box'
import * as d3 from "d3"
import { MotorParams } from '../MotorControlClient'
import { RegisterList } from '.'

type graphPoint = { x: number, y: number }

export function DutyCurve({ state, width }: { motorNumber: number, state: MotorParams, setState: (motorState: MotorParams) => void, width: number}){
    const startDuty = state.STARTDUTY / 5.12
    const stopDuty = state.STOPDUTY / 2.56
    const startRPM = state.STARTRPM
    const changeDuty = state.CHANGEDUTY * 2 / 5.12
    const changeRPM = startRPM + (state.SPEEDSLOP * 0.08 * (changeDuty - stopDuty))
    const maxDuty = (state.MAXDUTY + 257) / 5.12
    const maxDutyRPM = changeRPM + (state.SPEEDSLOP2 * 0.08 * (maxDuty - changeDuty))
    const maxSpeedLimit = RegisterList.MAXSPEED.valuemap[state.MAXSPEED] as number
    const calc0DutySpeedSetting = () => (
        state.MAXOPEN ? (
            state.NOSTOP ? (
                state.MAXOFF ? 
                    maxSpeedLimit : 
                    startRPM
            ) :
            (
                state.MAXOFF ? 
                    maxSpeedLimit : 
                    0
            )
        ) :
        (
            state.NOSTOP ? (
                state.MAXOFF ? 
                    maxSpeedLimit : 
                    startRPM
            ) :
            (
                state.MAXOFF ? 
                    maxSpeedLimit : 
                    0
            )
        )
    )
    const graphData = [
        {
            x: 0,
            y: calc0DutySpeedSetting()
        },
        {
            x: startDuty, 
            y: calc0DutySpeedSetting()
        },
        {
            x: startDuty, 
            y: startRPM
        },
        {
            x: stopDuty, 
            y: startRPM
        },
        {
            x: changeDuty, 
            y: changeRPM
        },
        {
            x: maxDuty, 
            y: maxDutyRPM
        }
    ] as graphPoint[]
    //const [graphData, setGraphData] = useState<{ x: number, y: number }[]>(getGraphData())
    //const getGraphDataEffect = (): void => {setGraphData(getGraphData())}
    //useEffect(getGraphDataEffect, [])
    return (
        <Box
            sx={{
                width: {width},
                height: 400,
                backgroundColor: '#FFFFFF'
            }}
        >
            <Graph data={graphData} maxX={RegisterList.MAXSPEED.valuemap[state.MAXSPEED] as number} width={width}/>
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
    marginLeft = 40,
    maxX
}: {
    data: Array<{x: number, y:number}>,
    width?: number,
    height?: number,
    marginTop?: number,
    marginRight?: number,
    marginBottom?: number,
    marginLeft?: number,
    maxX: number
}) {
    const xAxis = d3.scaleLinear([0,100], [marginLeft, width - marginRight])

    const yAxis = d3.scaleLinear([0, maxX], [height - marginBottom, marginTop]);

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