"use client"

import { useEffect, useState } from "react"
import { sliderComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Slider } from '@mui/material'
import { asPercentage } from "./helper"

// STOPDUTY
export function OffDutySlider ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: sliderComponentProps){
    const switchText = () => {
        return asPercentage(sliderScale(state.STOPDUTY))
    }
    const sliderScale = (value: number) => { return value/256 }
    //const [value, setValue] = useState(0)
    return (
        <Box sx={{ bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
            Motor Off Input Value: { switchText() }
            <Slider 
                valueLabelDisplay='auto' 
                value={state.STOPDUTY}
                min={0} 
                max={127}
                step={1}
                scale={sliderScale}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            STOPDUTY: newValue
                        })
                        UpdateParam(motorNumber, RegisterList.STOPDUTY.command, newValue)
                    }
                }}
                valueLabelFormat={asPercentage}
            /> 
        </Box>
    )
}
