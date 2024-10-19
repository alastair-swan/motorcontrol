"use client"

import { useEffect, useState } from "react"
import { sliderComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Slider } from '@mui/material'

// TIP
export function SecondDCExcitationTimeSlider ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: sliderComponentProps){
    const sliderFormat = (value: number) => {
        return RegisterList.TIP.valuemap[value] + " seconds"
    }
    const switchText = () => {
        return sliderFormat(state.TIP)
    }
    return (
        <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
            Second DC Excitation Time {switchText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.TIP }
                min={0} 
                max={7}
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            TIP: newValue
                        })  
                        UpdateParam(motorNumber, RegisterList.TIP.command, newValue)
                    }
                }}
                valueLabelFormat={sliderFormat}
            />
        </Box>
    )
}