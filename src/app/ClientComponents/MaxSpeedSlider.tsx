"use client"

import { sliderComponentProps } from "."
import { UpdateParam } from "../MotorControlClient"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { MAXSPEED } from "./Register"

// MAXSPEED
export function MaxSpeedSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const sliderFormat = (value: number) => {
        if (typeof(MAXSPEED.valuemap) === "undefined"){
            console.log("expected an array of speeds at MAXSPEED.valuemap")
            return "Data error"
        }
        else{
            return MAXSPEED.valuemap[value] + " RPM"
        }
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
                min={ MAXSPEED.min } 
                max={ MAXSPEED.max }
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            MAXSPEED: newValue
                        })  
                        UpdateParam(motorNumber, MAXSPEED, newValue)
                    }
                }}
                valueLabelFormat={sliderFormat}
            /> 
        </Box>
    )
}