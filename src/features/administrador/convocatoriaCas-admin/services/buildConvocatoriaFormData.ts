
import type { ConvocatoriaPayload } from './types';
type ConvocatoriaFormInput = Partial<ConvocatoriaPayload>;

export const buildConvocatoriaFormData = (data: ConvocatoriaFormInput) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
 
    if (value instanceof Blob) {
      formData.append(key, value);
    } else {
     
      formData.append(key, String(value));
    }
  });
  return formData;
};

