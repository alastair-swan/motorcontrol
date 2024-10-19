"use client"

import { useEffect, useState } from "react"
import { sliderComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Slider } from '@mui/material'
import { asPercentage } from "./helper"

// SPD
export function MotorDutySlider ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: sliderComponentProps){
    const switchText = () => {
        return state.SPD
    }

    return (
        <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
            Motor Duty Setting {switchText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={state.SPD}
                min={0} 
                max={511}
                step={1}
                scale={(value: number) => { return value }}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state, 
                            SPD: newValue}
                        )  
                        UpdateParam(motorNumber, RegisterList.SPD.command, newValue)
                    }
                }}
                valueLabelFormat={(value: number) => {
                    return asPercentage(value / 511)
                }}
            />
        </Box>
    )
}
