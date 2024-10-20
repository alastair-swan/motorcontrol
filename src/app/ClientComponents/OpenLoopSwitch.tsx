"use client"

import { switchComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Switch } from '@mui/material'
import { componentStyle } from "../UIStyle"

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
                    UpdateParam(motorNumber, RegisterList.OPENLOOP.command, checked)
                }}
            /> 
            {switchText()} Loop Control
        </Box>
    )
}