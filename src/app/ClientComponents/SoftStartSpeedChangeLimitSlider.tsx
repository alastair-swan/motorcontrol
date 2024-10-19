"use client"

import { useEffect, useState } from "react"
import { sliderComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Slider } from '@mui/material'

// SS_DUTYCHGLIMIT
export function SoftStartSpeedChangeLimitSlider ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: sliderComponentProps){
    const sliderFormat = (value: number) => {
        return (100 / (RegisterList.SS_DUTYCHGLIMIT.valuemap[value] as number)) + "%/second"
    }
    const sliderText = () => {
        return sliderFormat(state.SS_DUTYCHGLIMIT) + " seconds"
    }
    return (
        <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
            Speed Change Rate during soft start: { sliderText() }
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.SS_DUTYCHGLIMIT }
                min={0} 
                max={7}
                step={1}
                scale={(value: number) => { return (value + 1) % 8 }}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            SS_DUTYCHGLIMIT: newValue
                        })  
                        UpdateParam(motorNumber, RegisterList.SS_DUTYCHGLIMIT.command, newValue)
                    }
                }}
                valueLabelFormat={sliderFormat}
            /> 
        </Box>
    )
}