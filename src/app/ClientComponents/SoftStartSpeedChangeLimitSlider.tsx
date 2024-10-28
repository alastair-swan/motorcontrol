"use client"

import { sliderComponentProps } from "."
import { UpdateParam } from "../MotorControlClient"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { SS_DUTYCHGLIMIT } from "./Register"

// SS_DUTYCHGLIMIT
export function SoftStartSpeedChangeLimitSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const sliderFormat = (value: number) => {
        if (typeof(SS_DUTYCHGLIMIT.valuemap) === 'undefined'){
            console.error("Data error: SS_DUTYCHGLIMIT.valuemap undefined")
            return value
        }
        else{
            return (100 / (SS_DUTYCHGLIMIT.valuemap[value] as number)).toFixed(1) + "%/second"
        }
    }
    const sliderText = () => {
        return sliderFormat(state.SS_DUTYCHGLIMIT) + " seconds"
    }
    return (
        <Box sx={ frameStyle }>
            Speed Change Rate during soft start: { sliderText() }
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.SS_DUTYCHGLIMIT }
                min={ SS_DUTYCHGLIMIT.min } 
                max={ SS_DUTYCHGLIMIT.max }
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            SS_DUTYCHGLIMIT: newValue
                        })  
                        UpdateParam(motorNumber, SS_DUTYCHGLIMIT, (newValue + 1) % 8)
                    }
                }}
                valueLabelFormat={sliderFormat}
            /> 
        </Box>
    )
}