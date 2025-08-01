import type { LabelHTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';

interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
	label?: string;
	required?: boolean;
	className?: string;
}

export const FormLabel = ({ label, required = false, className, ...props }: FormLabelProps) => {
	if (!label) return null;

	return (
		<label className={cn('block mb-2 text-sm font-medium text-slate-700', className)} {...props}>
			{label} {required && <span className='text-red-500'>*</span>}
		</label>
	);
};
