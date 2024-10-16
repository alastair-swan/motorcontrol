"use client"

import { useEffect, useState } from "react"
import { sliderComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Slider } from '@mui/material'

// FPWM
export function OutputPWMSlider ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: sliderComponentProps){
    const switchText = () => {
        return state.FPWM
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Output PWM Frequency Mode {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={ state.FPWM }
                    min={0} 
                    max={15}
                    step={1}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setState({
                                ...state,
                                FPWM: newValue
                            })
                            UpdateParam(motorNumber, RegisterList.FPWM.command, newValue)
                        }
                    }}
                />
            </Box>
        </Grid2>
    )
}
