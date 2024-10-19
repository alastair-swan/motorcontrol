"use client"

import { useEffect, useState } from "react"
import { switchComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Switch } from '@mui/material'

// LOCKDIS
export function ForcedComutationSwitch ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: switchComponentProps){
    return (
        <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingRight: 2}}>
            <Switch  
                checked={ state.LOCKDIS }
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                    setState({
                        ...state,
                        LOCKDIS: checked
                    })
                    UpdateParam(motorNumber, RegisterList.LOCKDIS.command, checked)
                }}
            /> 
            Forced Comutation
        </Box>
    )
}