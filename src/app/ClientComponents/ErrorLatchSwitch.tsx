"use client"

import { switchComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Switch } from '@mui/material'
import { componentStyle } from "../UIStyle"

// LATCH
export function ErrorLatchSwitch ({ motorNumber, state, setState, frameStyle = componentStyle }: switchComponentProps){
    return (
        <Box sx={ frameStyle }>
            <Switch  
                checked={state.LATCH}
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                    setState({
                        ...state,
                        LATCH: checked
                    })  
                    UpdateParam(motorNumber, RegisterList.LATCH.command, checked)
                }}
            />
            Latch Error State
        </Box>
    )
}
