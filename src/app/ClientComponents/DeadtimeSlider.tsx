"use client"

import { sliderComponentProps } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { DEADTIME } from "./Register"

// DEADTIME
export function DeadtimeSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const formatText = (value: number) => {
        if (typeof(DEADTIME.valuemap) === 'undefined'){
            console.log("expected an array of speeds at DEADTIME.valuemap")
            return "Data error"
        }
        else {
            return DEADTIME.valuemap[value]
        }
    }
    const switchText = () => {
        return formatText(state.DEADTIME)
    }
    return (
        <Box sx={ frameStyle }>
            Dead Time Setting {switchText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.DEADTIME }
                min={ DEADTIME.min } 
                max={ DEADTIME.max }
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            DEADTIME: newValue
                        })
                        UpdateParam(motorNumber, DEADTIME, newValue)
                    }
                }}
                valueLabelFormat={ formatText }
            /> 
        </Box>
    )
}