# API Design

Este projeto tem como objetivo aprofundar-se nas complexidades e boas práticas para implementação de APIs, servindo de guia
para desenvolver uma aplicação segura, robusta e escalável.

# Tópicos cobertos

- Versionamento
- Rate Limits
- Autenticação e Autorização
- Monitoramento
- Documentação
- Testabilidade
- Tratamento de Falhas

# Versionamento

## Introdução

O desenvolvimento de software é um processo de construção extremamente dinâmico e
mutável. Isso significa que durante o desenvolvimento, os requisitos certamente irão mudar
e novos requisitos surgirão com mais frequência do que gostaríamos. Além disso, o próprio
processo de construir envolve mudanças de planejamento e refatorações ao longo
do tempo, mesmo que não haja alteração nos requisitos.

## Motivação

Esse contexto também se aplica na implementação de APIs. O ciclo descrito é bastante
desafiador quando falamos de uma API em construção que ainda não foi publicada em
produção. Na maior parte do tempo, isso ocorre enquanto nossa API já está no ar
e possui usuários ativos que dependem dela. Nesse caso, como garantir que o usuário final
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
Nessa situação em que é necessário manter mais de uma versão dos recursos da API no ar
ao mesmo tempo, precisamos recorrer a algumas estratégias de versionamento.

Como exemplo, vamos utilizar uma API que controla uma rede de supermercados.

### URI

Uma das estratégias mais comuns de versionamento é utilizar um prefixo na URI (Uniform Resource Identifier)
do recurso que deseja versionar. Com essa estratégia, é possível versionar endpoints isolados ou, até,
a API inteira. Essa escolha vai depender da granularidade e objetivo desse versionamento.

Podemos observar a flexibilidade e clareza dessa estratégia de versionamento a seguir:

- Versionar endpoint isolado: https://superrede.com/group/store/v2/financial-resume
- Versionar todos os recursos de um domínio: https://superrede.com/group/v2/store/financial-resume
- Versionar toda a API: https://superrede.com/v2/group/store/financial-resume

### Header ou parâmetro da chamada

Uma alternativa para versionamento também pode ser incluir a versão da API ou recurso
que deseja acessar, por meio de um Header customizado ou parâmetro na própria chamada do
recurso.

- Versionar por meio de um header: curl --location 'https://superrede.com/group/store/financial-resume' \ --header 'Version: v2'
- Versionar por meio de um parâmetro: https://superrede.com/group/store/financial-resume?api-version=2

### Subdomínio

É uma estratégia que atende a um propósito parecido a URI aplicada na raiz da API.
Ou seja, é utilizada para versionar uma API inteira, não alguns recursos ou domínios
específicos. Nela, adicionamos o identificador da versão no próprio domínio da API.

- Versionar com subdomínio: https://v2.superrede.com/group/store/financial-resume

## Versionamento Semântico

O versionamento semântico propõe uma forma padronizada de nomear as versões da sua API. Essa
estratégia permite estabelecer uma comunicação eficiente com seus usuários por meio de um único
canal: a versão do seu software. Com ela, é possível inferir quais tipos de mudanças
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
o conteúdo divulgado deve descrever os detalhes de utilização que o versionamento não cobre,
com foco nas mudanças que geram impacto para o usuário.

# Rate Limits

## Introdução

Como tudo no nosso mundo, os recursos de uma API também são limitados e devem ser gerenciados.
Rate Limits é a técnica utilizada para controlar a taxa de requisições feitas para uma API, com
o objetivo de proteger os recursos do uso excessivo.

## Motivação

Qual a razão para me preocupar com taxa de requisições?
O principal motivo para implementar Rate Limit, é evitar que sua API sofra com lentidão
ao atender novos requests ou até mesmo fique fora do ar. Isso pode ocorrer por alta demanda
dos seus serviços e também ser ocasionado por ataques maliciosos. Além de aumentar a
segurança de sua API, os limites de requisições são fundamentais para gerenciar de forma
saudável o uso de seus usuários legítimos. Logo, o foco é manter os recursos da sua API
disponíveis para todos os seus usuários a todo momento. Podemos citar como bônus de todos
esses benefícios, a redução e controle dos custos da sua API.

## Tipos de Rate Limit

