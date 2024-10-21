"use client"

import { switchComponentProps } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Switch } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { OPENLOOP } from "./Register"

// OPENLOOP
export function OpenLoopSwitch ({ motorNumber, state, setState, frameStyle = componentStyle }: switchComponentProps){
    const switchText = () => {
        if (state.OPENLOOP){
            return <span style={{color: 'yellow'}}>Open</span>
        }
        return "Closed"
    }
    return (
        <Box sx={ frameStyle }>
            <Switch 
                checked={state.OPENLOOP}
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                    setState({
                        ...state,
                        OPENLOOP: checked
                    })  
                    UpdateParam(motorNumber, OPENLOOP, checked)
                }}
            /> 
            {switchText()} Loop Control
        </Box>
    )
}