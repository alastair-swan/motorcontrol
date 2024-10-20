"use client"

import { sliderComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { asPercentage } from "./helper"

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
                value={ 15-state.MAXDUTYHYS }
                min={0}
                max={15}
                step={1}
                scale={scaleFunction}
                valueLabelFormat={formatText}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            MAXDUTYHYS: 15-newValue
                        })  
                        UpdateParam(motorNumber, RegisterList.MAXDUTYHYS.command, 15 - newValue)
                    }
                }}
            />
        </Box>
    )
}
