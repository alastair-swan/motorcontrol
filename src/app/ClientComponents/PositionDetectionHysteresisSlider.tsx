"use client"

import { sliderComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"

// COMP_HYS
export function PositionDetectionHysteresisSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const sliderFormat = (value: number) => {
        const voltage = ['none', '100mV', '200mV', '300mV']
        return voltage[value]
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
                min={0} 
                max={3}
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            COMP_HYS: newValue
                        })  
                        UpdateParam(motorNumber, RegisterList.COMP_HYS.command, newValue)
                    }
                }}
                valueLabelFormat={sliderFormat}
            /> 
        </Box>
    )
}