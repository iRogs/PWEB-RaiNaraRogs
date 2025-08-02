import React, { useState } from 'react';
import api from '../services/api';

export default function FormularioPagar({ onSuccess }) {
    const [valor, setValor] = useState('');
    const [descricao, setDescricao] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await api.post('/banking-api/operacoes/pagar', {
                valor: parseFloat(valor),
                descricao: descricao
            });
            alert(response.data);
            onSuccess(); // Chama a função de sucesso (fechar modal e atualizar saldo)
        } catch (err) {
            setError(err.response?.data || 'Erro ao processar pagamento.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="modal-form-inputs">
            <input type="number" step="0.01" placeholder="Valor do pagamento" value={valor} onChange={e => setValor(e.target.value)} required />
            <input type="text" placeholder="Descrição (ex: Conta de luz)" value={descricao} onChange={e => setDescricao(e.target.value)} required />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit" className="modal-submit-btn">Pagar</button>
        </form>
    );
}