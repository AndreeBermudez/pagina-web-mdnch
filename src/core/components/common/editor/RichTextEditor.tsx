import { useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';

interface RichTextEditorProps {
	value: string;
	onBlur: (content: string) => void;
	placeholder?: string;
	height?: number;
	disabled?: boolean;
	className?: string;
	label?: string;
	required?: boolean;
	showPreview?: boolean;
}

export const RichTextEditor = ({
	value,
	onBlur,
	placeholder = 'Escriba aquí...',
	height = 300,
	className = '',
	label,
	required = false,
	showPreview = false,
}: RichTextEditorProps) => {
	const editor = useRef(null);

	const config = useMemo(
		() => ({
			readonly: false,
			toolbar: true,
			spellcheck: true,
			language: 'es',
			toolbarButtonSize: 'middle' as const,
			buttons: [
				'bold',
				'italic',
				'underline',
				'|',
				'ul',
				'ol',
				'|',
				'left',
				'center',
				'right',
				'justify',
				'|',
				'fontsize',
				'brush',
				'|',
				'paragraph',
				'|',
				'lineHeight',
				'|',
				'table',
				'link',
				'source',
				'preview',
			],
			removeButtons: ['image', 'video', 'file', 'outdent', 'indent', 'superscript', 'subscript', 'strikethrough'],
			showCharsCounter: false,
			showWordsCounter: false,
			showXPathInStatusbar: false,
			height,
			allowResizeY: false,
			allowResizeX: false,
			toolbarAdaptive: false,
			askBeforePasteHTML: false,
			askBeforePasteFromWord: false,
			addNewLine: false,
			defaultActionOnPaste: 'insert_clear_html' as const,
			placeholder,
		}),
		[height, placeholder]
	);

	useEffect(() => {
		console.log('Editor initialized');
	},[])

	return (
		<div className={`grid gap-2 ${className}`}>
			{label && (
				<label className='text-sm font-medium'>
					{label} {required && <span className='text-red-500'>*</span>}
				</label>
			)}
			<JoditEditor ref={editor} value={value} tabIndex={1} onBlur={onBlur} config={config} />
			{showPreview && (
				<div>
					<label className='text-sm font-medium'>Vista previa</label>
					<div
						className='p-2 text-sm border border-gray-300 rounded-md bg-gray-50'
						dangerouslySetInnerHTML={{ __html: value }}
					/>
				</div>
			)}
		</div>
	);
};
