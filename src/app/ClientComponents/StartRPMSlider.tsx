"use client"

import { sliderComponentProps } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { STARTRPM } from "./Register"

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
                min={ STARTRPM.min } 
                max={ STARTRPM.max }
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            STARTRPM: newValue
                        })  
                        UpdateParam(motorNumber, STARTRPM, newValue)
                    }
                }}
            /> 
        </Box>
    )
}