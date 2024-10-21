"use client"

import { asPercentage } from "./helper"
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { sliderComponentProps } from "."
import { componentStyle } from "../UIStyle"
import { CHANGEDUTY } from "./Register"

// CHANGEDUTY
export function ChangeDutySlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const switchText = () => {
        return state.CHANGEDUTY
    }
    const sliderScale = (value: number) => { return ((value * 2)/512) }
    return (
        <Box sx={ frameStyle }>
            Motor Slope Inflection Point: {asPercentage(sliderScale(switchText()))}
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.CHANGEDUTY }
                min={ CHANGEDUTY.min } 
                max={ CHANGEDUTY.max }
                step={1}
                scale={sliderScale}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            CHANGEDUTY: newValue
                        })  
                        UpdateParam(motorNumber, CHANGEDUTY, newValue)
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