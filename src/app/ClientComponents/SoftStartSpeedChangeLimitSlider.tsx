"use client"

import { sliderComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"

// SS_DUTYCHGLIMIT
export function SoftStartSpeedChangeLimitSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const sliderFormat = (value: number) => {
        return (100 / (RegisterList.SS_DUTYCHGLIMIT.valuemap[value] as number)) + "%/second"
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
                min={0} 
                max={7}
                step={1}
                scale={(value: number) => { return (value + 1) % 8 }}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            SS_DUTYCHGLIMIT: newValue
                        })  
                        UpdateParam(motorNumber, RegisterList.SS_DUTYCHGLIMIT.command, newValue)
                    }
                }}
                valueLabelFormat={sliderFormat}
            /> 
        </Box>
    )
}