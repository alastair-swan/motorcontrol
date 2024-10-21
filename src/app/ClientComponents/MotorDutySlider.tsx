"use client"

import { sliderComponentProps } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { asPercentage } from "./helper"
import { componentStyle } from "../UIStyle"
import { SPD } from "./Register"

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
                min={ SPD.min } 
                max={ SPD.max }
                step={1}
                scale={(value: number) => { return value }}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state, 
                            SPD: newValue}
                        )  
                        UpdateParam(motorNumber, SPD, newValue)
                    }
                }}
                valueLabelFormat={ formatText }
            />
        </Box>
    )
}
