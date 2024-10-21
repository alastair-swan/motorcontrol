"use client"

import { sliderComponentProps } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { PRE_TIP } from "./Register"

// PreTIP
export function FirstDCExcitationTimeSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const formatText = (value: number) => {
        if (typeof(PRE_TIP.valuemap) === "undefined"){
            return value
        }
        else {
            return PRE_TIP.valuemap[value] + " seconds"
        }
    }
    const switchText = () => {
        return state.PRE_TIP
    }
    return (
        <Box sx={ frameStyle }>
            First DC Excitation Time: {switchText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.PRE_TIP }
                min={ PRE_TIP.min } 
                max={ PRE_TIP.max }
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            PRE_TIP: newValue
                        })
                        UpdateParam(motorNumber, PRE_TIP, newValue)
                    }
                }}
                valueLabelFormat={ formatText }
            />
        </Box>
    )
}