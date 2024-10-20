"use client"

import { sliderComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { shuntResistor } from "./helper"

// SS_UP_SEL
export function SoftStartCurrentStepSizeSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const sliderScale = (value: number) => {
        const steps = (index: number) : number => { 
            return RegisterList.SS_UP_SEL.valuemap[index] as number
        }
        return steps(value) * ((state.OCP_LVL ? 0.125 : 0.25) / shuntResistor) 
    }
    const sliderFormat = (value: number) => { return value.toFixed(1) + ' Amps' }
    const switchText = () => {
        return sliderFormat(sliderScale(state.SS_UP_SEL))
    }
    return (
        <Box sx={ frameStyle }>
            Soft Start Current Step Size: {switchText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.SS_UP_SEL }
                min={0} 
                max={3}
                step={1}
                scale={sliderScale}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            SS_UP_SEL: newValue
                        })  
                        UpdateParam(motorNumber, RegisterList.SS_UP_SEL.command, newValue)
                    }
                }}
                valueLabelFormat={sliderFormat}
            /> 
        </Box>
    )
}