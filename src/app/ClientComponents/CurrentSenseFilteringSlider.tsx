"use client"

import { sliderComponentProps } from "."
import { UpdateParam } from "../MotorControlClient"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { RS_SEL } from "./Register"

// RS_SEL
export function CurrentSenseFilteringSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const formatText = (value: number) => {
        if (typeof(RS_SEL.valuemap) === 'undefined'){
            console.log("expected an array of speeds at RS_SEL.valuemap")
            return "Data error"
        }
        else {
            return RS_SEL.valuemap[value]
        }
    }
    
    const switchText = () => {
        return formatText(state.RS_SEL)
    }
    return (
        <Box sx={ frameStyle }>
            Current Sense analog filtering {switchText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={state.RS_SEL}
                min={ RS_SEL.min } 
                max={ RS_SEL.max }
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            RS_SEL: newValue
                        })
                        UpdateParam(motorNumber, RS_SEL, newValue)
                    }
                }}
                valueLabelFormat={ formatText }
            />
        </Box>
    )
}