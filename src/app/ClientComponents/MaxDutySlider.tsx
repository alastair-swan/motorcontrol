"use client"

import { sliderComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { asPercentage } from "./helper"

// MAXDUTY
export function MaxDutySlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
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
                min={0} 
                max={255}
                step={1}
                scale={(value: number) => { return ((value + 257)/512) }}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        const updatedState = state
                        updatedState.MAXDUTY = newValue
                        setState({
                            ...state,
                            MAXDUTY: newValue
                        })  
                        UpdateParam(motorNumber, RegisterList.MAXDUTY.command, newValue)
                    }
                }}
                valueLabelFormat={asPercentage}
            /> 
        </Box>
    )
}