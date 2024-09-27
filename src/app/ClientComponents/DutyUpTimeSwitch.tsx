"use client"

import { useEffect, useState } from "react"
import { switchComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Switch } from '@mui/material'

// DUTY_UP_TIME
export function DutyUpTimeSwitch ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: switchComponentProps){
    const [value, setValue] = useState<boolean>(RegisterList.DUTY_UP_TIME.default)
    useEffect(
        () => {
            const fetchData = async () => {
                try{
                    const result = await GetParam(motorNumber, RegisterList.DUTY_UP_TIME.command) === 1
                    const updatedState = state
                    updatedState.DUTY_UP_TIME = result
                    setValue(result)
                    setState(updatedState)
                }
                catch (error){
                    console.error('DUTY_UP_TIME failed to fetch: ', error)
                }
            }
            fetchData()
        }, [ motorNumber ]
    )
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingRight: 2}}>
                <Switch  
                    checked={ value }
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                        const updatedState = state
                        updatedState.DUTY_UP_TIME = checked
                        setValue(checked)
                        setState(updatedState)
                        setValue(checked)
                        UpdateParam(motorNumber, RegisterList.DUTY_UP_TIME.command, checked)
                    }}
                />
                Duty Up Time
            </Box>
        </Grid2>
    )
}