"use client"

import { useEffect, useState } from "react"
import { sliderComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Slider } from '@mui/material'

// DUTYCHGLIMIT
export function SpeedChangeLimitSlider ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: sliderComponentProps){
    const sliderFormat = (value: number) => {
        return (100 / (RegisterList.DUTYCHGLIMIT.valuemap[value] as number)) + "%/second"
    }
    const switchText = () => {
        return sliderFormat(state.DUTYCHGLIMIT) + " seconds"
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Motor Speed Change Rate: { switchText() }
                <Slider 
                    valueLabelDisplay='auto' 
                    value={ state.DUTYCHGLIMIT }
                    min={0} 
                    max={7}
                    step={1}
                    scale={(value: number) => { return (value + 1) % 8 }}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setState({
                                ...state,
                                DUTYCHGLIMIT: newValue
                            })  
                            UpdateParam(motorNumber, RegisterList.DUTYCHGLIMIT.command, newValue)
                        }
                    }}
                    valueLabelFormat={sliderFormat}
                /> 
            </Box>
        </Grid2>
    )
}