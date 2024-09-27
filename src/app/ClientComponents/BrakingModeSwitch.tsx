"use client"

import { useEffect, useState } from "react"
import { switchComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Switch } from '@mui/material'

// WAIT_MODE
export function BrakingModeSwitch ({ motorNumber, itembgColor, itembgHoverColor, state, setState}: switchComponentProps){
    const [value, setValue] = useState<boolean>(RegisterList.WAIT_MODE.default)
    useEffect(
        () => {
            const fetchData = async () => {
                try{
                    const result = await GetParam(motorNumber, RegisterList.WAIT_MODE.command) === 1
                    const updatedState = state
                    updatedState.WAIT_MODE = result
                    setState(updatedState)
                }
                catch (error){
                    console.error('WAIT_MODE failed to fetch: ', error)
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
                        updatedState.WAIT_MODE = checked
                        setValue(checked)
                        setState(updatedState)
                        UpdateParam(motorNumber, RegisterList.WAIT_MODE.command, checked)
                    }}
                />
                Brake Mode
            </Box>
        </Grid2>
    )
}