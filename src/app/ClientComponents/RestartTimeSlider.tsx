"use client"

import { useEffect, useState } from "react"
import { sliderComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Slider } from '@mui/material'

// TRE
export function RestartTimeSlider ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: sliderComponentProps){
    const sliderFormat = (value: number) => {
        const time = [0, 0.5, 1, 1.5, 2, 4, 7, 10]
        return time[value] + " seconds"
    }
    const switchText = () => {
        return sliderFormat(state.TRE)
    }
    return (
        <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
            Auto Restart Time: {switchText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.TRE }
                min={0} 
                max={7}
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            TRE: newValue
                        })  
                        UpdateParam(motorNumber, RegisterList.TRE.command, newValue)
                    }
                }}
                valueLabelFormat={sliderFormat}
            /> 
        </Box>
    )
}