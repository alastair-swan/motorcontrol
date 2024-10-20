"use client"

import { sliderComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"

// LA
export function LeadAngleSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const switchText = () => {
        return state.LA
    }
    return (
        <Box sx={ frameStyle }>
            Lead Angle Mode {switchText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.LA }
                min={0} 
                max={15}
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            LA: newValue
                        })  
                        UpdateParam(motorNumber, RegisterList.LA.command, newValue)
                    }
                }}
            /> 
        </Box>
    )
}
