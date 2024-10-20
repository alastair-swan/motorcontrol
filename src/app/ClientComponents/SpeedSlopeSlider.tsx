"use client"

import { sliderComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"

// SPEEDSLOP
export function SpeedSlopeSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const switchText = () => {
        return sliderFormat(sliderScale(state.SPEEDSLOP))
    }
    const sliderScale = (value: number) => { return value * 0.08 }
    const sliderFormat = (value: number) => {
        return Math.round(value * 100) / 100 + " RPM/%"
    }
    return (
        <Box sx={ frameStyle }>
            Speed Slope Below Inflection Point: { switchText() }
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.SPEEDSLOP }
                min={0} 
                max={16383}
                step={1}
                scale={sliderScale}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            SPEEDSLOP: newValue
                        })  
                        UpdateParam(motorNumber, RegisterList.SPEEDSLOP.command, newValue)
                    }
                }}
                valueLabelFormat={sliderFormat}
            /> 
        </Box>
    )
}