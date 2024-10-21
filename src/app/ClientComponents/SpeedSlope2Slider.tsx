"use client"

import { sliderComponentProps } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { SPEEDSLOP2 } from "./Register"

// SPEEDSLOP2
export function SpeedSlope2Slider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const switchText = () => {
        return sliderFormat(sliderScale(state.SPEEDSLOP2))
    }
    const sliderScale = (value: number) => { return value * 0.08 }
    const sliderFormat = (value: number) => {
        return Math.round(value * 100) / 100 + " RPM/%"
    }
    return (
        <Box sx={ frameStyle }>
            Speed Slope Above Inflection Point: {switchText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.SPEEDSLOP2 }
                min={ SPEEDSLOP2.min } 
                max={ SPEEDSLOP2.max }
                step={1}
                scale={(value: number) => { return value * 0.08 }}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            SPEEDSLOP2: newValue
                        })  
                        UpdateParam(motorNumber, SPEEDSLOP2, newValue)
                    }
                }}
                valueLabelFormat={sliderFormat}
            /> 
        </Box>
    )
}