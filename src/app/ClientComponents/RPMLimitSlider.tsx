"use client"

import { sliderComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"

// RPMLIMIT
export function RPMLimitSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const sliderFormat = (value: number) => {
        return RegisterList.RPMLIMIT.valuemap[value] + ' RPM'
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
                min={0} 
                max={7}
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            RPMLIMIT: newValue
                        })  
                        UpdateParam(motorNumber, RegisterList.RPMLIMIT.command, newValue)
                    }
                }}
                valueLabelFormat={sliderFormat}
            /> 
        </Box>
    )
}