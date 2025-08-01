import { toast } from 'sonner';

export const useNotifications = () => {
    function success(message: string) {
        toast.success(message, {
            style: {
                backgroundColor: '#10B981',
                color: '#FFFFFF',
                border: '1px solid #059669',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '14px',
                fontWeight: '500',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)',
            }
        });
    }

    function error(message: string) {
        toast.error(message, {
            style: {
                backgroundColor: '#EF4444',
                color: '#FFFFFF',
                border: '1px solid #DC2626',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '14px',
                fontWeight: '500',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.15)',
            }
        });
    }

    function info(message: string) {
        toast.info(message, {
            style: {
                backgroundColor: '#3B82F6',
                color: '#FFFFFF',
                border: '1px solid #2563EB',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '14px',
                fontWeight: '500',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15)',
            }
        });
    }

    function warning(message: string) {
        toast.warning(message, {
            style: {
                backgroundColor: '#F59E0B',
                color: '#FFFFFF',
                border: '1px solid #D97706',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '14px',
                fontWeight: '500',
                boxShadow: '0 4px 12px rgba(245, 158, 11, 0.15)',
            }
        });
    }

    return {
        success,
        error,
        info,
        warning,
    };
};