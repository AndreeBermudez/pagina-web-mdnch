import { useNotifications } from "../hooks/useNotifications";

export function useFormatErrors() {
    const { error } = useNotifications();

    function onError(errors: unknown) {
        if (errors && typeof errors === 'object') {
            Object.values(errors).forEach((err) => {
                if (err?.message) {
                    error(err.message);
                } else if (Array.isArray(err)) {
                    err.forEach((arrayError) => {
                        if (arrayError?.message) {
                            error(arrayError.message);
                        }
                    });
                }
            });
        }
    }

    return { onError };
}