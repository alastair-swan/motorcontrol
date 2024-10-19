"use client"

import { useEffect, useState } from "react"
import { sliderComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Slider } from '@mui/material'

// PreTIP
export function FirstDCExcitationTimeSlider ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: sliderComponentProps){
    const switchText = () => {
        return state.PRE_TIP
    }
    return (
        <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
            First DC Excitation Time {switchText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.PRE_TIP }
                min={0} 
                max={3}
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            PRE_TIP: newValue
                        })
                        UpdateParam(motorNumber, RegisterList.PRE_TIP.command, newValue)
                    }
                }}
                valueLabelFormat={(value: number) => {
                    const time = [0, 0.2, 0.5, 1]
                    return time[value] + " seconds"
                }}
            />
        </Box>
    )
}