Rate Limit é um termo geral para se referir à limitação das taxas de requisição. Entretanto,
essa solução pode ser aplicada de diversas formas diferentes e em diferentes partes
da sua API. Ou seja, todos os algoritmos podem ser aplicados em diferentes granularidades:

- API
- IPs
- Usuário
- Endpoint
- Quantidade de dados

### Fixed window

- É definido um limite fixo de requisições em uma janela fixa de tempo: 10req/1min - 1000req/60min - 10000req/6hr.
- Cada vez que uma solicitação é recebida, ela é contada dentro da janela de tempo atual.
  Quando a janela de tempo passa, a contagem é redefinida.
- Se o número total de solicitações dentro da janela de tempo exceder o limite permitido, as
  solicitações adicionais são rejeitadas ou atrasadas até o início da próxima janela de tempo.

### Sliding window

- Similar ao Fixed Window, mas em vez de ter intervalos de tempo fixos, a janela de tempo é
  contínua e desliza ao longo do tempo.
- Cada vez que uma solicitação é recebida, ela é contada dentro da janela de tempo deslizante.
  Se a contagem exceder o limite permitido, as solicitações adicionais são rejeitadas ou atrasadas.
- Este método permite uma resposta mais flexível às rajadas de tráfego, pois o limite é verificado
  continuamente e não em intervalos fixos.

### Token bucket

- Este algoritmo usa um modelo de "balde" onde um número fixo de tokens são depositados no balde.
- Cada solicitação requer um ou mais tokens do balde para ser processada. Se não houver tokens
  disponíveis, a solicitação é atrasada ou rejeitada.
- Em uma taxa e quantidade definidas, novos tokens são disponibilizados no balde.
- Este método é útil para suavizar picos de tráfego e manter uma taxa de saída constante ao longo do tempo.

### Leaky bucket

- Similar ao Token bucket, mas em vez de ter tokens disponíveis no balde, possui uma
  quantidade fixa de dados.
- Cada solicitação remove uma quantidade de dados do balde. Se a quantidade de dados do balde
  forem exauridos, as solicitações adicionais são atrasadas ou rejeitadas.
- Em uma taxa e quantidade definidas, os dados são reabastecidos ao balde.

# Autenticação e Autorização

## Introdução

Esse é um dos temas centrais quando se pensa em segurança de uma aplicação. Apesar de cada
um desses termos se referirem a processos distintos, ambos trabalham juntos para garantir
a segurança de uma API.

### Autenticação

A autenticação se refere ao processo de validar a identidade de um usuário. Dessa forma,
é possível atribuir a esse usuário as permissões e direitos associados a ele.

### Autorização

Já a autorização, ocorre quando um usuário já autenticado, deseja realizar uma ação que
requer um nível de privilégio. Assim, o usuário comprova sua identidade para ser autorizado
a acessar esse recurso.

## Motivação

É muito comum que recursos, dados ou funcionalidades de uma API sejam protegidas contra uso livre.
Para qualquer situação em que se deseja restringir o uso de algum recurso, seja por segurança
ou contextos de negócio, é preciso utilizar autenticação e autorização para controlar o acesso
desse recurso somente a usuários autorizados.

## Funcionamento na prática

### Autenticação

Vamos utilizar como exemplo o método mais comum de autenticação que é por meio do login por usuário
e senha.

- O usuário requisita à API acesso ao sistema por meio dos seus identificadores únicos, usuário e senha.
- A API valida se as credenciais estão corretas, gera um token hash criptografado por meio dessas
  credenciais e envia para o usuário.
  Esse é o processo mais comum de autenticação.

### Autorização

Após o usuário ter sido autenticado, é possível utilizar esse token para autorizar o usuário a acessar
recursos restritos.

- Ao realizar uma requisição a algum endpoint protegido da API, o usuário envia no cabeçalho da
  requisição o token que ele recebeu da API como comprovação da sua identidade.
- Quando a API recebe uma requisição a algum recurso restrito, recupera o token fornecido pelo usuário
  e verifica se o token é válido.

Por fim, é possível autorizar o usuário a acessar o recurso, visto que o token comprova sua
identidade.

# Monitoramento

## Introdução

O monitoramento de APIs é a prática de observar e analisar o comportamento de uma aplicação em produção.
Durante esse processo, vários fatores são avaliados, sendo os principais: performance, disponibilidade
e taxa de falhas.

## Motivação

