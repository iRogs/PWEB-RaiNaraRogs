import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import '../styles/css/Extrato.css';
import {
    formatarDataParaAPI,
    formatarDataFimParaAPI,
    getISODateString,
    formatarDataDisplay
} from '../utils/FormatarData.jsx';

const hoje = new Date();
const trintaDiasAtras = new Date();
trintaDiasAtras.setDate(hoje.getDate() - 30);

const dataFimPadrao = getISODateString(hoje);
const dataInicioPadrao = getISODateString(trintaDiasAtras);

export default function Extrato({ usuario, refreshTrigger }) {
    const [movimentacoes, setMovimentacoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataInicio, setDataInicio] = useState(dataInicioPadrao);
    const [dataFim, setDataFim] = useState(dataFimPadrao);
    const [tipo, setTipo] = useState('');
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [itensPorPagina] = useState(5); 

    const fetchMovimentacoes = useCallback(async () => {
        if (!usuario) return;
        setLoading(true);

        const params = {
            inicio: formatarDataParaAPI(dataInicio),
            fim: formatarDataFimParaAPI(dataFim),
            page: paginaAtual, 
            size: itensPorPagina, 
            sort: 'data,desc' 
        };

        if (tipo) {
            params.tipo = tipo;
        }

        try {
            const response = await api.get('/banking-api/operacoes/extrato', { params });
            
            if (response.data && Array.isArray(response.data.content)) {
                setMovimentacoes(response.data.content); 
                setTotalPaginas(response.data.totalPages); 
            } else {
                setMovimentacoes([]);
                setTotalPaginas(0);
            }
        } catch (error) {
            console.error("Erro ao buscar movimentações:", error);
            setMovimentacoes([]);
            setTotalPaginas(0);
        } finally {
            setLoading(false);
        }
    }, [usuario, dataInicio, dataFim, tipo, paginaAtual, itensPorPagina]);

    useEffect(() => {
        fetchMovimentacoes();
    }, [fetchMovimentacoes, refreshTrigger]);

    const handleFiltrarClick = () => {
        setPaginaAtual(0);
        fetchMovimentacoes();
    };
    
    const formatarDataDisplay = (dataString) => {
        const data = new Date(dataString);
        return data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    return (
        <section id="movimentacoes" className="extrato-container">
            <h4>Últimas movimentações</h4>
            
            <div className="extrato-filtros">
                <div className="filtro-grupo">
                    <label htmlFor="data-inicio">Data Início</label>
                    <input id="data-inicio" type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
                </div>
                <div className="filtro-grupo">
                    <label htmlFor="data-fim">Data Fim</label>
                    <input id="data-fim" type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
                </div>
                <div className="filtro-grupo">
                    <label htmlFor="tipo-operacao">Tipo</label>
                    <select id="tipo-operacao" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                        <option value="">Todos</option>
                        <option value="DEPOSITO">Depósito</option>
                        <option value="SAQUE">Saque</option>
                        <option value="PAGAMENTO">Pagamento</option>
                    </select>
                </div>
            </div>

            <div className="extrato-lista">
                {loading ? (
                    <p className="loading-extrato">A carregar movimentações...</p>
                ) : movimentacoes.length > 0 ? (
                    movimentacoes.map((mov) => {
                        
                        const isDeposito = mov.tipo === 'DEPOSITO';
                        const valorClasse = isDeposito ? 'positivo' : 'negativo';
                        const valorSinal = isDeposito ? '+' : '-';
                        const valorFormatado = Math.abs(mov.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

                        return (
                            <div key={mov.id} className="movimentacao-item">
                                <div className="movimentacao-data">{formatarDataDisplay(mov.data)}</div>
                                <div className="movimentacao-info">
                                    <strong>{mov.tipo.charAt(0).toUpperCase() + mov.tipo.slice(1).toLowerCase()}</strong>
                                    <p>{mov.descricao}</p>
                                </div>
                                <div className={`movimentacao-valor ${valorClasse}`}>
                                    {valorSinal} {valorFormatado}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="extrato-vazio">Nenhuma movimentação encontrada para os filtros selecionados.</p>
                )}
            </div>
             {totalPaginas > 1 && (
            <div className="paginacao-controles">
                <button 
                    onClick={() => setPaginaAtual(p => p - 1)} 
                    disabled={paginaAtual === 0 || loading}
                >
                    Anterior
                </button>
                <span>
                    Página {paginaAtual + 1} de {totalPaginas}
                </span>
                <button 
                    onClick={() => setPaginaAtual(p => p + 1)} 
                    disabled={paginaAtual >= totalPaginas - 1 || loading}
                >
                    Próxima
                </button>
            </div>
        )}
        </section>
    );
    
}