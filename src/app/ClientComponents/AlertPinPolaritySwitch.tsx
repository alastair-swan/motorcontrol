"use client"

import { useState, useEffect } from "react"
import { switchComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Switch } from '@mui/material'

// ALERTINV
export function AlertPinPolaritySwitch ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: switchComponentProps){
    const [value, setValue] = useState<boolean>(state.ALERTINV)
    useEffect(
        () => {
            const fetchData = async () => {
                try{
                    const result = await GetParam(motorNumber, RegisterList.ALERTINV.command) === 1
                    const updatedState = state
                    updatedState.ALERTINV = result
                    setValue(result)
                    setState(updatedState)
                }
                catch (error){
                    console.error('ALERTINV failed to fetch: ', error)
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
                        console.log("ALERTINV" + checked)
                        const updatedState = state
                        updatedState.ALERTINV = checked
                        setValue(checked)
                        setState(updatedState)
                        UpdateParam(motorNumber, RegisterList.ALERTINV.command, checked)
                    }}
                /> 
                Alert Pin Polarity Inverted
            </Box>
        </Grid2>
    )
}