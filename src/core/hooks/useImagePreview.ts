import { useState, type ChangeEvent } from 'react';

interface ImagePreviewProps {
	setValue: (file: File | null) => void;
	initialImage?: string;
}

export const useImagePreview = ({ setValue, initialImage }: ImagePreviewProps) => {
	const [previewImage, setPreviewImage] = useState<string | null>(initialImage || null);

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const fileImage = e.target.files?.[0] ?? null;

		if (fileImage) {
			setValue(fileImage);

			if (fileImage.type.match('image.*')) {
				const reader = new FileReader();
				reader.onload = (ev) => {
					if (ev.target?.result) setPreviewImage(ev.target.result as string);
				};
				reader.readAsDataURL(fileImage);
			}
		}
	};

	const removeImage = () => {
		setPreviewImage(null);
		setValue(null);
	};

	return {
		previewImage,
		handleImageChange,
		removeImage,
	};
};
