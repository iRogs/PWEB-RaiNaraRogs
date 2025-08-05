export function getISODateString(date) {
    return date.toISOString().split('T')[0];
}

export function formatarDataParaAPI(dataString) {
    if (!dataString) return '';
    return `${dataString}T00:00:00`;
}

export function formatarDataFimParaAPI(dataString) {
    if (!dataString) return '';
    return `${dataString}T23:59:59`;
}

export function formatarDataDisplay(dataString) {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}