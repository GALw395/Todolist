

type ButtonPropsType = {
    title: string
    changeFilter: Function
}

export const Button = ({title, changeFilter}: ButtonPropsType) => {
    return <button onChange={() => changeFilter(title)} >{title}</button>
}