import type { SelectHTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    error?: boolean;
    className?: string;
}

export const FormSelect = ({ error = false, className, children, ...props }: FormSelectProps) => {
    return (
        <select
            className={cn(
                'w-full px-3 py-2 border rounded-lg focus:outline-0 focus:ring-2 focus:border-transparent transition-colors',
                error
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500',
                props.disabled && 'bg-slate-50 cursor-not-allowed opacity-60',
                className
            )}
            {...props}
        >
            {children}
        </select>
    );
};