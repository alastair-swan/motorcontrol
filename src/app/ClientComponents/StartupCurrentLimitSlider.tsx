"use client"

import { sliderComponentProps } from "."
import { UpdateParam } from "../MotorControlClient"
import { Box, Slider } from '@mui/material'
import { shuntResistor } from "./helper"
import { componentStyle } from "../UIStyle"
import { STARTCURRENT } from "./Register"

// STARTCURRENT
export function StartupCurrentLimitSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const sliderFormat = (value: number) => {
        if (typeof(STARTCURRENT.valuemap) === 'undefined'){
            console.error("Data error: STARTCURRENT.valuemap undefined")
            return value
        }
        else {
            return (STARTCURRENT.valuemap[value] as number) * ((state.OCP_LVL ? 0.125 : 0.25) / shuntResistor) + " Amps"
        }
    }
    const sliderScale = (value: number) => { 
        return (((8 - value) / 8) * (state.OCP_LVL ? 0.125 : 0.25)) / shuntResistor; 
    }
    const switchText = () => {
        return sliderFormat(sliderScale(state.STARTCURRENT))
    }
    return (
        <Box sx={ frameStyle }>
            Startup Current Limit: {switchText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.STARTCURRENT }
                min={ STARTCURRENT.min } 
                max={ STARTCURRENT.max }
                step={1}
                scale={sliderScale}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            STARTCURRENT: newValue
                        })  
                        UpdateParam(motorNumber, STARTCURRENT, newValue)
                    }
                }}
                valueLabelFormat={sliderFormat}
            /> 
        </Box>
    )
}
