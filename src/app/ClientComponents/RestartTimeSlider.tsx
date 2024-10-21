"use client"

import { sliderComponentProps } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { TRE } from "./Register"

// TRE
export function RestartTimeSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const sliderFormat = (value: number) => {
        if (typeof(TRE.valuemap) === 'undefined'){
            console.error("Data error: TRE.valuemap undefined")
            return value
        }
        else{
            return TRE.valuemap[value] + " seconds"
        }
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
                min={ TRE.min } 
                max={ TRE.max }
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            TRE: newValue
                        })  
                        UpdateParam(motorNumber, TRE, newValue)
                    }
                }}
                valueLabelFormat={sliderFormat}
            /> 
        </Box>
    )
}