"use client"

import { switchComponentProps } from "."
import { UpdateParam } from "../MotorControlClient"
import { Box, Switch } from '@mui/material'
import { componentStyle, warningStateColor } from "../UIStyle"
import { LOCKDIS } from "./Register"

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
                    UpdateParam(motorNumber, LOCKDIS, checked)
                }}
            /> 
            { state.LOCKDIS ? 
                <span style={{color: warningStateColor}}>Startup Errors Ignored</span>:
                "Failure to transition to closed loop control will trigger an error"
            }
        </Box>
    )
}