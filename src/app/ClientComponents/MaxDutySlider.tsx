"use client"

import { useEffect, useState } from "react"
import { sliderComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Slider } from '@mui/material'
import { asPercentage } from "./helper"

// MAXDUTY
export function MaxDutySlider ({ motorNumber, itembgColor, itembgHoverColor }: sliderComponentProps){
    const [value, setValue] = useState<number>(RegisterList.MAXDUTY.default);
    useEffect(
        () => {
            const fetchData = async () => {
                try{
                    const result = await GetParam(motorNumber, RegisterList.MAXDUTY.command)
                    setValue(result)
                }
                catch (error){
                    console.error('MAXDUTY failed to fetch: ', error)
                }
            }
            fetchData()
        }, [ motorNumber ]
    )
    const switchText = () => {
        return value
    }
    const sliderScale = (value: number) => { return ((value + 257)/512) }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Motor Max Input Value: {asPercentage(sliderScale(switchText()))}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={255}
                    step={1}
                    scale={(value: number) => { return ((value + 257)/512) }}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setValue(newValue)
                            UpdateParam(motorNumber, RegisterList.MAXDUTY.command, newValue)
                        }
                    }}
                    valueLabelFormat={asPercentage}
                /> 
            </Box>
        </Grid2>
    )
}