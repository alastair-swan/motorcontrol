"use client"

import Box from '@mui/material/Box'
import * as d3 from "d3"
import { MotorParams } from '../MotorControlClient'
import { CHANGEDUTY, FMAX, MAXDUTY, MAXSPEED, POLEPAIR, SPD, SPEEDSLOP, SPEEDSLOP2, STARTDUTY, STOPDUTY } from './Register'
import { errorStateColor, goodStateColor, warningStateColor } from '../UIStyle'

type graphPoint = { x: number, y: number }

export function DutyCurve({ state }: { motorNumber: number, state: MotorParams, setState: (motorState: MotorParams) => void, width: number}){
    const maxSpeed = (MAXSPEED.valuemap as Array<number>)[state.MAXSPEED] as number
    const startDuty = STARTDUTY.normalize(state.STARTDUTY)
    const stopDuty = STOPDUTY.normalize(state.STOPDUTY)
    const startRPM = state.STARTRPM
    const changeDuty = CHANGEDUTY.normalize(state.CHANGEDUTY)
    const changeRPM = startRPM + (SPEEDSLOP.normalize(state.SPEEDSLOP) * (changeDuty - stopDuty))
    const maxDuty = MAXDUTY.normalize(state.MAXDUTY)
    const maxDutyRPM = changeRPM + (SPEEDSLOP2.normalize(state.SPEEDSLOP2) * (maxDuty - changeDuty))
    const maxSpeedLimit = typeof(MAXSPEED.valuemap) === "undefined" ? -1 : MAXSPEED.valuemap[state.MAXSPEED] as number
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
            y: calc0DutySpeedSetting() / maxSpeed
        },
        {
            x: startDuty, 
            y: calc0DutySpeedSetting() / maxSpeed
        },
        {
            x: startDuty, 
            y: startRPM / maxSpeed
        },
        {
            x: stopDuty, 
            y: startRPM / maxSpeed
        },
        {
            x: changeDuty, 
            y: changeRPM / maxSpeed
        },
        {
            x: maxDuty, 
            y: maxDutyRPM / maxSpeed
        }
    ] as graphPoint[]

    const marginTop = 20
    const marginRight = 20
    const marginBottom = 30
    const marginLeft = 50
    const width = 600
    const height = 400

    const xAxis = d3.scaleLinear([0, 1], [marginLeft, width - marginRight])

    const yAxis = d3.scaleLinear([0, 1], [height - marginBottom, marginTop])

    const overSpeedLine = [
        {x: 0, y: (FMAX.valuemap as Array<number>)[state.FMAX] as number * 60 / POLEPAIR.normalize(state.POLEPAIR) / maxSpeed},
        {x: 1, y: (FMAX.valuemap as Array<number>)[state.FMAX] as number * 60 / POLEPAIR.normalize(state.POLEPAIR) / maxSpeed}
    ]
    const axisPoints = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
    const line = d3.line((d: {x: number, y:number}) => xAxis(d.x), (d: {x: number, y:number}) => yAxis(d.y))

    return (
        <Box
            sx={{
                width: {width},
                height: {height},
                backgroundColor: 'black',
            }}
        >
            <svg width={width} height={height}>
                <g fill="black" stroke="white">
                    <g>
                        <path fill="none" stroke="white" strokeWidth="1.5" d={line([{x:0, y:0},{x:0, y:1}]) as string} />
                        {
                            axisPoints.map((d) => (
                                <g fontSize="12" fontFamily="sans-serif" textAnchor="middle" fill="white">
                                    <path fill="none" stroke="white" strokeWidth="1.5" d={line([{x:d, y:0},{x:d, y:-0.02}]) as string} />
                                    <text dy={yAxis(-0.06)} dx={xAxis(d)}>{d * 100 + "%"}</text>
                                </g>
                            ))
                        }
                    </g>
                    <g>
                        <path fill="none" stroke="white" strokeWidth="1.5" d={line([{x:0, y:0},{x:1, y:0}]) as string} />
                        {
                            axisPoints.map((d) => (
                                <g font-size="12" fontFamily="sans-serif" textAnchor="end" fill="white">
                                    <path fill="none" stroke="white" strokeWidth="1.5" d={line([{x:0, y:d},{x:-0.01, y:d}]) as string} />
                                    <text dy={yAxis(d) + 4} dx={xAxis(-0.02)}>{(d * maxSpeed).toFixed(0)}</text>
                                </g>
                            ))
                        }
                    </g>
                </g>
                <path fill="none" stroke="white" strokeWidth="1.5" d={line(graphData) as string }/>
                <path fill="none" stroke={ warningStateColor } strokeWidth="1.5" d={line(overSpeedLine) as string }/>
                <g fill="black" stroke="white" strokeWidth="1.5">
                    {graphData.map((d, i) => (<circle key={i} cx={xAxis(d.x)} cy={yAxis(d.y)} r="2.5" />))}
                </g>
                <g fill="black" stroke={
                    Number.isNaN(state.hz_cnt) ? warningStateColor : 
                    state.OV_SPD || state.UD_SPD ? errorStateColor : 
                    goodStateColor } strokeWidth="1.5">
                    <circle cx={xAxis(SPD.normalize(state.SPD))} cy={yAxis( Number.isNaN(state.hz_cnt) ? 0 : state.hz_cnt )} r="2.5" />
                </g>
            </svg>
        </Box>
    )
}