# API Design

Este projeto tem como objetivo aprofundar-se nas complexidades e boas práticas para implementação de APIs, servindo de guia
para desenvolver uma aplicação segura, robusta e escalável.

# Tópicos cobertos

- Versionamento
- Autenticação e Autorização
- Tratamento de Falhas
- Rate Limits
- Monitoramento
- Testabilidade
- Documentação

# Versionamento

## Introdução
O desenvolvimento de software é um processo de construção extremamente dinâmico e
mutável. Isso significa que durante o desenvolvimento, os requisitos certamente irão mudar
e novos requisitos surgirão mais frequência do que gostaríamos. Além disso, o próprio
processo de construir envolve mudanças de planejamento e refatorações ao longo
do tempo, mesmo que não haja alteração nos requisitos.

## Motivação
Esse contexto também se aplica na implementação de APIs. O ciclo descrito é bastante
desafiador quando falamos de uma API em construção que ainda não foi publicada em
produção. Na maior parte do tempo, isso ocorre enquanto nossa API já está no ar
e possue usuários ativos que dependem dela. Nesse caso, como garantir que o usuário final 
não seja afetado pelas alterações que realizamos em nossa API? Em caso de alterações 
indispensáveis que afetem o usuário final, como comunicar isso de forma assertiva e 
clara? A resposta reside em possuir uma boa estratégia de versionamento.

## Compatibilidade
Esse é a principal razão pela qual devemos versionar nossa API. Quando realizamos uma alteração
no software, é importante estar ciente se essa mudança gera incompatibilidade com versões anteriores.
A definição do que quebra a retrocompatibilidade de uma API, pode variar e ter parâmetros 
específicas para cada contexto. No entanto, existem alterações que mudam o contrato de funcionamento de 
recursos de tal forma que impedem sua utilização sem afetar o usuário.

Alguns exemplos de quebra de retrocompatibilidade são:
- Remoção de recursos ou endpoints da API.
- Alteração na nomenclatura de recursos ou endpoints da API.
- Adição de campos obrigatórios em contratos da API.
- Alteração no formato dos dados retornados por algum recurso da API.
- Mudança no comportamento ou resposta de um recurso.

## Estratégias de versionamento de recursos
Como foi citado anteriormente, em alguns casos, precisamos introduzir alterações e 
novas funcionalidades em recursos já existentes, sem quebrar a retrocompatibilidade.
Nessa situação em que é necessário manter mais de uma versão dos recursos da api, no ar, 
ao mesmo tempo, precisamos recorrer a algumas estratégias de versionamento.  

Como exemplo, vamos utilizar uma API que controla uma rede de supermercados.

### URI
Uma das estratégias mais comuns de versionamento é utilizar um prefixo na URI(Uniform Resource Identifier) 
do recurso que deseja versionar. Com essa estratégia, é possível versionar endpoints isolados ou, até,
a API inteira. Essa escolha, vai depender da granularidade e objetivo desse versionamento.

Podemos observar a flexibilidade e clareza dessa estratégia de versionamento a seguir:
- Versionar endpoint isolado: https://superrede.com/group/store/v2/financial-resume
- Versionar todos os recursos de um domínio: https://superrede.com/group/v2/store/financial-resume
- Versionar toda a API: https://superrede.com/v2/group/store/financial-resume
### Header ou parâmetro da chamada
Uma alternativa para versionamento também pode ser incluir a versão da API ou recurso
que deseja acessar, por meio de um Header customizado ou parâmetro na própria chamada do
recurso.
- Versionar por meio de header: curl --location 'https://superrede.com/group/store/financial-resume' \ --header 'Version: v2'
- Versionar por meio de um parâmetro: https://superrede.com/group/store/financial-resume?api-version=2
### Subdomínio
É uma estratégia que atende a um propósito parecido a URI aplicada na raiz da API.
Ou seja, utilizada para versionar uma API inteira, não alguns recursos ou domínios 
específicos. Nela, adicionamos o identificador da versão no próprio domínio da API.
- Versionar com subdomínio: https://v2.superrede.com/group/store/financial-resume

## Versionamento Semântico
O versionamento semântico propõe uma forma padronizada de nomear as versões da sua API. Essa
estratégia permite estabelecer uma comunicação eficiente com seus usuários por meio de um único
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

## Comunicação
Por fim, um assunto muito importante quando falamos de versionamento, é em como essas versões
e atualizações serão comunicadas ao usuário final da API. É necessário escolher um canal 
de comunicação que seja eficiente, de acordo com o público alvo da sua API. Além disso, 
o conteúdo que será divulgado deve descrever os detalhes de utilização que o versionamento
não cobre, com foco nas mudanças que geram impacto para o usuário. 