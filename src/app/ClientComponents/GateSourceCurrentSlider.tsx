"use client"

import { sliderComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"

// SOURCE
export function GateSourceCurrentSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const switchText = () => {
        return state.SOURCE
    }
    return (
        <Box sx={ frameStyle }>
            Transistor Gate Source Current {switchText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.SOURCE }
                min={0} 
                max={7}
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            SOURCE: newValue
                        })
                        UpdateParam(motorNumber, RegisterList.SOURCE.command, newValue)
                    }
                }}
                valueLabelFormat={(value: number) => {
                    const frequency = [10, 13.9, 19.3, 26.8, 37.3, 51.8, 72, 100]
                    return frequency[value] + 'mA'
                }}
            /> 
        </Box>
    )
}