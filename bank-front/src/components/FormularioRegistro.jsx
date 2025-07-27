import React, { useState } from "react";
import axios from 'axios'; // Importe o axios
import { useNavigate } from 'react-router-dom';

export default function FormularioRegistro() {
    const [cpf, setCpf] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    async function handleRegistro(event) {
        event.preventDefault();

        const usuarioParaCadastrar = {
            cpf: cpf,
            nome: nome,
            email: email,
            senha: senha
        };

        try {
            const response = await axios.post('http://10.0.0.106:8082/banking-api/usuarios/cadastrar', usuarioParaCadastrar);
            alert(`Usuário ${response.data.nome} cadastrado com sucesso! Redirecionando para a página de login.`);
            navigate('/login');

            // setCpf('');
            // setNome('');
            // setEmail('');
            // setSenha('');

        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            alert("Não foi possível cadastrar o usuário. Verifique os dados e tente novamente.");
        }
    }
    
  return (
    <form className="login-form" onSubmit={handleRegistro}>
        {}
        <input 
            type="text" 
            placeholder="CPF" 
            value={cpf} 
            onChange={(e) => setCpf(e.target.value)} 
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