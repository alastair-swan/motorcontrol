"use client"

import { sliderComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"

// WAIT_TIME
export function BrakeTimeSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const switchText = () => {
        return state.WAIT_TIME
    }
    return (
        <Box sx={ frameStyle }>
            Brake Time {switchText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={state.WAIT_TIME}
                min={0} 
                max={3}
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            WAIT_TIME: newValue
                        })
                        UpdateParam(motorNumber, RegisterList.WAIT_TIME.command, newValue)
                    }
                }}
                valueLabelFormat={(value: number) => {
                    return value + " seconds"
                }}
            />
        </Box>
    )
}