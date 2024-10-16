"use client"

import { useEffect, useState } from "react"
import { switchComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Switch } from '@mui/material'

// DIR
export function DirectionSwitch ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: switchComponentProps){
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingRight: 2}}>
                <Switch  
                    checked={state.DIR}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                        setState({
                            ...state,
                            DIR: checked
                        })
                        UpdateParam(motorNumber, RegisterList.DIR.command, checked)
                    }}
                />
                Direction
            </Box>
        </Grid2>
    )
}