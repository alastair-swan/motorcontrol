"use client"

import { useEffect, useState } from "react"
import { sliderComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Slider } from '@mui/material'

// COMP_HYS
export function PositionDetectionHysteresisSlider ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: sliderComponentProps){
    const sliderFormat = (value: number) => {
        const voltage = ['none', '100mV', '200mV', '300mV']
        return voltage[value]
    }
    const sliderText = () => {
        return sliderFormat(state.COMP_HYS)
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Position Detection Hysteresis Voltage { sliderText() }
                <Slider 
                    valueLabelDisplay='auto' 
                    value={ state.COMP_HYS }
                    min={0} 
                    max={3}
                    step={1}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setState({
                                ...state,
                                COMP_HYS: newValue
                            })  
                            UpdateParam(motorNumber, RegisterList.COMP_HYS.command, newValue)
                        }
                    }}
                    valueLabelFormat={sliderFormat}
                /> 
            </Box>
        </Grid2>
    )
}