"use client"

import { sliderComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"

// PreTIP
export function FirstDCExcitationTimeSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const switchText = () => {
        return state.PRE_TIP
    }
    return (
        <Box sx={ frameStyle }>
            First DC Excitation Time {switchText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.PRE_TIP }
                min={0} 
                max={3}
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            PRE_TIP: newValue
                        })
                        UpdateParam(motorNumber, RegisterList.PRE_TIP.command, newValue)
                    }
                }}
                valueLabelFormat={(value: number) => {
                    const time = [0, 0.2, 0.5, 1]
                    return time[value] + " seconds"
                }}
            />
        </Box>
    )
}