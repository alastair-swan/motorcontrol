"use client"

import { sliderComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { shuntResistor } from "./helper"

// SS_ADD_SEL
export function SoftStartCurrentLimitSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const sliderFormat = (value: number) => {
        const steps = (index: number) : number => { return RegisterList.SS_ADD_SEL.valuemap[index] as number }
        return (steps(value) * ((state.OCP_LVL ? 0.125 : 0.25) / shuntResistor)) + " Amps"
    }
    const switchText = () => {
        return sliderFormat(state.SS_ADD_SEL)
    }
    return (
        <Box sx={ frameStyle }>
            Current Limit During Soft Start: {switchText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.SS_ADD_SEL }
                min={0} 
                max={3}
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            SS_ADD_SEL: newValue
                        })  
                        UpdateParam(motorNumber, RegisterList.SS_ADD_SEL.command, newValue)
                    }
                }}
                valueLabelFormat={sliderFormat}
            /> 
        </Box>
    )
}