Ao expor uma API para os usuários, é imprescindível que dediquemos esforço para entregarmos uma interface
que funcione, esteja disponível a maior parte do tempo e seja segura. Sem o monitoramento, essa tarefa se
tornaria muito difícil ou quase impossível, visto que não teríamos visibilidade sobre o comportamento da
nossa aplicação em produção.

## Principais parâmetros

### Performance e disponibilidade

Monitorar a disponibilidade da API permite que em caso de queda dos serviços, possamos reagir o mais rápido
possível e minimizar o tempo de indisponibilidade. Já a perfomance pode ser fundamental para agir
preventivamente sobre possíveis causas de indisponibilidade e melhorar a eficiência/tempo de resposta
da nossa aplicação de uma maneira geral.

### Taxa de falhas

Visualizar a taxa de falhas dos serviços, permite agir proativamente na correção de erros ocasionados pelo lançamento
de novas versões ou indisponibilidade de algum recurso.

### Segurança

O monitoramento também pode ajudar a identificar atividades suspeitas que possam indicar tentativas de ataques
ou violações de segurança na API.

### Insights

Acompanhar o uso da API ao longo do tempo fornece insights sobre a demanda dos usuários. Facilitando a
escalabilidade para lidar com aumentos de tráfego e serve de insumo para o planejamento estratégico.

## Benefícios práticos

É possível visualizar as informações mais importantes em nível de recursos da sua aplicação, por exemplo:

- Disponibilidade do endpoint
- Tempo de resposta
- Taxa de falhas, assim como os códigos de status HTTP retornados.
- Os logs e registros feitos pela aplicação, dos dados durante cada interação dos usuários.

Em geral, bons softwares de monitoramento possuem ferramentas que permitem coletar insights
em forma de gráficos e dados estruturados, sobre todas as informações listadas. Existem diversas visualizações
prontas, entretanto, o principal valor está em analisar os dados fornecidos, de forma aderente aos objetivos
de negócio da sua API.

Além disso, a configuração automatizada de alertas para eventos como uma alta taxa de falhas em um serviço,
perda de disponibilidade ou tempos de latência elevados, é altamente personalizável, incluindo a escolha dos
métodos de comunicação para notificar os responsáveis. Essa flexibilidade possibilita a criação de estratégias
robustas para lidar com a saúde da API em ambiente de produção.

# Documentação

## Introdução

Este tópico aborda o conteúdo que descreve como utilizar uma API. Uma documentação clara e objetiva é fundamental
para facilitar o uso da API pelos clientes, funcionando como um manual de instruções sobre a utilização do software.

A documentação pode existir em diferentes formatos e linguagens. Essas representações diversas podem ser usadas
para documentar um mesmo projeto e serem complementares entre si. Não necessariamente é preciso escolher apenas
uma delas para documentar um projeto de software.

## Motivação

As APIs podem oferecer funcionalidades extremamente complexas por meio de abstrações simplificadas. No entanto,
de que serve uma API se as abstrações fornecidas não estão bem documentadas? Se o processo de utilização dessas
abstrações se tornar problemático, a reutilização ainda faz sentido? Em alguns casos, pode ser mais vantajoso
reimplementar essas funcionalidades do zero.

Para evitar que isso aconteça com nosso projeto de API, é essencial desenvolver uma estratégia de documentação que
auxilie o desenvolvedor e facilite o uso de nossas abstrações. Assim, garantimos que reutilizar seja menos problemático
do que reimplementar.

## Documentando sua API

### Formato

Para que sua API esteja bem documentada, ela precisa funcionar como um manual de instruções eficaz. Bons manuais de instruções
têm informações organizadas de forma que facilitam o entendimento e o acesso. Não existe uma regra fixa sobre como organizar e
formatar suas informações, mas o principal ponto é que elas devem estar adequadas ao público e ao contexto que irá consumi-la.
É interessante investigar APIs de contextos semelhantes ao seu e observar como elas estruturam suas documentações.

### O que documentar

Além disso, sua API precisa abordar todos os pontos fundamentais que permitam aos desenvolvedores utilizar seus recursos
corretamente. Cada API pode ter diferentes assuntos indispensáveis na documentação. Aqui estão exemplos de abordagens frequentes
em documentações de APIs em geral:

- Introdução
  - Descrição geral da API, objetivo de sua utilização e quais problemas ela ajuda a resolver.
