import type { ReactNode } from 'react';

type ContentSectionProps = {
	title: string;
	children: ReactNode;
};

export default function ContentSection({ title, children }: ContentSectionProps) {
	return (
		<div className='bg-white rounded-xl shadow-md p-6 sm:p-8 border border-blue-100'>
			<h2 className='text-2xl font-bold text-gray-900 mb-4'>{title}</h2>
			<div className='prose prose-amber max-w-none'>{children}</div>
		</div>
	);
}
