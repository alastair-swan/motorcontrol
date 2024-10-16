"use client"

import { useEffect, useState } from "react"
import { sliderComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Slider } from '@mui/material'

// FST
export function ForcedComutationFrequencySlider ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: sliderComponentProps){
    const switchText = () => {
        return state.FST
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Forced Comutation Frequency {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={ state.FST }
                    min={0} 
                    max={3}
                    step={1}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setState({
                                ...state,
                                FST: newValue
                            })
                            UpdateParam(motorNumber, RegisterList.FST.command, newValue)
                        }
                    }}
                    valueLabelFormat={(value: number) => {
                        const frequency = ['1.6Hz', '3.2Hz', '6.4Hz', '12.8Hz']
                        return frequency[value]
                    }}
                /> 
            </Box>
        </Grid2>
    )
}