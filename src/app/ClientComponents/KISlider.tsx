"use client"

import { sliderComponentProps } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { KI, KIX } from "./Register"

// KI
export function KISlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const sliderScale = (value: number) => { 
        return value * 0.08 
    }
    const sliderFormat = (value: number) => {
        return value.toFixed(2)
    }
    const switchText = () => {
        return sliderFormat(sliderScale(state.KIX ? state.KI * 8 : state.KI))
    }
    return (
        <Box sx={ frameStyle }>
            I coefficient: {switchText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.KIX ? state.KI * 8 : state.KI }
                min={ KI.min } 
                max={ KI.max as number * 8}
                step={ state.KI <= (KI.max as number) ? 1 : 8 }
                scale={sliderScale}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        if (newValue <= (KI.max as number) && state.KIX){
                            setState({
                                ...state,
                                KI: newValue,
                                KIX: false
                            })
                            UpdateParam(motorNumber, KI, newValue)
                            UpdateParam(motorNumber, KIX, false)
                        }
                        else if (newValue > (KI.max as number) && !state.KIX){
                            setState({
                                ...state,
                                KI: Math.round(newValue / 8),
                                KIX: true
                            })
                            UpdateParam(motorNumber, KI, Math.round(newValue / 8))
                            UpdateParam(motorNumber, KIX, true)
                        }
                        else if (newValue <= (KI.max as number)){
                            setState({
                                ...state,
                                KI: newValue
                            })
                            UpdateParam(motorNumber, KI, newValue)
                        }
                        else{
                            setState({
                                ...state,
                                KI: Math.round(newValue / 8)
                            })
                            UpdateParam(motorNumber, KI, Math.round(newValue / 8))
                        }
                    }
                }}
                valueLabelFormat={sliderFormat}
            />
        </Box>
    )
}