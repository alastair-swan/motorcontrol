"use client"

import { sliderComponentProps } from "."
import { UpdateParam } from "../MotorControlClient"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { FMAX } from "./Register"

// FMAX
export function ElectricalAngleMaxFrequencySlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const formatText = (value: number) => {
        if (typeof(FMAX.valuemap) === 'undefined'){
            console.error("Data error: FMAX.valuemap undefined")
        }
        else{
            if (FMAX.valuemap[value] === undefined){
                return "Unlimited"
            }
            else{
                if (typeof(FMAX.valuemap[value]) === 'number'){
                    return FMAX.valuemap[value] / 1000 + "kHz"
                }
                else {
                    return FMAX.valuemap[value]
                }
            }
        }
    }
    const switchText = () => {
        return formatText(state.FMAX)
    }
    return (
        <Box sx={ frameStyle }>
            Electrical Angle Frequency Mode {switchText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={state.FMAX}
                min={ FMAX.min } 
                max={ FMAX.max }
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            FMAX: newValue
                        })
                        UpdateParam(motorNumber, FMAX, newValue)
                    }
                }}
                valueLabelFormat={ formatText }
            /> 
        </Box>
    )
}