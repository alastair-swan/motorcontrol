"use client"

import { sliderComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"

// FST
export function ForcedComutationFrequencySlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const switchText = () => {
        return state.FST
    }
    return (
        <Box sx={ frameStyle }>
            Forced Comutation Frequency {switchText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.FST }
                min={0} 
                max={3}
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            FST: newValue
                        })
                        UpdateParam(motorNumber, RegisterList.FST.command, newValue)
                    }
                }}
                valueLabelFormat={(value: number) => {
                    const frequency = ['1.6Hz', '3.2Hz', '6.4Hz', '12.8Hz']
                    return frequency[value]
                }}
            /> 
        </Box>
    )
}