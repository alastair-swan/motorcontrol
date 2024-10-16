"use client"

import { useEffect, useState } from "react"
import { sliderComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Slider } from '@mui/material'
import { shuntResistor } from "./helper"

// STARTCURRENT
export function StartupCurrentLimitSlider ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: sliderComponentProps){
    const sliderFormat = (value: number) => {
        const steps = (index: number) : number => { 
            const stepValues = [0, 0.3, 0.4, 0.5] as number[]
            return ((typeof(stepValues[index]) === 'number') ? stepValues[index] : 0) as number
        }
        return (steps(value) * ((state.OCP_LVL ? 0.125 : 0.25) / shuntResistor)) + " Amps"
    }
    const sliderScale = (value: number) => { 
        return (((8 - value) / 8) * (state.OCP_LVL ? 0.125 : 0.25)) / shuntResistor; 
    }
    const switchText = () => {
        return sliderFormat(sliderScale(state.STARTCURRENT))
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Startup Current Limit: {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={ state.STARTCURRENT }
                    min={0} 
                    max={7}
                    step={1}
                    scale={sliderScale}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setState({
                                ...state,
                                STARTCURRENT: newValue
                            })  
                            UpdateParam(motorNumber, RegisterList.STARTCURRENT.command, newValue)
                        }
                    }}
                    valueLabelFormat={sliderFormat}
                /> 
            </Box>
        </Grid2>
    )
}
