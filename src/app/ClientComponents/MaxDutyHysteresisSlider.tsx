"use client"

import { sliderComponentProps } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { asPercentage } from "./helper"
import { MAXDUTYHYS } from "./Register"

// MAXDUTYHYS
export function MaxDutyHysteresisSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    
    const scaleFunction = (value: number) => { return ((state.MAXDUTY + 257 - (15 - value + 1) * 2) / 512) }
    const formatText = (value: number) => {
        return asPercentage(value)
    }
    
    const switchText = () => {
        return formatText(scaleFunction(15-state.MAXDUTYHYS))
    }
    return (
        <Box sx={ frameStyle }>
            Hysteresis at Max Duty: {switchText()}
            <Slider 
                track={"inverted"}
                valueLabelDisplay='auto' 
                value={ 15 - state.MAXDUTYHYS }
                min={ MAXDUTYHYS.min }
                max={ MAXDUTYHYS.max }
                step={1}
                scale={scaleFunction}
                valueLabelFormat={formatText}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            MAXDUTYHYS: 15 - newValue
                        })  
                        UpdateParam(motorNumber, MAXDUTYHYS , 15 - newValue)
                    }
                }}
            />
        </Box>
    )
}
