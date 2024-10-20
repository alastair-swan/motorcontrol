"use client"

import { sliderComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"

//STARTRPM
export function StartRPMSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const switchText = () => {
        return state.STARTRPM
    }
    return (
        <Box sx={ frameStyle }>
            RPM At Start Duty: {switchText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.STARTRPM }
                min={0} 
                max={4095}
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            STARTRPM: newValue
                        })  
                        UpdateParam(motorNumber, RegisterList.STARTRPM.command, newValue)
                    }
                }}
            /> 
        </Box>
    )
}