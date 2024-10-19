"use client"

import { useEffect, useState } from "react"
import { sliderComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Slider } from '@mui/material'

// SOURCE
export function GateSourceCurrentSlider ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: sliderComponentProps){
    const switchText = () => {
        return state.SOURCE
    }
    return (
        <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
            Transistor Gate Source Current {switchText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.SOURCE }
                min={0} 
                max={7}
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            SOURCE: newValue
                        })
                        UpdateParam(motorNumber, RegisterList.SOURCE.command, newValue)
                    }
                }}
                valueLabelFormat={(value: number) => {
                    const frequency = [10, 13.9, 19.3, 26.8, 37.3, 51.8, 72, 100]
                    return frequency[value] + 'mA'
                }}
            /> 
        </Box>
    )
}