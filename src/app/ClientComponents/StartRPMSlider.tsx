"use client"

import { useEffect, useState } from "react"
import { sliderComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Slider } from '@mui/material'

//STARTRPM
export function StartRPMSlider ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: sliderComponentProps){
    const switchText = () => {
        return state.STARTRPM
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                RPM At Start Duty: {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={ state.STARTRPM }
                    min={0} 
                    max={4095}
                    step={1}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setState({
                                ...state,
                                STARTRPM: newValue
                            })  
                            UpdateParam(motorNumber, RegisterList.STARTRPM.command, newValue)
                        }
                    }}
                /> 
            </Box>
        </Grid2>
    )
}