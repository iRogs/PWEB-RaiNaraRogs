export function formatRawValue(value) {
    return value.replace(/\D/g, '');
}

export function formatToBRL(valorRaw) {
    if (!valorRaw) return '0,00';
    const number = parseInt(valorRaw, 10) / 100;
    return number.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}