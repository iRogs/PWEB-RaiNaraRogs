import React, { useState } from 'react';
import api from '../services/api';

import { formatarParaReal, desformatarReal } from '../utils/FormatarValor';

export default function FormularioSacar({ onSuccess }) {

    const [valor, setValor] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const valorFormatado = formatarParaReal(e.target.value);
        setValor(valorFormatado);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        setSuccess(false);
        const valorFloat = desformatarReal(valor);

        if (valorFloat <= 0) {
            setError('O valor deve ser maior que zero.');
            setLoading(false);
            return;
        }

        try {
            await api.post('/banking-api/operacoes/sacar', {
                valor: valorFloat,
            });
            setValor('');
            setSuccess(true);
            setTimeout(() => {
                onSuccess();
            }, 1500);
        } catch (err) {
        setError('O saldo atual é insuficiente para realizar o saque.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <div className="modal-header">
            <h2>Sacar</h2>
            <button className="modal-close-button" onClick={() => onSuccess(null)} disabled={loading} aria-label="Fechar modal">
            ×
            </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form-inputs" noValidate>
            <input
            type="text"
            placeholder="Valor a sacar"
            value={valor}
            onChange={handleChange}
            required
            disabled={loading}
            aria-label="Valor a sacar"
            maxLength={15}
            inputMode="numeric"
            pattern="[0-9.,]*"
            />

            <button type="submit" className="modal-submit-btn" disabled={loading} aria-busy={loading} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {loading ? (
                <span className="loader" aria-label="Carregando..." />
            ) : success ? (
                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#4BB543"
                strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-label="Sucesso" width="24" height="24">
                <path d="M20 6L9 17l-5-5" />
                </svg>
            ) : (
                'Sacar'
            )}
            </button>
        </form>

        {error && <p style={{ color: 'red', marginTop: '0.3rem' }}>{error}</p>}
        </>
    );
    
}