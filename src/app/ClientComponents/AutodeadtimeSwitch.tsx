"use client"

import { useState, useEffect } from "react"
import { switchComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Switch } from '@mui/material'

// ANTITHROUGH
export function AutodeadtimeSwitch ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: switchComponentProps){
    const [value, setValue] = useState<boolean>(RegisterList.ANTITHROUGH.default)
    useEffect(
        () => {
            const fetchData = async () => {
                try{
                    const result = await GetParam(motorNumber, RegisterList.ANTITHROUGH.command) === 1
                    const updatedState = state
                    updatedState.ANTITHROUGH = result
                    setValue(result)
                    setState(updatedState)
                }
                catch (error){
                    console.error('KIX failed to fetch: ', error)
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
                        updatedState.ANTITHROUGH = checked
                        setValue(checked)
                        setState(updatedState)
                        UpdateParam(motorNumber, RegisterList.ANTITHROUGH.command, checked)
                    }}
                /> 
                Autodeadtime
            </Box>
        </Grid2>
    )
}