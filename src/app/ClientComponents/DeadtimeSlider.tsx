"use client"

import { useEffect, useState } from "react"
import { sliderComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Slider } from '@mui/material'

// DEADTIME
export function DeadtimeSlider ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: sliderComponentProps){
    const switchText = () => {
        return state.DEADTIME
    }
    return (
        <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
            Dead Time Setting {switchText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={state.DEADTIME}
                min={0} 
                max={3}
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            DEADTIME: newValue
                        })
                        UpdateParam(motorNumber, RegisterList.DEADTIME.command, newValue)
                    }
                }}
                valueLabelFormat={(value: number) => {
                    const time = ['250ns', '500ns', '1000ns', '1500ns']
                    return time[value]
                }}
            /> 
        </Box>
    )
}