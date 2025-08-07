# PWEB-RaiNaraRogs

É necessário primeiro criar e setar as configurações do Banco de dados PostegreSQL.
Cria-se primeiro os databases: "bank-api", "email" e "usuarios"
Após isso, acesse a pasta "bank-front" e crie o arquivo local ".env.local"
    Dentro do arquivo local adicione:
        - VITE_API_BASE_URL=http://IP_DA_SUA_MAQUINA:8082

    Você pode consultar seu IP em "http://localhost:8081/" na seção de "Instance Info"