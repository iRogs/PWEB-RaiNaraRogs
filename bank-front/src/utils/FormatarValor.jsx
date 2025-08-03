export function formatarParaReal(valor) {
  const valorNumerico = valor.replace(/\D/g, '');
  const numero = parseInt(valorNumerico, 10) / 100;
  return numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function desformatarReal(valorFormatado) {
  return parseFloat(valorFormatado.replace(/[R$\s.]/g, '').replace(',', '.')) || 0;
}