- Endpoints
  - Lista dos endpoints disponíveis.
  - URL e contrato de utilização de cada endpoint.
- Autenticação
  - Caso exista, detalhar e explicar como funciona a autenticação e autorização para utilizar recursos restritos da API.
- Versionamento
  - Detalhes sobre a estratégia de versionamento da API.
  - Especificar onde encontrar informações sobre as atualizações da API.
- Limitações
  - Documentar a política de rate limits implementada pela API.
  - Informar o usuário sobre possíveis pacotes ou cotas de uso oferecidas.

### Qualidade da documentação

Um bom caminho para melhorar a qualidade da sua documentação é focar nos pontos que são conhecidamente problemáticos nas
documentações de API já existentes. Sendo eles:

- Informações incompletas
  - Descrição de um recurso ou elemento da API não presente onde deveria estar.
- Ambiguidade
  - A descrição de um tópico ou recurso abre margem para mais de uma interpretação.
- Exemplos sem explicação
  - Um exemplo de código que não está devidamente explicado.
- Informações obsoletas
  - Qualquer informação que se refira a versões antigas e que não necessariamente continua sendo verdade.

## Documentação automática

Atualmente, existem diversas ferramentas que têm como objetivo documentar uma API de forma automática. Essas ferramentas
podem ser complementos importantes no conjunto de conteúdos sobre a utilização da sua API.

### Evite documentações incorretas ou obsoletas

Essas ferramentas são interessantes porque são configuráveis no seu projeto e possuem referência cruzada. Isso significa
que as atualizações e alterações feitas no projeto são automaticamente refletidas nas documentações geradas por esses
frameworks. Dessa forma, resolvem um dos problemas mais comuns na documentação de APIs: manter a documentação atualizada
de acordo com o software, evitando que se tornem obsoletas ou incorretas com o tempo.

### Listagem de endpoints e interface de testes

Outro aspecto que torna essas ferramentas muito úteis é a geração automática de uma interface, que permite ao desenvolvedor
não apenas acessar a listagem dos endpoints disponíveis na API, mas também entender os contratos de cada recurso e realizar
chamadas de teste para verificar o comportamento dos endpoints.

### Exemplos

Exemplos de ferramentas de documentação automática de API incluem:

- Swagger
- RAML
- API Blueprint

# Testabilidade

## Introdução

No campo de desenvolvimento de software, é amplamente reconhecida a importância de escrever testes para garantir que a aplicação
funcione como esperado e para minimizar a introdução de erros ocultos. No entanto, para alcançar uma boa cobertura de testes,
é fundamental que o software seja estruturado e construído de maneira que facilite os testes. Caso contrário, o processo de escrever
e testar toda a aplicação pode tornar-se extremamente difícil, e os testes podem não assegurar com tanta precisão a corretude do código.

Essa característica, que determina a facilidade de testar um software e a eficácia dos testes em refletir a conformidade com os requisitos,
é chamada de testabilidade.

## Motivação

Quanto maior a cobertura e a qualidade dos testes de uma API, maior é a segurança ao evoluir o software e lançar versões estáveis.
Isso ocorre porque os testes atuam como uma barreira que garante que, apesar das alterações, tudo continue funcionando corretamente,
ou indicam quando precisam ser ajustados para se adequar a novas funcionalidades ou correções.

Dada a importância da cobertura de testes no desenvolvimento de APIs, facilitar sua implementação e aumentar sua eficiência é crucial.
Por isso, a testabilidade é essencial, pois torna mais fácil escrever testes e aumenta a eficácia deles, simplificando e melhorando
significativamente esse aspecto do desenvolvimento.

## Como melhorar a testabilidade do seu software?

A testabilidade de um código está diretamente relacionada à sua qualidade. Um código bem escrito, modularizado e fácil de manter
geralmente possui alta testabilidade. Portanto, dois dos principais guias para escrever um bom código são fundamentais na construção
de um software altamente testável: SOLID e Clean Code.

### SOLID

O princípio da responsabilidade única (SRP) do SOLID, por exemplo, assegura que cada classe tenha uma única responsabilidade bem definida,
tornando o código mais modular e fácil de isolar para testes. Isso facilita a escrita de testes unitários específicos para cada componente,
garantindo que cada parte da API possa ser testada de forma independente, sem interferências ou dependências excessivas.

