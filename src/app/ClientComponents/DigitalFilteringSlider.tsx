"use client"

import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { sliderComponentProps, RegisterList } from "."
import { componentStyle } from "../UIStyle"

// OCPMASK
export function DigitalFilteringSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const switchText = () => {
        return state.OCPMASK
    }
    return (
        <Box sx={ frameStyle }>
            Current Sense Digital Filtering: {switchText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={state.OCPMASK}
                min={0} 
                max={3}
                step={1}
                scale={(value: number) => { return value }}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            OCPMASK: newValue
                        })
                        UpdateParam(motorNumber, RegisterList.OCPMASK.command, newValue)
                    }
                }}
                valueLabelFormat={(value: number) => {
                    const speedList = ['OCP: none, ISD: 83ns', 'OCP: 500ns, ISD: 583ns', 'OCP: 666ns, ISD: 750ns', 'OCP: 750ns, ISD: 833ns']
                    return speedList[value]
                }}
            /> 
        </Box>
    )
}
