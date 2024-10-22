"use client"

import { sliderComponentProps } from "."
import { UpdateParam } from "../MotorControlClient"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { STARTRPM } from "./Register"

//STARTRPM
export function StartRPMSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    return (
        <Box sx={ frameStyle }>
            RPM At Start Duty: { state.STARTRPM }RPM
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