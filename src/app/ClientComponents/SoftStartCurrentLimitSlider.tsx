"use client"

import { sliderComponentProps } from "."
import { UpdateParam } from "../MotorControlClient"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { shuntResistor } from "./helper"
import { SS_ADD_SEL } from "./Register"

// SS_ADD_SEL
export function SoftStartCurrentLimitSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const sliderFormat = (value: number) => {
        if (typeof(SS_ADD_SEL.valuemap) === 'undefined'){
            console.error("Data error: SS_ADD_SEL.valuemap undefined")
            return value
        }
        else {
            return (SS_ADD_SEL.valuemap[value] as number * ((state.OCP_LVL ? 0.125 : 0.25) / shuntResistor)) + " Amps"
        }
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
                min={ SS_ADD_SEL.min } 
                max={ SS_ADD_SEL.max }
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            SS_ADD_SEL: newValue
                        })  
                        UpdateParam(motorNumber, SS_ADD_SEL, newValue)
                    }
                }}
                valueLabelFormat={sliderFormat}
            /> 
        </Box>
    )
}