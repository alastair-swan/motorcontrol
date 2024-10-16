"use client"

import { useEffect, useState } from "react"
import { sliderComponentProps,RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Slider } from '@mui/material'

// SINK
export function GateSinkCurrentSlider ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: sliderComponentProps){
    const switchText = () => {
        return state.SINK
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Transistor Gate Sink Current {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={ state.SINK }
                    min={0} 
                    max={7}
                    step={1}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setState({
                                ...state,
                                SINK: newValue
                            })
                            UpdateParam(motorNumber, RegisterList.SINK.command, newValue)
                        }
                    }}
                    valueLabelFormat={(value: number) => {
                        const current = [20, 27.8, 38.6, 53.7, 74.6, 103.6, 143.9, 200]
                        return current[value] + 'mA'
                    }}
                />
            </Box>
        </Grid2>
    )
}
