"use client"

import { sliderComponentProps } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { COMP_HYS } from "./Register"

// COMP_HYS
export function PositionDetectionHysteresisSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const sliderFormat = (value: number) => {
        if (typeof(COMP_HYS.valuemap) === 'undefined'){
            console.error("Data error: valuemap undefined for COMP_HYS")
            return value
        }
        else {
            return COMP_HYS.valuemap[value]
        }
    }
    const sliderText = () => {
        return sliderFormat(state.COMP_HYS)
    }
    return (
        <Box sx={ frameStyle }>
            Position Detection Hysteresis Voltage { sliderText() }
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.COMP_HYS }
                min={ COMP_HYS.min } 
                max={ COMP_HYS.max }
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            COMP_HYS: newValue
                        })  
                        UpdateParam(motorNumber, COMP_HYS, newValue)
                    }
                }}
                valueLabelFormat={sliderFormat}
            /> 
        </Box>
    )
}