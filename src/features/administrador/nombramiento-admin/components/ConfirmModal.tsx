import { X, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'success' | 'error' | 'info';
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  type = 'error',
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          iconBg: 'bg-green-50',
          iconColor: 'text-green-600',
          icon: CheckCircle,
          buttonBg: 'bg-green-600',
          buttonHover: 'hover:bg-green-700',
        };
      case 'info':
        return {
          iconBg: 'bg-blue-50',
          iconColor: 'text-blue-600',
          icon: Info,
          buttonBg: 'bg-blue-600',
          buttonHover: 'hover:bg-blue-700',
        };
      default:
        return {
          iconBg: 'bg-red-50',
          iconColor: 'text-red-600',
          icon: AlertTriangle,
          buttonBg: 'bg-red-600',
          buttonHover: 'hover:bg-red-700',
        };
    }
  };

  const styles = getTypeStyles();
  const IconComponent = styles.icon;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50'>
      <div className='w-full max-w-md bg-white rounded-xl shadow-xl'>
        <div className='flex items-center justify-between p-6 border-b border-slate-200'>
          <div className='flex items-center space-x-3'>
            <div className={`p-2 ${styles.iconBg} rounded-lg`}>
              <IconComponent className={`w-5 h-5 ${styles.iconColor}`} />
            </div>
            <h3 className='text-lg font-semibold text-slate-900'>{title}</h3>
          </div>
          <button onClick={onClose} className='p-2 transition-colors rounded-lg hover:bg-slate-100'>
            <X className='w-5 h-5 text-slate-500' />
          </button>
        </div>

        <div className='p-6'>
          <p className='text-slate-600'>{message}</p>
        </div>

        <div className='flex justify-end p-6 space-x-3 border-t border-slate-200 bg-slate-50 rounded-b-xl'>
          {cancelText && (
            <button
              onClick={onClose}
              className='px-4 py-2 transition-colors bg-white border rounded-lg text-slate-700 border-slate-300 hover:bg-slate-50'>
              {cancelText}
            </button>
          )}
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 text-white transition-colors ${styles.buttonBg} ${styles.buttonHover} rounded-lg`}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
