"use client"

import { sliderComponentProps } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { RPMLIMIT } from "./Register"

// RPMLIMIT
export function RPMLimitSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const sliderFormat = (value: number) => {
        if (typeof(RPMLIMIT.valuemap) === 'undefined'){
            console.error("Data error: RPMLIMIT.valuemap undefined")
            return value
        }
        else{
            return RPMLIMIT.valuemap[value] + ' RPM'
        }
    }
    const switchText = () => {
        return sliderFormat(state.RPMLIMIT)
    }
    return (
        <Box sx={ frameStyle }>
            Motor RPM Limit {switchText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.RPMLIMIT }
                min={ RPMLIMIT.min } 
                max={ RPMLIMIT.max }
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            RPMLIMIT: newValue
                        })  
                        UpdateParam(motorNumber, RPMLIMIT, newValue)
                    }
                }}
                valueLabelFormat={sliderFormat}
            /> 
        </Box>
    )
}