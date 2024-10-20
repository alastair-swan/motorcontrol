"use client"

import { switchComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Switch } from '@mui/material'
import { componentStyle } from "../UIStyle"

// LOCKDIS
export function ForcedComutationSwitch ({ motorNumber, state, setState, frameStyle = componentStyle }: switchComponentProps){
    return (
        <Box sx={ frameStyle }>
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