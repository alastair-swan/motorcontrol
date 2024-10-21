"use client"

import { switchComponentProps } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Switch } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { LATCH } from "./Register"

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
                    UpdateParam(motorNumber, LATCH, checked)
                }}
            />
            { state.LATCH ? "Latch In Error State" : "Automatically Restart" }
        </Box>
    )
}
