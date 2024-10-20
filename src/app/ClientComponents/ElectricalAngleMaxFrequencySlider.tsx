"use client"

import { sliderComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"

// FMAX
export function ElectricalAngleMaxFrequencySlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const switchText = () => {
        return state.FMAX
    }
    return (
        <Box sx={ frameStyle }>
            Electrical Angle Frequency Mode {switchText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={state.FMAX}
                min={0} 
                max={3}
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            FMAX: newValue
                        })
                        UpdateParam(motorNumber, RegisterList.FMAX.command, newValue)
                    }
                }}
                valueLabelFormat={(value: number) => {
                    const frequency = ['0.75kHz', '1.5kHz', '3kHz', 'unlimited']
                    return frequency[value]
                }}
            /> 
        </Box>
    )
}