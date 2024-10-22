"use client"

import { sliderComponentProps } from "."
import { UpdateParam } from "../MotorControlClient"
import { Box, Slider } from '@mui/material'
import { asPercentage } from "./helper"
import { componentStyle } from "../UIStyle"
import { SPD } from "./Register"

// SPD
export function MotorDutySlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const formatText = (value: number) => {
        return asPercentage(SPD.normalize(value), 1)
    }

    return (
        <Box sx={ frameStyle }>
            Motor Duty Setting {formatText(state.SPD)}
            <Slider 
                valueLabelDisplay='off' 
                value={state.SPD}
                min={ SPD.min } 
                max={ SPD.max }
                step={ 1 }
                scale={ SPD.normalize }
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state, 
                            SPD: newValue}
                        )  
                        UpdateParam(motorNumber, SPD, newValue)
                    }
                }}
                valueLabelFormat={ formatText }
            />
        </Box>
    )
}
