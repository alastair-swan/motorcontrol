"use client"

import { asPercentage } from "./helper"
import { UpdateParam } from "../MotorControlClient"
import { Box, Slider } from '@mui/material'
import { sliderComponentProps } from "."
import { componentStyle } from "../UIStyle"
import { CHANGEDUTY } from "./Register"

// CHANGEDUTY
export function ChangeDutySlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const normalize = CHANGEDUTY.normalize
    const switchText = () => {
        return state.CHANGEDUTY
    }
    return (
        <Box sx={ frameStyle }>
            Motor Slope Inflection Point: {asPercentage(normalize(switchText()))}
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.CHANGEDUTY }
                min={ CHANGEDUTY.min } 
                max={ CHANGEDUTY.max }
                step={ 1 }
                scale={ normalize }
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            CHANGEDUTY: newValue
                        })  
                        UpdateParam(motorNumber, CHANGEDUTY, newValue)
                    }
                }}
                valueLabelFormat={(value: number) => {
                    if (value != 0) { 
                        return asPercentage(value)
                    }
                    else { 
                        return "Not Used"
                    }
                }}
            /> 
        </Box>
    )
}