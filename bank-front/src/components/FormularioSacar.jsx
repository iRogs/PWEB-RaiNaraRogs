import React, { useState, useRef } from 'react';
import api from '../services/api';

export default function FormularioSacar({ onSuccess, saldo }) {
    const [valorRaw, setValorRaw] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const hiddenInputRef = useRef(null);

    const handleInputChange = (e) => {
        const rawValue = e.target.value.replace(/\D/g, '');
        setValorRaw(rawValue);
    };

    const formatDisplayValue = () => {
        if (!valorRaw) return '0,00';
        const number = parseInt(valorRaw, 10) / 100;
        return number.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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
            await api.post('/banking-api/operacoes/sacar', { valor: valorFloat });
            setValorRaw('');
            setSuccess(true);
            setTimeout(() => onSuccess(), 1500);
        } catch (err) {
            if (err.response?.data?.includes("insuficiente")) {
                setError('O saldo atual é insuficiente para realizar o saque.');
            } else {
                setError('Erro ao processar o saque. Tente novamente.');
            }
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
                        <span>{formatDisplayValue()}</span>
                    </div>
                    <p className="disponivel">R$ {saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} disponíveis</p>
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
                        {loading ? <span className="loader" /> : success ? 'Sucesso!' : 'Sacar'}
                    </button>
                </form>
                {error && <p style={{ color: 'white', marginTop: '0.3rem', textShadow: '1px 1px 2px #000' }}>{error}</p>}
            </div>
        </>
    );
}