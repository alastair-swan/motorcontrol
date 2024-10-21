"use client"

import { sliderComponentProps } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { asPercentage } from "./helper"
import { MAXDUTY } from "./Register"

// MAXDUTY
export function MaxDutySlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const scaleFunction = (value: number) => { return ((value + 257)/512) }
    const switchText = () => {
        return state.MAXDUTY
    }
    const sliderScale = (value: number) => { return ((value + 257)/512) }
    return (
        <Box sx={ frameStyle }>
            Motor Max Input Value: {asPercentage(sliderScale(switchText()))}
            <Slider 
                valueLabelDisplay='auto' 
                value={state.MAXDUTY}
                min={ MAXDUTY.min } 
                max={ MAXDUTY.max }
                step={1}
                scale={scaleFunction}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        const updatedState = state
                        updatedState.MAXDUTY = newValue
                        setState({
                            ...state,
                            MAXDUTY: newValue
                        })  
                        UpdateParam(motorNumber, MAXDUTY, newValue)
                    }
                }}
                valueLabelFormat={asPercentage}
            /> 
        </Box>
    )
}