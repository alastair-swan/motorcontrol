"use client"

import { useEffect, useState } from "react"
import { sliderComponentProps,RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Slider } from '@mui/material'

// RS_SEL
export function CurrentSenseFilteringSlider ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: sliderComponentProps){
    const [value, setValue] = useState<number>(RegisterList.RS_SEL.default)
    useEffect(
        () => {
            const fetchData = async () => {
                try{
                    const result = await GetParam(motorNumber, RegisterList.RS_SEL.command)
                    const updatedState = state
                    updatedState.RS_SEL = result
                    setValue(result)
                    setState(updatedState)
                }
                catch (error){
                    console.error('RS_SEL failed to fetch: ', error)
                }
            }
            fetchData()
        }, [ motorNumber ]
    )
    const switchText = () => {
        return state.RS_SEL
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Current Sense analog filtering {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={3}
                    step={1}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            const updatedState = state
                            updatedState.RS_SEL = newValue
                            setValue(newValue)
                            setState(updatedState)
                            UpdateParam(motorNumber, RegisterList.RS_SEL.command, newValue)
                        }
                    }}
                    valueLabelFormat={(value: number) => {
                        const speedList = ['unfiltered', '200kHz', '100kHz', '50kHz']
                        return speedList[value]
                    }}
                />
            </Box>
        </Grid2>
    )
}