"use client"

import { useEffect, useState } from "react"
import { sliderComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Slider } from '@mui/material'

// MAXDUTYHYS
export function MaxDutyHysteresisSlider ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: sliderComponentProps){
    const switchText = () => {
        return state.MAXDUTYHYS
    }
    return (
        <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
            Hysteresis at Max Duty: {switchText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.MAXDUTYHYS }
                min={0}
                max={15}
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            MAXDUTYHYS: newValue
                        })  
                        UpdateParam(motorNumber, RegisterList.MAXDUTYHYS.command, newValue)
                    }
                }}
            />
        </Box>
    )
}
