"use client"

import { sliderComponentProps } from "."
import { UpdateParam } from "../MotorControlClient"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { TIP } from "./Register"

// TIP
export function SecondDCExcitationTimeSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const sliderFormat = (value: number) => {
        if (typeof(TIP.valuemap) === 'undefined'){
            console.error("Data error: TIP.valuemap undefined")
            return value
        }
        else{
            return TIP.valuemap[value] + " seconds"
        }
    }
    const switchText = () => {
        return sliderFormat(state.TIP)
    }
    return (
        <Box sx={ frameStyle }>
            Second DC Excitation Time {switchText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.TIP }
                min={ TIP.min } 
                max={ TIP.max }
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            TIP: newValue
                        })  
                        UpdateParam(motorNumber, TIP, newValue)
                    }
                }}
                valueLabelFormat={sliderFormat}
            />
        </Box>
    )
}