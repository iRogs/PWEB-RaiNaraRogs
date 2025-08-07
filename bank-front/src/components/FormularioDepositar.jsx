import React, { useState, useRef } from 'react';
import api from '../services/api';
import { formatRawValue, formatToBRL } from '../utils/FormatarValor.jsx';

export default function FormularioDepositar({ onSuccess, saldo }) {

    const [valorRaw, setValorRaw] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const hiddenInputRef = useRef(null);

    const handleInputChange = (e) => {
        setValorRaw(formatRawValue(e.target.value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const valorFloat = parseFloat(valorRaw) / 100;

        if (!valorFloat || valorFloat <= 0) {
            setError('O valor deve ser maior que zero.');
            return;
        }

        setLoading(true);
        setSuccess(false);

        try {
            await api.post('/banking-api/operacoes/depositar', { valor: valorFloat });
            setValorRaw('');
            setSuccess(true);
            setTimeout(() => onSuccess(), 1500);
        } catch (err) {
            const msg = err.response?.data || 'Erro ao processar depósito.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="modal-header-white">
                <button type="button" className="modal-close-button" onClick={() => onSuccess(null)}>&times;</button>
            </div>

            <div className="modal-content-area">
                <div className="modal-valor-input-area" onClick={() => hiddenInputRef.current?.focus()}>
                    <h2 className="titulo">Selecione o valor</h2>
                    <div className="valor">
                        <span className="prefixo">R$</span>
                        <span>{formatToBRL(valorRaw)}</span>
                    </div>
                    <p className="disponivel">Seu saldo atual é de R$ {saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                    <input
                        ref={hiddenInputRef}
                        type="tel"
                        value={valorRaw}
                        onChange={handleInputChange}
                        style={{ position: 'absolute', opacity: 0, width: '1px', height: '1px', pointerEvents: 'none' }}
                        aria-hidden="true"
                        autoFocus
                    />
                    <button type="submit" className="modal-submit-btn" disabled={loading} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {loading ? <span className="loader" /> : success ? (
                        <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                            fill="none" stroke="#4BB543" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                            width="24" height="24">
                            <path d="M20 6L9 17l-5-5" />
                        </svg>
                    ) : 'Depositar'}
                    </button>
                </form>
                {error && <p style={{ color: 'white', marginTop: '0.3rem', textShadow: '1px 1px 2px #000' }}>{error}</p>}
            </div>
        </>
    );

}