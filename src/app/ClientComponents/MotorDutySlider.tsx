"use client"

import { sliderComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { asPercentage } from "./helper"
import { componentStyle } from "../UIStyle"

// SPD
export function MotorDutySlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const formatText = (value: number) => {
        return asPercentage(value / 511)
    }

    const switchText = () => {
        return formatText(state.SPD)
    }

    return (
        <Box sx={ frameStyle }>
            Motor Duty Setting {switchText()}
            <Slider 
                valueLabelDisplay='off' 
                value={state.SPD}
                min={0} 
                max={511}
                step={1}
                scale={(value: number) => { return value }}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state, 
                            SPD: newValue}
                        )  
                        UpdateParam(motorNumber, RegisterList.SPD.command, newValue)
                    }
                }}
                valueLabelFormat={ formatText }
            />
        </Box>
    )
}
