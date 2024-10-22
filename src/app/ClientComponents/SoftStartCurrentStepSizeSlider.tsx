"use client"

import { sliderComponentProps } from "."
import { UpdateParam } from "../MotorControlClient"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { shuntResistor } from "./helper"
import { SS_UP_SEL } from "./Register"

// SS_UP_SEL
export function SoftStartCurrentStepSizeSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const sliderScale = (value: number) => {
        if (typeof(SS_UP_SEL.valuemap) === 'undefined'){
            console.error("Data error: SS_UP_SEL.valuemap undefined")
            return value
        }
        else {
            return SS_UP_SEL.valuemap[value] as number * ((state.OCP_LVL ? 0.125 : 0.25) / shuntResistor) 
        }
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
                min={ SS_UP_SEL.min } 
                max={ SS_UP_SEL.max }
                step={1}
                scale={sliderScale}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            SS_UP_SEL: newValue
                        })  
                        UpdateParam(motorNumber, SS_UP_SEL, newValue)
                    }
                }}
                valueLabelFormat={sliderFormat}
            /> 
        </Box>
    )
}