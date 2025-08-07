import React, { useState, useEffect } from "react";
import api from '../services/api';

import loadingGif from "../assets/img/loading.gif";
import { useNavigate } from 'react-router-dom';
import { formatarCPF } from '../utils/FormatarCPF.jsx';

export default function FormularioRegistro() {

    const [cpf, setCpf] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);

    const [mensagemToast, setMensagemToast] = useState(null);
    const [toastVisivel, setToastVisivel] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (mensagemToast) {
            setToastVisivel(true);
            const timer = setTimeout(() => {
                setToastVisivel(false);
                setMensagemToast(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [mensagemToast]);

    async function handleRegistro(event) {
        event.preventDefault();
        setMensagemToast(null);

        if (!cpf || !nome || !email || !senha) {
            setMensagemToast({ texto: "Por favor, preencha todos os campos.", tipo: "error" });
            return;
        }

        setLoading(true);

        const usuarioParaCadastrar = { nome, email, cpf, senha };

        try {
            await api.post(
                '/banking-api/usuarios/cadastrar',
                usuarioParaCadastrar,
                { headers: { 'Content-Type': 'application/json' }, auth: false }
            );

            setMensagemToast({ texto: 'Parabéns! Estamos te levando para a página de login...', tipo: 'success' });

            setCpf('');
            setNome('');
            setEmail('');
            setSenha('');

            setTimeout(() => {
                navigate('/login');
            }, 6000);

        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            if (error.response) {
                setMensagemToast({
                    texto: `Erro ${error.response.status}: ${error.response.data.message || 'Erro ao cadastrar.'}`,
                    tipo: 'error'
                });
            } else {
                setMensagemToast({ texto: "Erro de rede ou servidor.", tipo: 'error' });
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {loading && (
                <div id="loading-overlay">
                    <div className="loader-container">
                        <img src={loadingGif} alt="Carregando..." />
                    </div>
                </div>
            )}

            {mensagemToast && (
                <div
                    className={`toast no-zoom ${toastVisivel ? "visible" : "hidden"} ${mensagemToast.tipo}`}
                    role="alert"
                >
                    {mensagemToast.texto}
                </div>
            )}

            <form className="login-form" onSubmit={handleRegistro} style={{ opacity: loading ? 0.5 : 1 }}>
                <input
                    type="text"
                    placeholder="CPF"
                    value={cpf}
                    onChange={(e) => setCpf(formatarCPF(e.target.value))}
                    maxLength={14}
                />
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className="password-wrapper">
                    <input
                        type="password"
                        placeholder="Digite uma senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </div>
                <button type="submit" disabled={loading}>Registro</button>
            </form>
        </>
    );

}