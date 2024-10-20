"use client"

import { sliderComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"

// DEADTIME
export function DeadtimeSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const formatText = (value: number) => {
        if (typeof(RegisterList.DEADTIME.valuemap) === 'undefined'){
            console.log("expected an array of speeds at RegisterList.DEADTIME.valuemap")
            return "Data error"
        }
        else {
            return RegisterList.DEADTIME.valuemap[value]
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
                value={state.DEADTIME}
                min={0} 
                max={3}
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            DEADTIME: newValue
                        })
                        UpdateParam(motorNumber, RegisterList.DEADTIME.command, newValue)
                    }
                }}
                valueLabelFormat={ formatText }
            /> 
        </Box>
    )
}