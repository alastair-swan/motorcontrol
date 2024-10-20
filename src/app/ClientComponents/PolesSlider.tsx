"use client"

import { sliderComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"

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
                min={0} 
                max={7}
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            POLEPAIR: newValue
                        })  
                        UpdateParam(motorNumber, RegisterList.POLEPAIR.command, newValue)
                    }
                }}
                valueLabelFormat={sliderFormat}
            />
        </Box>
    )
}