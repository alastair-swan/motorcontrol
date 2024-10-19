"use client"

import { useEffect, useState } from "react"
import { asPercentage } from "./helper"
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Slider } from '@mui/material'
import { sliderComponentProps, RegisterList } from "."

// CHANGEDUTY
export function ChangeDutySlider ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: sliderComponentProps){
    const switchText = () => {
        return state.CHANGEDUTY
    }
    const sliderScale = (value: number) => { return ((value * 2)/512) }
    return (
        <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
            Motor Slope Inflection Point: {asPercentage(sliderScale(switchText()))}
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.CHANGEDUTY }
                min={0} 
                max={255}
                step={1}
                scale={sliderScale}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            CHANGEDUTY: newValue
                        })  
                        UpdateParam(motorNumber, RegisterList.CHANGEDUTY.command, newValue)
                    }
                }}
                valueLabelFormat={(value: number) => {
                    if (value != 0) { 
                        return asPercentage(value)
                    }
                    else { 
                        return "Not Used"
                    }
                }}
            /> 
        </Box>
    )
}