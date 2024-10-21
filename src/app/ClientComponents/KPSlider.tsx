"use client"

import { sliderComponentProps } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { KP, KPX } from "./Register"

// KP
export function KPSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const sliderScale = (value: number) => { 
        return value * 0.08 
    }
    const sliderFormat = (value: number) => {
        return value.toFixed(2)
    }
    const switchText = () => {
        return sliderFormat(sliderScale(state.KPX ? state.KP * 8 : state.KP))
    }
    return (
        <Box sx={ frameStyle }>
            I coefficient: {switchText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.KPX ? state.KP * 8 : state.KP }
                min={ KP.min } 
                max={ KP.max as number * 8}
                step={ state.KP <= (KP.max as number) ? 1 : 8 }
                scale={sliderScale}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        if (newValue <= (KP.max as number) && state.KPX){
                            setState({
                                ...state,
                                KP: newValue,
                                KPX: false
                            })
                            UpdateParam(motorNumber, KP, newValue)
                            UpdateParam(motorNumber, KPX, false)
                        }
                        else if (newValue > (KP.max as number) && !state.KPX){
                            setState({
                                ...state,
                                KP: Math.round(newValue / 8),
                                KPX: true
                            })
                            UpdateParam(motorNumber, KP, Math.round(newValue / 8))
                            UpdateParam(motorNumber, KPX, true)
                        }
                        else if (newValue <= (KP.max as number)){
                            setState({
                                ...state,
                                KP: newValue
                            })
                            UpdateParam(motorNumber, KP, newValue)
                        }
                        else{
                            setState({
                                ...state,
                                KP: Math.round(newValue / 8)
                            })
                            UpdateParam(motorNumber, KP, Math.round(newValue / 8))
                        }
                    }
                }}
                valueLabelFormat={sliderFormat}
            />
        </Box>
    )
}