"use client"

import { sliderComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"

// DEADTIME
export function DeadtimeSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const switchText = () => {
        return state.DEADTIME
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
                valueLabelFormat={(value: number) => {
                    const time = ['250ns', '500ns', '1000ns', '1500ns']
                    return time[value]
                }}
            /> 
        </Box>
    )
}