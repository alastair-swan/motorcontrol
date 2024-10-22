"use client"

import { UpdateParam } from "../MotorControlClient"
import { Box, Slider } from '@mui/material'
import { sliderComponentProps } from "."
import { componentStyle } from "../UIStyle"
import { OCPMASK } from "./Register"

// OCPMASK
export function DigitalFilteringSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){

    const formatText = (value: number) => {
        return (OCPMASK.valuemap as Array<string>)[value]
    }

    return (
        <Box sx={ frameStyle }>
            Current Sense Digital Filtering: {formatText(state.OCPMASK)}
            <Slider 
                valueLabelDisplay='auto' 
                value={state.OCPMASK}
                min={ OCPMASK.min } 
                max={ OCPMASK.max }
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            OCPMASK: newValue
                        })
                        UpdateParam(motorNumber, OCPMASK, newValue)
                    }
                }}
                valueLabelFormat={ formatText }
            /> 
        </Box>
    )
}
