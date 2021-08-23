import { ButtonHTMLAttributes} from 'react'

import '../styles/button.scss';

type ButtonProps =ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutline?: boolean
};

export function Button({ isOutline = false, ...props }: ButtonProps) {
    return (
        <button
            className={`button ${}`}
            {...props}

        />
    )
}
