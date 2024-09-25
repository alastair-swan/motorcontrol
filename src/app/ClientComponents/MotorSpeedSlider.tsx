"use client"

import { useEffect, useState } from "react"
import { RegisterList } from "../MotorControl"
import { sliderComponentProps } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Slider } from '@mui/material'
import { asPercentage } from "./helper"

// SPD
export function MotorSpeedSlider ({ motorNumber, itembgColor, itembgHoverColor }: sliderComponentProps){ 
    const [value, setValue] = useState<number>(RegisterList.SPD.default)
    useEffect(
        () => {
            const fetchData = async () => {
                try{
                    const result = await GetParam(motorNumber, RegisterList.SPD.command)
                    setValue(result)
                }
                catch (error){
                    console.error('SPD failed to fetch: ', error)
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
                Motor Duty Setting {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={511}
                    step={1}
                    scale={(value: number) => { return value }}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setValue(newValue)
                            UpdateParam(motorNumber, RegisterList.SPD.command, newValue)
                        }
                    }}
                    valueLabelFormat={(value: number) => {
                        return asPercentage(value / 511)
                    }}
                />
            </Box>
        </Grid2>
    )
}
