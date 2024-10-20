"use client"

import { sliderComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"

// TIP
export function SecondDCExcitationTimeSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const sliderFormat = (value: number) => {
        return RegisterList.TIP.valuemap[value] + " seconds"
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
                min={0} 
                max={7}
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            TIP: newValue
                        })  
                        UpdateParam(motorNumber, RegisterList.TIP.command, newValue)
                    }
                }}
                valueLabelFormat={sliderFormat}
            />
        </Box>
    )
}