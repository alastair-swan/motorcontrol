"use client"

import { sliderComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"

// MAXSPEED
export function MaxSpeedSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const sliderFormat = (value: number) => {
        const speedList = RegisterList.MAXSPEED.valuemap
        return speedList[value] + " RPM"
    }
    const switchText = () => {
        return sliderFormat(state.MAXSPEED)
    }
    return (
        <Box sx={ frameStyle }>
            Max RPM: {switchText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.MAXSPEED }
                min={0} 
                max={3}
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            MAXSPEED: newValue
                        })  
                        UpdateParam(motorNumber, RegisterList.MAXSPEED.command, newValue)
                    }
                }}
                valueLabelFormat={sliderFormat}
            /> 
        </Box>
    )
}