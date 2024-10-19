"use client"

import { useEffect, useState } from "react"
import { sliderComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Slider } from '@mui/material'

// SPEEDSLOP2
export function SpeedSlope2Slider ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: sliderComponentProps){
    const switchText = () => {
        return sliderFormat(sliderScale(state.SPEEDSLOP2))
    }
    const sliderScale = (value: number) => { return value * 0.08 }
    const sliderFormat = (value: number) => {
        return Math.round(value * 100) / 100 + " RPM/%"
    }
    return (
        <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
            Speed Slope Above Inflection Point: {switchText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.SPEEDSLOP2 }
                min={0} 
                max={16383}
                step={1}
                scale={(value: number) => { return value * 0.08 }}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            SPEEDSLOP2: newValue
                        })  
                        UpdateParam(motorNumber, RegisterList.SPEEDSLOP2.command, newValue)
                    }
                }}
                valueLabelFormat={sliderFormat}
            /> 
        </Box>
    )
}