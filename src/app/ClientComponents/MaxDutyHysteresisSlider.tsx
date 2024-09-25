"use client"

import { useEffect, useState } from "react"
import { RegisterList } from "../MotorControl"
import { sliderComponentProps } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Slider } from '@mui/material'

export function MaxDutyHysteresisSlider ({ motorNumber, itembgColor, itembgHoverColor }: sliderComponentProps){
    const [value, setValue] = useState<number>(RegisterList.MAXDUTYHYS.default);
    useEffect(
        () => {
            const fetchData = async () => {
                try{
                    const result = await GetParam(motorNumber, RegisterList.MAXDUTYHYS.command)
                    setValue(result)
                }
                catch (error){
                    console.error('MAXDUTYHYS failed to fetch: ', error)
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
                Hysteresis at Max Duty: {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0}
                    max={15}
                    step={1}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setValue(newValue)
                            UpdateParam(motorNumber, RegisterList.MAXDUTYHYS.command, newValue)
                        }
                    }}
                />
            </Box>
        </Grid2>
    )
}
