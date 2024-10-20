"use client"

import { sliderComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"

// KI
export function KISlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const sliderScale = (value: number) => { return (state.KIX ? value * 0.08 * 8: value * 0.08) }
    const sliderFormat = (value: number) => {
        return value.toFixed(2)
    }
    const switchText = () => {
        return sliderFormat(sliderScale(state.KI))
    }
    return (
        <Box sx={ frameStyle }>
            I coefficient: {switchText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.KI }
                min={0} 
                max={127}
                step={1}
                scale={sliderScale}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            KI: newValue
                        })
                        UpdateParam(motorNumber, RegisterList.KI.command, newValue)
                    }
                }}
                valueLabelFormat={sliderFormat}
            />
        </Box>
    )
}