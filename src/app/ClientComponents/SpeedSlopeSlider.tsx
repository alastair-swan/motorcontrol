"use client"

import { sliderComponentProps } from "."
import { UpdateParam } from "../MotorControlClient"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { SPEEDSLOP } from "./Register"

// SPEEDSLOP
export function SpeedSlopeSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const switchText = () => {
        return sliderFormat(SPEEDSLOP.normalize(state.SPEEDSLOP))
    }
    const sliderFormat = (value: number) => {
        return Math.round(value * 100) / 100 + " RPM/%"
    }
    return (
        <Box sx={ frameStyle }>
            Speed Slope Below Inflection Point: { switchText() }
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.SPEEDSLOP }
                min={ SPEEDSLOP.min } 
                max={ SPEEDSLOP.max }
                step={ 1 }
                scale={ SPEEDSLOP.normalize }
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            SPEEDSLOP: newValue
                        })  
                        UpdateParam(motorNumber, SPEEDSLOP, newValue)
                    }
                }}
                valueLabelFormat={sliderFormat}
            /> 
        </Box>
    )
}