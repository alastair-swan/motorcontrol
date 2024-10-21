"use client"

import { sliderComponentProps } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { FMAX } from "./Register"

// FMAX
export function ElectricalAngleMaxFrequencySlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const formatText = (value: number) => {
        return (FMAX.valuemap as Array<string>)[value]
    }
    const switchText = () => {
        if (typeof(FMAX.valuemap) === 'undefined') {
            return state.FMAX
        }
        else {
            return FMAX.valuemap[state.FMAX]
        }
    }
    return (
        <Box sx={ frameStyle }>
            Electrical Angle Frequency Mode {switchText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={state.FMAX}
                min={ FMAX.min } 
                max={ FMAX.min }
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            FMAX: newValue
                        })
                        UpdateParam(motorNumber, FMAX, newValue)
                    }
                }}
                valueLabelFormat={ formatText }
            /> 
        </Box>
    )
}