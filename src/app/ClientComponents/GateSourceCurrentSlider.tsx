"use client"

import { sliderComponentProps } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { SOURCE } from "./Register"

// SOURCE
export function GateSourceCurrentSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const formatText = (value: number) => {
        if (typeof(SOURCE.valuemap) === 'undefined'){
            return value
        }
        else {
            return SOURCE.valuemap[value] + 'mA'
        }
    }
    const switchText = () => {
        return state.SOURCE
    }
    return (
        <Box sx={ frameStyle }>
            Transistor Gate Source Current {switchText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.SOURCE }
                min={ SOURCE.min } 
                max={ SOURCE.max }
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            SOURCE: newValue
                        })
                        UpdateParam(motorNumber, SOURCE, newValue)
                    }
                }}
                valueLabelFormat={ formatText }
            /> 
        </Box>
    )
}