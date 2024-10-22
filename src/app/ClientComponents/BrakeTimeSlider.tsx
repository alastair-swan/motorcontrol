"use client"

import { sliderComponentProps } from "."
import { UpdateParam } from "../MotorControlClient"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { WAIT_TIME } from "./Register"

// WAIT_TIME
export function BrakeTimeSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    return (
        <Box sx={ frameStyle }>
            Brake Time {state.WAIT_TIME} seconds
            <Slider 
                valueLabelDisplay='auto' 
                value={state.WAIT_TIME}
                min={ WAIT_TIME.min } 
                max={ WAIT_TIME.max }
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            WAIT_TIME: newValue
                        })
                        UpdateParam(motorNumber, WAIT_TIME, newValue)
                    }
                }}
                valueLabelFormat={(value: number) => {
                    return value + " seconds"
                }}
            />
        </Box>
    )
}