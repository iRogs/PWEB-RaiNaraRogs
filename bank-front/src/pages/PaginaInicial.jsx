import React, { useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { AuthContext } from '../contexts/AuthContext.jsx';

// Componentes
import FormularioPagar from '../components/FormularioPagar.jsx'; 
import FormularioDepositar from '../components/FormularioDepositar.jsx';
import FormularioSacar from '../components/FormularioSacar.jsx';
import Extrato from '../components/Extrato'; // Importa o componente que busca os dados

// Estilos e Ícones
import '../static/css/PaginaInicial.css'; 
import '../static/css/ModalOperacao.css';
import pagarIcon from '../assets/img/pagar.png';
import depositarIcon from '../assets/img/depositar.png';
import sacarIcon from '../assets/img/sacar.png';
import cofreIcon from '../assets/img/cofrinho.png';

export default function PaginaInicial() {
    
    const { usuario, signOut } = useContext(AuthContext);
    const [saldo, setSaldo] = useState(0);
    const [loadingSaldo, setLoadingSaldo] = useState(true);
    const [modalAberto, setModalAberto] = useState(null); 
    const [refreshTrigger, setRefreshTrigger] = useState(0); // Gatilho para atualizar o extrato

    const fetchSaldo = async () => {
        setLoadingSaldo(true);
        try {
            const response = await api.get('/banking-api/operacoes/saldo');
            setSaldo(response.data);
        } catch (error) {
            console.error("Erro ao buscar saldo:", error);
        } finally {
            setLoadingSaldo(false);
        }
    };

    useEffect(() => {
        document.title = 'Internet Banking Home';
        if (usuario) {
            fetchSaldo();
        }
    }, [usuario]);

    if (!usuario) {
        return <div>Carregando...</div>;
    }

    const abrirModal = (tipo) => {
        setModalAberto(tipo);
    };
    
    const handleOperacaoSuccess = () => {
        setModalAberto(null);
        fetchSaldo();
        setRefreshTrigger(prev => prev + 1); // Dispara a atualização do extrato
    };

    const conta = {
        numero: usuario.id,
        agencia: '0001',
    };

    return (
        <>
            <div className="dashboard-container">
                <aside className="sidebar">
                    <div className="sidebar-header"><h2>Internet Banking</h2></div>
                    <nav className="sidebar-nav">
                        <ul>
                            <li className="active"><a href="#" onClick={e => e.preventDefault()}>Painel</a></li>
                            <li><a href="#" onClick={e => e.preventDefault()}>Transações</a></li>
                            <li><a href="#" onClick={e => e.preventDefault()}>Carteira</a></li>
                            <li><a href="#" onClick={e => e.preventDefault()}>Configurações</a></li>
                        </ul>
                    </nav>
                    <div className="sidebar-footer"><a onClick={signOut} style={{ cursor: 'pointer' }}>Sair</a></div>
                </aside>

                <main className="main-content">
                    <header className="main-header">
                        <div className="welcome-message">Olá {usuario.nome}! Seja bem vindo!</div>
                        <div className="user-profile">
                            <div className="user-avatar"></div>
                            <div className="user-details"><span>{usuario.nome}</span><small>Priority account</small></div>
                        </div>
                    </header>

                    <section className="account-overview">
                        <div className="account-card">
                            <div className="card-header">
                                <span>Conta</span>
                                <a href="#extrato-section" onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById('extrato-section')?.scrollIntoView({ behavior: 'smooth' });
                                }}>Ver Extrato</a>
                            </div>
                            <div className="card-body">
                                <span className="account-number">@{conta.numero}</span>
                                <span className="agency">Agência {conta.agencia}</span>
                            </div>
                            <div className="card-footer">
                                <span>Saldo em conta</span>
                                <span className="balance">
                                    {loadingSaldo ? 'Carregando...' : saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </span>
                            </div>
                        </div>
                    </section>

                    <section className="quick-operations">
                        <h4>Operações Rápidas</h4>
                        <div className="operations-grid">
                            <button className="operation-btn" type="button" onClick={() => abrirModal('pagar')}><div className="icon-container"><img src={pagarIcon} alt="Pagar" /></div>Pagar</button>
                            <button className="operation-btn" type="button" onClick={() => abrirModal('depositar')}><div className="icon-container"><img src={depositarIcon} alt="Depositar" /></div>Depositar</button>
                            <button className="operation-btn" type="button" onClick={() => abrirModal('sacar')}><div className="icon-container"><img src={sacarIcon} alt="Sacar" /></div>Sacar</button>
                            <button className="operation-btn-cofre" type="button"><div className="icon-container"><img src={cofreIcon} alt="Cofre" style={{ filter: 'grayscale(1)' }} /></div>Porquinho</button>
                        </div>
                    </section>
                    
                    <div id="extrato-section">
                        {/* O componente Extrato é chamado aqui, com o gatilho para recarregar */}
                        <Extrato usuario={usuario} refreshTrigger={refreshTrigger} />
                    </div>
                </main>
            </div>

            {/* CÓDIGO DO MODAL CORRIGIDO */}
            {modalAberto && (
                <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setModalAberto(null); }}>
                    <div className="modal-operacao-container">
                        {/*
                          Cada formulário (Pagar, Depositar, Sacar) já tem seu próprio título e botão de fechar.
                          A estrutura deve ser limpa assim para funcionar.
                        */}
                        {modalAberto === 'pagar' && (
                            <FormularioPagar onSuccess={handleOperacaoSuccess} saldo={saldo}/>
                        )}
                        {modalAberto === 'depositar' && (
                            <FormularioDepositar onSuccess={handleOperacaoSuccess}  saldo={saldo}/>
                        )}
                        {modalAberto === 'sacar' && (
                            <FormularioSacar onSuccess={handleOperacaoSuccess} saldo={saldo}/>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}