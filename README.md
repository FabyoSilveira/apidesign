# API Design

Este projeto tem como objetivo aprofundar-se nas complexidades e boas práticas para implementação de APIs, servindo de guia
para desenvolver uma aplicação segura, robusta e escalável.

# Tópicos cobertos

- Autenticação e Autorização
- Tratamento de Falhas
- Rate Limits
- Monitoramento
- Testabilidade
- Versionamento
- Documentação

# Versionamento

## Introdução
    O desenvolvimento de software é um processo de construção extremamente dinâmico e
mutável. Isso significa que durante o desenvolvimento, requisitos certamente irão mudar
e novos requisitos surgirão mais frequência do que gostaríamos. Além disso, o próprio
processo de construir envolve mudanças de planejamento e refatorações ao longo
do tempo, mesmo que não haja alteração nos requisitos.

## Motivação
    Esse contexto também vale para a implementação de APIs. O ciclo descrito é bastante
desafiador quando estamos falando de uma API em construção que ainda não foi publicada em
produção. Entretanto, na maior parte do tempo, isso ocorre enquanto nossa API já está no ar
e possue usuários ativos que dependem dela. Nesse caso, como garantir que o usuário final 
não vai ser afetado pelas alterações e refatorações que realizamos em nossa API? A resposta 
reside em possuir uma boa estratégia de versionamento.
