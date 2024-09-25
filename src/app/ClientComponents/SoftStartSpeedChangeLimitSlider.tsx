"use client"

import { useEffect, useState } from "react"
import { RegisterList } from "../MotorControl"
import { sliderComponentProps } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Slider } from '@mui/material'

// SS_DUTYCHGLIMIT
export function SoftStartSpeedChangeLimitSlider ({ motorNumber, itembgColor, itembgHoverColor }: sliderComponentProps){
    const [value, setValue] = useState<number>(RegisterList.SS_DUTYCHGLIMIT.default);
    useEffect(
        () => {
            const fetchData = async () => {
                try{
                    const result = await GetParam(motorNumber, RegisterList.SS_DUTYCHGLIMIT.command)
                    setValue(result)
                }
                catch (error){
                    console.error('SS_DUTYCHGLIMIT failed to fetch: ', error)
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
                Speed Change Rate during soft start {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={7}
                    step={1}
                    scale={(value: number) => { return (value + 1) % 8 }}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setValue(newValue)
                            UpdateParam(motorNumber, RegisterList.SS_DUTYCHGLIMIT.command, newValue)
                        }
                    }}
                    valueLabelFormat={(value: number) => {
                        const speedList = ['0.17', '0.20', '0.55', '1.11', '1.84', '2.76', '3.69', '5.53']
                        return speedList[value]
                    }}
                /> 
            </Box>
        </Grid2>
    )
}