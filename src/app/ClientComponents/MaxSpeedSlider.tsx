"use client"

import { useEffect, useState } from "react"
import { RegisterList } from "../MotorControl"
import { sliderComponentProps } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Slider } from '@mui/material'

// MAXSPEED
export function MaxSpeedSlider ({ motorNumber, itembgColor, itembgHoverColor }: sliderComponentProps){
    const [value, setValue] = useState<number>(RegisterList.MAXSPEED.default);
    useEffect(
        () => {
            const fetchData = async () => {
                try{
                    const result = await GetParam(motorNumber, RegisterList.MAXSPEED.command)
                    setValue(result)
                }
                catch (error){
                    console.error('MAXSPEED failed to fetch: ', error)
                }
            }
            fetchData()
        }, [ motorNumber ]
    )
    const sliderFormat = (value: number) => {
        const speedList = [4096, 8192, 16384, 32768]
        return speedList[value] + " RPM"
    }
    const switchText = () => {
        return sliderFormat(value)
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Max RPM: {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={3}
                    step={1}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setValue(newValue)
                            UpdateParam(motorNumber, RegisterList.MAXSPEED.command, newValue)
                        }
                    }}
                    valueLabelFormat={sliderFormat}
                /> 
            </Box>
        </Grid2>
    )
}