O princípio de inversão de dependência (DIP) do SOLID é igualmente importante para a testabilidade. Ao depender de abstrações em vez de
implementações concretas, o código se torna mais flexível e menos acoplado. Isso permite a fácil substituição de dependências reais por mocks
ou stubs durante os testes, proporcionando um ambiente controlado para verificar o comportamento de cada componente da API. A combinação de
DIP com a injeção de dependência (DI) reforça ainda mais essa capacidade, promovendo um design que favorece a criação de testes eficazes e confiáveis.

### Clean Code

Por sua vez, os princípios do Clean Code enfatizam a simplicidade e a legibilidade do código, o que impacta diretamente a testabilidade.
Código limpo é mais fácil de entender e manter, reduzindo a probabilidade de introduzir erros durante a escrita de testes ou ao modificar
o código existente. Práticas como a utilização de nomes de variáveis descritivos, a manutenção de funções curtas e a eliminação de duplicidades
facilitam a identificação de pontos de teste e a criação de casos de teste claros e abrangentes.

Com isso, desenvolvedores podem escrever testes mais rapidamente e com maior precisão, assegurando que a API se comporte conforme esperado
mesmo à medida que evolui.

## Test Driven Development

O TDD, ou Desenvolvimento Orientado a Testes, é uma estratégia de desenvolvimento de software que envolve escrever testes antes da
implementação do código.

Ele consiste em três etapas:

- Red: Escreva um teste que falhe, pois a funcionalidade ainda não foi implementada.
- Green: Escreva o mínimo de código necessário para fazer o teste passar.
- Refactor: Refatore o código para melhorar sua estrutura e qualidade, mantendo todos os testes passando.

Sabemos que é uma prática difícil de seguir rigorosamente em cenários reais, entretanto, é uma excelente forma de melhorar a testabilidade do
código escrito. Pelo fato de o código ser implementado pensando nos testes desde o início, ele já nasce com uma alta taxa de cobertura
e testes que refletem muito bem a corretude do código, pois se beneficiam bastante dessa proximidade com as definições de requisito.

Além disso, pode ser uma excelente estratégia para pessoas que não tem tanta experiência programando, e que enfretariam dificuldade em
desenvolver incorporando bem os princípios SOLID e Clean Code.

# Tratamento de Falhas

## Introdução

Precisamos sempre ter em mente que o cenário esperado chamado de "caminho feliz" na maior parte das vezes não é o único que nosso
código irá processar. Um tratamento eficaz de falhas contribui para a robustez da aplicação, mesmo diante de imprevistos, proporcionando
um serviço mais confiável ao usuário.

## Programação Defensiva

É essencial mantermos uma mentalidade de programação defensiva para que nossa aplicação lide bem com cenários de erro. A ideia não é somente tentar impedir que erros
ocorram, mas sim, dado que eles inevitavelmente ocorrerão, determinar como nossa aplicação reagirá a eles.

O objetivo dessa abordagem é programar de uma forma que, mesmo em casos de erro, o nosso serviço:

- Não pare de funcionar.
- Forneça uma resposta previsível ao usuário (por exemplo, um erro tratado).
- Mantenha a aplicação em um estado consistente, mesmo que isso signifique desfazer alguma ação ou ficar temporariamente indisponível.

## Circuit Breaker

Este é um padrão fundamental no tratamento de falhas em APIs. Ele busca evitar erros em cascata, especialmente em cenários onde um serviço depende de vários outros para funcionar, ou vários outros dependem dele.

Funciona como um disjuntor em um circuito elétrico: configuramos uma taxa de erros de X%. Caso o serviço atinja essa taxa, o disjuntor desarma e o serviço deixa de ser chamado, retornando uma resposta pré-configurada. Esta resposta pode ser um erro tratado ou uma resposta previamente salva em cache, que não depende de uma nova chamada ao serviço com problema.

Este padrão atribui aos serviços três estados para controle:

- Closed: Quando a taxa de erro não atingiu o valor pré-definido e o sistema funciona normalmente.
- Open: Quando a taxa de erro atinge o valor pré-definido, o circuit breaker entra em ação, interrompendo a chamada do serviço e retornando apenas a resposta padrão configurada.
- Half-Open: Após um tempo no estado Open, permite que algumas chamadas sejam feitas para verificar se o erro ainda ocorre. Caso os erros tenham parado, retorna ao estado Closed, interrompendo a ação do circuit breaker.
