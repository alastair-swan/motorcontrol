"use client"

import { useEffect, useState } from "react"
import { RegisterList } from "../MotorControl"
import { sliderComponentProps } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Slider } from '@mui/material'

// FMAX
export function ElectricalAngleMaxFrequencySlider ({ motorNumber, itembgColor, itembgHoverColor }: sliderComponentProps){
    const [value, setValue] = useState<number>(RegisterList.FMAX.default);
    useEffect(
        () => {
            const fetchData = async () => {
                try{
                    const result = await GetParam(motorNumber, RegisterList.FMAX.command)
                    setValue(result)
                }
                catch (error){
                    console.error('FMAX failed to fetch: ', error)
                }
            }
            fetchData()
        }, [ motorNumber ]
    )
    const switchText = () => {
        return value
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Electrical Angle Frequency Mode {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={3}
                    step={1}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setValue(newValue)
                            UpdateParam(motorNumber, RegisterList.FMAX.command, newValue)
                        }
                    }}
                    valueLabelFormat={(value: number) => {
                        const frequency = ['0.75kHz', '1.5kHz', '3kHz', 'unlimited']
                        return frequency[value]
                    }}
                /> 
            </Box>
        </Grid2>
    )
}