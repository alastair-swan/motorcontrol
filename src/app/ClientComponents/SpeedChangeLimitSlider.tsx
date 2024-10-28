"use client"

import { sliderComponentProps } from "."
import { UpdateParam } from "../MotorControlClient"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { DUTYCHGLIMIT } from "./Register"

// DUTYCHGLIMIT
export function SpeedChangeLimitSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const sliderFormat = (value: number) => {
        if (typeof(DUTYCHGLIMIT.valuemap) === 'undefined'){
            console.error("Data error: DUTYCHGLIMIT.valuemap undefined")
            return value
        }
        else {
            return (100 / (DUTYCHGLIMIT.valuemap[value] as number)).toFixed(1) + "%/second"
        }
    }
    const switchText = () => {
        return sliderFormat(state.DUTYCHGLIMIT) + " seconds"
    }
    return (
        <Box sx={ frameStyle }>
            Motor Speed Change Rate: { switchText() }
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.DUTYCHGLIMIT }
                min={ DUTYCHGLIMIT.min } 
                max={ DUTYCHGLIMIT.max }
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            DUTYCHGLIMIT: newValue
                        })  
                        UpdateParam(motorNumber, DUTYCHGLIMIT, (newValue + 1) % 8)
                    }
                }}
                valueLabelFormat={sliderFormat}
            /> 
        </Box>
    )
}