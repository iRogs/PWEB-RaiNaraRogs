import React, { useState } from 'react';
import api from '../services/api';

export default function FormularioDepositar({ onSuccess }) {
    const [valor, setValor] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await api.post('/banking-api/operacoes/depositar', { valor: parseFloat(valor) });
            alert(response.data);
            onSuccess();
        } catch (err) {
            setError(err.response?.data || 'Erro ao processar depósito.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="modal-form-inputs">
            <input type="number" step="0.01" placeholder="Valor a depositar" value={valor} onChange={e => setValor(e.target.value)} required />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit" className="modal-submit-btn">Depositar</button>
        </form>
    );
}