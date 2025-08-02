import React, { useContext, useState, useEffect, useRef } from 'react';

import api from '../services/api';
import { AuthContext } from '../contexts/AuthContext.jsx';
import '../static/css/PaginaInicial.css';
import pagarIcon from '../assets/img/pagar.png';
import depositarIcon from '../assets/img/depositar.png';
import sacarIcon from '../assets/img/sacar.png';
import cofreIcon from '../assets/img/cofrinho.png';

export default function PaginaInicial() {
    const { usuario, signOut } = useContext(AuthContext);
    const [saldo, setSaldo] = useState(0);
    const [loadingSaldo, setLoadingSaldo] = useState(true);
    const movimentacoesRef = useRef(null);

    useEffect(() => {
        document.title = 'Internet Banking Home';
    }, []);

    useEffect(() => {
        let isMounted = true;

        if (usuario) {
            async function fetchSaldo() {
                try {
                    const response = await api.get('/banking-api/operacoes/saldo');
                    if (isMounted) setSaldo(response.data);
                } catch (error) {
                    console.error("Erro ao buscar saldo:", error);
                } finally {
                    if (isMounted) setLoadingSaldo(false);
                }
            }
            fetchSaldo();
        }

        return () => {
            isMounted = false;
        };
    }, [usuario]);

    // Tentativa de buscar as movimentações (extrato) via API
    // useEffect(() => {
    //     let isMounted = true;

    //     if (usuario) {
    //         async function fetchMovimentacoes() {
    //             try {
    //                 const anoAtual = new Date().getFullYear();
    //                 const inicio = `${anoAtual}-01-01T00:00:00`;
    //                 const fim = `${anoAtual}-12-31T23:59:59`;

    //                 const response = await api.get('/banking-api/operacoes/extrato', {
    //                     params: {
    //                         contaId: usuario.id,
    //                         inicio,
    //                         fim
    //                     }
    //                 });

    //                 if (isMounted) setMovimentacoes(response.data);
    //             } catch (error) {
    //                 console.error("Erro ao buscar movimentações:", error);
    //             } finally {
    //                 if (isMounted) setLoadingMov(false);
    //             }
    //         }

    //         fetchMovimentacoes();
    //     }

    //     return () => {
    //         isMounted = false;
    //     };
    // }, [usuario]);

    if (!usuario) {
        return <div>Carregando...</div>;
    }

    const conta = {
        numero: usuario.id,
        agencia: '0001',
        saldo: saldo,
    };

    const movimentacoes = [
        { data: '24 de Julho', tipo: 'Pagamento realizado', descricao: 'Seguro de Vida', valor: -12.22 },
        { data: '19 de Julho', tipo: 'Compra no débito', descricao: 'Antonio de Souza Salvador Bra', valor: -8.82 },
        { data: '19 de Julho', tipo: 'Pix recebido', descricao: 'Iainara Cerqueira dos Santos - PICPAY SERVIÇOES LTDA', valor: 24.52 },
        { data: '17 de Julho', tipo: 'Pix enviado', descricao: '*********', valor: -7.70 },
    ];

    function handleSignOut() {
        signOut();
    }

    function scrollParaMovimentacoes() {
        movimentacoesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    function formatValor(valor) {
        const formatted = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valor > 0 ? `+${formatted}` : `–${formatted}`;
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
                    <h4>Opera��es R�pidas</h4>
                    <div className="operations-grid">
                        <button className="operation-btn" type="button">
                            <div className="icon-container">
                                <img src={pagarIcon} alt="Pagar" />
                            </div>
                            Pagar
                        </button>
                        <button className="operation-btn" type="button">
                            <div className="icon-container">
                                <img src={depositarIcon} alt="Depositar" />
                            </div>
                            Depositar
                        </button>
                        <button className="operation-btn" type="button">
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
            </main>
        </div>
    );
    
}