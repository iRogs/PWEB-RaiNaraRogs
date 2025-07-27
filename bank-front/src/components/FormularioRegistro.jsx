import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import loadingGif from "../assets/img/loading.gif";

export default function FormularioRegistro() {
    const [cpf, setCpf] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    function formatarCPF(valor) {
        return valor
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
            .slice(0, 14);
    }

    async function handleRegistro(event) {
        event.preventDefault();

        if (!cpf || !nome || !email || !senha) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        setLoading(true);

        const usuarioParaCadastrar = {
            nome,
            email,
            cpf,
            senha
        };

        try {
            const response = await axios.post(
                'http://192.168.18.3:8082/banking-api/usuarios/cadastrar',
                usuarioParaCadastrar,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            setCpf('');
            setNome('');
            setEmail('');
            setSenha('');
            navigate('/login');
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            if (error.response) {
                alert(`Erro ${error.response.status}: ${error.response.data.message || 'Erro ao cadastrar.'}`);
            } else {
                alert("Erro de rede ou servidor.");
            }
        } finally {
            setLoading(false);
        }
    }

    if (loading) {

        return (
            <div id="loading-overlay">
                <div className="loader-container">
                    <img src={loadingGif} alt="Carregando..." />
                </div>
            </div>
        );

    }

    return (
        <form className="login-form" onSubmit={handleRegistro}>
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
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
            </div>
            <button type="submit">Registro</button>
        </form>
    );
    
}