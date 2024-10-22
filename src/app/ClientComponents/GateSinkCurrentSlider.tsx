"use client"

import { sliderComponentProps } from "."
import { UpdateParam } from "../MotorControlClient"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { SINK } from "./Register"

// SINK
export function GateSinkCurrentSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const formatText = (value: number) => {
        if (typeof(SINK.valuemap) === 'undefined'){
            return value
        }
        else {
            return SINK.valuemap[value] + 'mA'
        }
    }
    const switchText = () => {
        return formatText(state.SINK)
    }
    return (
        <Box sx={ frameStyle }>
            Transistor Gate Sink Current {switchText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.SINK }
                min={ SINK.min } 
                max={ SINK.max }
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            SINK: newValue
                        })
                        UpdateParam(motorNumber, SINK, newValue)
                    }
                }}
                valueLabelFormat={ formatText }
            />
        </Box>
    )
}
