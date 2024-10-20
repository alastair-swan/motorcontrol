"use client"

import { sliderComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"

// RS_SEL
export function CurrentSenseFilteringSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const switchText = () => {
        return state.RS_SEL
    }
    return (
        <Box sx={ frameStyle }>
            Current Sense analog filtering {switchText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={state.RS_SEL}
                min={0} 
                max={3}
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            RS_SEL: newValue
                        })
                        UpdateParam(motorNumber, RegisterList.RS_SEL.command, newValue)
                    }
                }}
                valueLabelFormat={(value: number) => {
                    const speedList = ['unfiltered', '200kHz', '100kHz', '50kHz']
                    return speedList[value]
                }}
            />
        </Box>
    )
}