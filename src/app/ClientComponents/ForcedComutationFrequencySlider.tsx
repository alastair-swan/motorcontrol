"use client"

import { sliderComponentProps } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { FST } from "./Register"

// FST
export function ForcedComutationFrequencySlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const formatText = (value: number) => {
        if (typeof(FST.valuemap) === 'undefined'){
            return state.FST
        }
        else{
            return FST.valuemap[value]
        }
    }
    return (
        <Box sx={ frameStyle }>
            Forced Comutation Frequency: { formatText(state.FST) }
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.FST }
                min={ FST.min } 
                max={ FST.max }
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            FST: newValue
                        })
                        UpdateParam(motorNumber, FST, newValue)
                    }
                }}
                valueLabelFormat={ formatText }
            /> 
        </Box>
    )
}