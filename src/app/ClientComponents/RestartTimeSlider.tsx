"use client"

import { sliderComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"

// TRE
export function RestartTimeSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const sliderFormat = (value: number) => {
        const time = [0, 0.5, 1, 1.5, 2, 4, 7, 10]
        return time[value] + " seconds"
    }
    const switchText = () => {
        return sliderFormat(state.TRE)
    }
    return (
        <Box sx={ frameStyle }>
            Auto Restart Time: {switchText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.TRE }
                min={0} 
                max={7}
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            TRE: newValue
                        })  
                        UpdateParam(motorNumber, RegisterList.TRE.command, newValue)
                    }
                }}
                valueLabelFormat={sliderFormat}
            /> 
        </Box>
    )
}