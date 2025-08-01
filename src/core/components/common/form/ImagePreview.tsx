import { Trash2 } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface ImagePreviewProps {
	src: string;
	alt?: string;
	onRemove?: () => void;
	className?: string;
	imageClassName?: string;
	removeButtonText?: string;
	showRemoveButton?: boolean;
}

export const ImagePreview = ({
	src,
	alt = 'Vista previa',
	onRemove,
	className,
	imageClassName,
	removeButtonText = 'Eliminar',
	showRemoveButton = true,
}: ImagePreviewProps) => {
	return (
		<div className={cn('flex items-start space-x-3', className)}>
			<img
				src={src}
				alt={alt}
				className={cn('object-cover w-24 h-24 border rounded-lg border-slate-200', imageClassName)}
			/>
			{showRemoveButton && onRemove && (
				<button
					onClick={onRemove}
					className='flex items-center space-x-1 text-sm text-red-600 hover:text-red-800 transition-colors'
					type='button'>
					<Trash2 className='w-4 h-4' />
					<span>{removeButtonText}</span>
				</button>
			)}
		</div>
	);
};
