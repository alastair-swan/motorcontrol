"use client"

import { sliderComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"

// MAXDUTYHYS
export function MaxDutyHysteresisSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const switchText = () => {
        return state.MAXDUTYHYS
    }
    return (
        <Box sx={ frameStyle }>
            Hysteresis at Max Duty: {switchText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.MAXDUTYHYS }
                min={0}
                max={15}
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            MAXDUTYHYS: newValue
                        })  
                        UpdateParam(motorNumber, RegisterList.MAXDUTYHYS.command, newValue)
                    }
                }}
            />
        </Box>
    )
}
