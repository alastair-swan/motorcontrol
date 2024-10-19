"use client"

import { useEffect, useState } from "react"
import { sliderComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Slider } from '@mui/material'

// KP
export function KPSlider ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: sliderComponentProps){
    const sliderScale = (value: number) => { return (state.KPX ? value * 0.08 * 8 : value * 0.08) }
    const sliderFormat = (value: number) => {
        return value.toFixed(2)
    }
    const switchText = () => {
        return sliderFormat(sliderScale(state.KP))
    }
    return (
        <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
            I coefficient: {switchText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.KP }
                min={0} 
                max={127}
                step={1}
                scale={sliderScale}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            KP: newValue
                        })  
                        UpdateParam(motorNumber, RegisterList.KP.command, newValue)
                    }
                }}
                valueLabelFormat={sliderFormat}
            />
        </Box>
    )
}