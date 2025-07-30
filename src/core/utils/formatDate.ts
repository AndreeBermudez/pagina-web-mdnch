const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

export const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

export const formatTime = (timeString: string) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
}

export const returnDay = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return String(date.getDate()).padStart(2, '0');
}

export const returnMonth = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return monthNames[date.getMonth()];
}