"use client"

import { useEffect, useState } from "react"
import { switchComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Switch } from '@mui/material'

// LATCH
export function ErrorLatchSwitch ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: switchComponentProps){
    const [value, setValue] = useState<boolean>(RegisterList.LATCH.default)
    useEffect(
        () => {
            const fetchData = async () => {
                try{
                    const result = await GetParam(motorNumber, RegisterList.LATCH.command) === 1
                    const updatedState = state
                    updatedState.LATCH = result
                    setValue(result)
                    setState(updatedState)  
                }
                catch (error){
                    console.error('LATCH failed to fetch: ', error)
                }
            }
            fetchData()
        }, [ motorNumber ]
    )
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingRight: 2}}>
                <Switch  
                    checked={value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                        const updatedState = state
                        updatedState.LATCH = checked
                        setValue(checked)
                        setState(updatedState)  
                        UpdateParam(motorNumber, RegisterList.LATCH.command, checked)
                    }}
                />
                Latch Error State
            </Box>
        </Grid2>
    )
}
