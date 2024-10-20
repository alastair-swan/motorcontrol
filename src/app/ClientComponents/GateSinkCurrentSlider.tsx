"use client"

import { sliderComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"

// SINK
export function GateSinkCurrentSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const switchText = () => {
        return state.SINK
    }
    return (
        <Box sx={ frameStyle }>
            Transistor Gate Sink Current {switchText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.SINK }
                min={0} 
                max={7}
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            SINK: newValue
                        })
                        UpdateParam(motorNumber, RegisterList.SINK.command, newValue)
                    }
                }}
                valueLabelFormat={(value: number) => {
                    const current = [20, 27.8, 38.6, 53.7, 74.6, 103.6, 143.9, 200]
                    return current[value] + 'mA'
                }}
            />
        </Box>
    )
}
