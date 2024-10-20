"use client"

import { sliderComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { asPercentage } from "./helper"

//STARTDUTY
export function StartDutySlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const switchText = () => {
        return asPercentage(sliderScale(state.STARTDUTY))
    }
    const sliderScale = (value: number) => { return (value/512) }
    return (
        <Box sx={ frameStyle }>
            Motor Start Input Value: { switchText() }
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.STARTDUTY }
                min={0} 
                max={255}
                step={1}
                scale={ sliderScale }
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            STARTDUTY: newValue
                        })  
                        UpdateParam(motorNumber, RegisterList.STARTDUTY.command, newValue)
                    }
                }}
                valueLabelFormat={asPercentage}
            /> 
        </Box>
    )
}
