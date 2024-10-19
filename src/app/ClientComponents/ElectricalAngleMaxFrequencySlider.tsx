"use client"

import { useEffect, useState } from "react"
import { sliderComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Slider } from '@mui/material'

// FMAX
export function ElectricalAngleMaxFrequencySlider ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: sliderComponentProps){
    const switchText = () => {
        return state.FMAX
    }
    return (
        <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
            Electrical Angle Frequency Mode {switchText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={state.FMAX}
                min={0} 
                max={3}
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            FMAX: newValue
                        })
                        UpdateParam(motorNumber, RegisterList.FMAX.command, newValue)
                    }
                }}
                valueLabelFormat={(value: number) => {
                    const frequency = ['0.75kHz', '1.5kHz', '3kHz', 'unlimited']
                    return frequency[value]
                }}
            /> 
        </Box>
    )
}