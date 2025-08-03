import React, { useContext, useState, useEffect, useRef } from 'react';

import api from '../services/api';
import { AuthContext } from '../contexts/AuthContext.jsx';
import '../static/css/PaginaInicial.css'; 
import '../static/css/ModalOperacao.css';
import pagarIcon from '../assets/img/pagar.png';
import depositarIcon from '../assets/img/depositar.png';
import sacarIcon from '../assets/img/sacar.png';
import cofreIcon from '../assets/img/cofrinho.png';

import FormularioPagar from '../components/FormularioPagar.jsx'; 
import FormularioDepositar from '../components/FormularioDepositar.jsx';
import FormularioSacar from '../components/FormularioSacar.jsx';

export default function PaginaInicial() {
    
    const { usuario, signOut } = useContext(AuthContext);
    const [saldo, setSaldo] = useState(0);
    const [loadingSaldo, setLoadingSaldo] = useState(true);
    const [modalAberto, setModalAberto] = useState(null); 
    const movimentacoesRef = useRef(null);

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

    const conta = {
        numero: usuario.id,
        agencia: '0001',
        saldo: saldo,
    };

    const movimentacoes = [
        { data: '24/07', tipo: 'Pagamento realizado', descricao: 'Seguro de Vida', valor: -12.22 },
        { data: '19/07', tipo: 'Compra no débito', descricao: 'Antonio de Souza Salvador Bra', valor: -8.82 },
        { data: '19/07', tipo: 'Pix recebido', descricao: 'Iainara Cerqueira dos Santos', valor: 24.52 },
        { data: '17/07', tipo: 'Pix enviado', descricao: '*********', valor: -7.70 },
    ];

    function abrirModal(tipo) {
        setModalAberto(tipo);
        console.log(`Modal aberto: ${tipo}`);
    }
    
    const handleOperacaoSuccess = () => {
        setModalAberto(null);
        fetchSaldo();
    };

    function handleSignOut() {
        signOut();
    }

    function scrollParaMovimentacoes() {
        movimentacoesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    function formatValor(valor) {
        const formatted = Math.abs(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valor >= 0 ? `+ ${formatted}` : `- ${formatted}`;
    }

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h2>Internet Banking</h2>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li className="active"><a href="#painel" onClick={e => e.preventDefault()}>Painel</a></li>
                        <li><a href="#transacoes" onClick={e => e.preventDefault()}>Transações</a></li>
                        <li><a href="#carteira" onClick={e => e.preventDefault()}>Carteira</a></li>
                        <li><a href="#configuracoes" onClick={e => e.preventDefault()}>Configurações</a></li>
                    </ul>
                </nav>
                <div className="sidebar-footer">
                  <a onClick={handleSignOut} style={{ cursor: 'pointer' }}>Sair</a>
                </div>
            </aside>

            <main className="main-content">
                <header className="main-header">
                    <div className="welcome-message">Olá {usuario.nome}!</div>
                    <div className="user-profile">
                        <div className="user-avatar"></div>
                        <div className="user-details">
                            <span>{usuario.nome}</span>
                            <small>Editar perfil</small>
                        </div>
                    </div>
                </header>

                <section className="account-overview">
                    <div className="account-card">
                        <div className="card-header">
                            <span>Conta</span>
                            <a href="#movimentacoes" onClick={(e) => { e.preventDefault(); scrollParaMovimentacoes(); }}>Ver Extrato</a>
                        </div>
                        <div className="card-body">
                            <span className="account-number">@{conta.numero}</span>
                            <span className="agency">Agência {conta.agencia}</span>
                        </div>
                        <div className="card-footer">
                            <span>Saldo em conta</span>
                            <span className="balance">
                                {loadingSaldo ? 'Carregando...' : conta.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </span>
                        </div>
                    </div>
                </section>

                <section className="quick-operations">
                    <h4>Operações Rápidas</h4>
                    <div className="operations-grid">
                       <button className="operation-btn" type="button" onClick={() => abrirModal('pagar')}>
                            <div className="icon-container">
                                <img src={pagarIcon} alt="Pagar" />
                            </div>
                            Pagar
                        </button>
                        <button className="operation-btn" type="button" onClick={() => abrirModal('depositar')}>
                            <div className="icon-container">
                                <img src={depositarIcon} alt="Depositar" />
                            </div>
                            Depositar
                        </button>
                       <button className="operation-btn" type="button" onClick={() => abrirModal('sacar')}>
                            <div className="icon-container">
                                <img src={sacarIcon} alt="Sacar" />
                            </div>
                            Sacar
                        </button>
                        <button className="operation-btn-cofre" type="button">
                            <div className="icon-container">
                                <img src={cofreIcon} alt="Cofre" style={{ filter: 'grayscale(1)' }} />
                            </div>
                            Cofre
                        </button>
                    </div>
                </section>

                <section ref={movimentacoesRef} id="movimentacoes" className="latest-transactions">
                    <h4>Últimas movimentações</h4>
                    {movimentacoes.map((mov, index) => (
                        <div key={index} className="movimentacao-item">
                            <div className="movimentacao-data">{mov.data}</div>
                            <div className="movimentacao-info">
                                {mov.tipo}
                                <p>{mov.descricao}</p>
                            </div>
                            <div className={`movimentacao-valor ${mov.valor > 0 ? 'positivo' : 'negativo'}`}>
                                {formatValor(mov.valor)}
                            </div>
                        </div>
                    ))}
                </section>

                {modalAberto && (
                    <div className="modal-overlay">
                        <div className={`modal-operacao-container${modalAberto === 'pagar' ? '-pagar' : ''}`}>
                            <button className="modal-close-button" onClick={() => setModalAberto(null)}>&times;</button>

                            {modalAberto === 'pagar' && (
                                <FormularioPagar onSuccess={handleOperacaoSuccess} />
                            )}
                            {modalAberto === 'depositar' && (
                                <FormularioDepositar onSuccess={handleOperacaoSuccess} />
                            )}
                            {modalAberto === 'sacar' && (
                                <FormularioSacar onSuccess={handleOperacaoSuccess} />
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );

}