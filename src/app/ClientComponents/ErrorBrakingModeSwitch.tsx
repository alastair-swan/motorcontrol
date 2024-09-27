"use client"

import { useEffect, useState } from "react"
import { switchComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Switch } from '@mui/material'

// LOCK_BRK
export function ErrorBrakingModeSwitch ({ motorNumber, itembgColor, itembgHoverColor , state, setState}: switchComponentProps){
    const [value, setValue] = useState<boolean>(true)
    useEffect(
        () => {
            const fetchData = async () => {
                try{
                    const result = await GetParam(motorNumber, RegisterList.LOCK_BRK.command) === 1
                    const updatedState = state
                    updatedState.LOCK_BRK = result
                    setState(updatedState)   
                }
                catch (error){
                    console.error('LOCK_BRK failed to fetch: ', error)
                }
            }
            fetchData()
        }, [ motorNumber ]
    )
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingRight: 2}}>
                <Switch  
                    checked={state.LOCK_BRK}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                        const updatedState = state
                        updatedState.LOCK_BRK = checked
                        setValue(checked)
                        setState(updatedState)   
                        UpdateParam(motorNumber, RegisterList.LOCK_BRK.command, checked)
                    }}
                /> 
                Error Braking Mode
            </Box>
        </Grid2>
    )
}