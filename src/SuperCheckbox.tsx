import { Checkbox } from "@mui/material"
import { ChangeEvent } from "react"

export type SuperCheckboxPropsType = {
    checked: boolean
    callBack: (checked: boolean) => void
}
export const SuperCheckbox = (props: SuperCheckboxPropsType) => {  
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callBack(e.currentTarget.checked)
    }
    return (
        <>
            <Checkbox onChange={onChangeStatusHandler} checked={props.checked} />
        </>
    )
}