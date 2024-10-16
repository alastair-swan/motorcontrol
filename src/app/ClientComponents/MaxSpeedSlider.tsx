"use client"

import { useEffect, useState } from "react"
import { sliderComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Slider } from '@mui/material'

// MAXSPEED
export function MaxSpeedSlider ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: sliderComponentProps){
    const sliderFormat = (value: number) => {
        const speedList = RegisterList.MAXSPEED.valuemap
        return speedList[value] + " RPM"
    }
    const switchText = () => {
        return sliderFormat(state.MAXSPEED)
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Max RPM: {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={ state.MAXSPEED }
                    min={0} 
                    max={3}
                    step={1}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setState({
                                ...state,
                                MAXSPEED: newValue
                            })  
                            UpdateParam(motorNumber, RegisterList.MAXSPEED.command, newValue)
                        }
                    }}
                    valueLabelFormat={sliderFormat}
                /> 
            </Box>
        </Grid2>
    )
}