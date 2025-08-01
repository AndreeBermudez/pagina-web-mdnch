import type { InputHTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';

interface FormFileInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
	error?: boolean;
	className?: string;
}

export const FormFileInput = ({ error = false, className, ...props }: FormFileInputProps) => {
	return (
		<input
			type='file'
			className={cn(
				'block w-full text-sm text-slate-500 transition-colors',
				'file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0',
				'file:text-sm file:font-medium',
				error
					? 'file:bg-red-50 file:text-red-700 hover:file:bg-red-100'
					: 'file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100',
				props.disabled && 'opacity-60 cursor-not-allowed',
				className
			)}
			{...props}
		/>
	);
};
