"use client"

import { sliderComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"

// DUTYCHGLIMIT
export function SpeedChangeLimitSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const sliderFormat = (value: number) => {
        return (100 / (RegisterList.DUTYCHGLIMIT.valuemap[value] as number)) + "%/second"
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
                min={0} 
                max={7}
                step={1}
                scale={(value: number) => { return (value + 1) % 8 }}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            DUTYCHGLIMIT: newValue
                        })  
                        UpdateParam(motorNumber, RegisterList.DUTYCHGLIMIT.command, newValue)
                    }
                }}
                valueLabelFormat={sliderFormat}
            /> 
        </Box>
    )
}