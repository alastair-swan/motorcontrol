"use client"

import { useEffect, useState } from "react"
import { sliderComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Slider } from '@mui/material'

// WAIT_TIME
export function BrakeTimeSlider ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: sliderComponentProps){
    const switchText = () => {
        return state.WAIT_TIME
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Brake Time {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={state.WAIT_TIME}
                    min={0} 
                    max={3}
                    step={1}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setState({
                                ...state,
                                WAIT_TIME: newValue
                            })
                            UpdateParam(motorNumber, RegisterList.WAIT_TIME.command, newValue)
                        }
                    }}
                    valueLabelFormat={(value: number) => {
                        return value + " seconds"
                    }}
                />
            </Box>
        </Grid2> 
    )
}