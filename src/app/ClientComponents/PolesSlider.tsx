"use client"

import { sliderComponentProps } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { POLEPAIR } from "./Register"

// POLEPAIR
export function PolesSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const sliderFormat = (value: number) => {
        return (value + 1) * 2 + " Pole Motor"
    }
    const sliderText = () => {
        return sliderFormat(state.POLEPAIR)
    }
    return (
        <Box sx={ frameStyle }>
            {sliderText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.POLEPAIR }
                min={ POLEPAIR.min } 
                max={ POLEPAIR.max }
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            POLEPAIR: newValue
                        })  
                        UpdateParam(motorNumber, POLEPAIR, newValue)
                    }
                }}
                valueLabelFormat={sliderFormat}
            />
        </Box>
    )
}