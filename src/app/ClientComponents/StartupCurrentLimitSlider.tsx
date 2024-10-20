"use client"

import { sliderComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { shuntResistor } from "./helper"
import { componentStyle } from "../UIStyle"

// STARTCURRENT
export function StartupCurrentLimitSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
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
        <Box sx={ frameStyle }>
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
    )
}
