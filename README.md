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
desafiador quando falamos de uma API em construção que ainda não foi publicada em
produção. Na maior parte do tempo, isso ocorre enquanto nossa API já está no ar
e possue usuários ativos que dependem dela. Nesse caso, como garantir que o usuário final 
não vai ser afetado pelas alterações que realizamos em nossa API? Em caso de alterações 
indispensáveis que afetem o usuário final, como comunicar isso de forma assertiva e 
clara? A resposta reside em possuir uma boa estratégia de versionamento.

## Compatibilidade
Esse é o principal motivo pelo qual devemos versionar nossa API. Quando realizamos uma alteração
no software é importante definirmos se essa mudança gera incompatibilidade com versões anteriores.
A definição do que quebra a retrocompatibilidade de uma API, pode variar e ter definições 
específicas para cada contexto, porém, existem alterações que mudam o contrato de funcionamento de 
recursos de tal forma, impedindo a utilização dele sem afetar o usuário.

Alguns exemplos de quebra de retrocompatibilidade, são:
- Remoção de recursos ou endpoints da API.
- Alteração na nomenclatura de recursos ou endpoints da API.
- Adição de campos obrigatórios em contratos da API.
- Alteração no formato dos dados retornados por algum recurso da API.
- Mudança no comportamento ou resposta de um recurso.

## Estratégias de versionamento
## Versionamento Semântico
O versionamento semântico propõe uma forma padronizada de nomear as versões da sua API. Essa
estratégia, permite estabelecer uma comunicação eficiente com seus usuários por meio de um único
canal, que é a versão do seu software. Com ela, é possível inferir quais tipos de mudanças 
a aplicação sofreu. Consiste em três números separados por pontos: 'MAJOR.MINOR.PATCH'.
### Major
Indica atualizações com mudanças que quebram a compatibilidade com versões anteriores. Por exemplo, 
uma mudança de 1.x.x para 2.x.x sugere incompatibilidade, comunicando aos usuários que adaptações 
em seus códigos serão necessárias para continuar utilizando a API.
### Minor
Representa adições ou melhorias ao software sem quebrar a compatibilidade com versões anteriores. 
Por exemplo, uma atualização de 1.1.x para 1.2.x traz novos recursos ou melhorias.
### Patch
Indica correções de bugs ou problemas encontrados na API, sem introduzir novos recursos. Por exemplo, 
uma mudança de 2.3.1 para 2.3.2 sugere correções de falhas.
