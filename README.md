# API Design

# Introdução

APIs (Application Programming Interfaces) são interfaces que permitem a comunicação entre diferentes sistemas, aplicações ou serviços,
facilitando o compartilhamento de dados e funcionalidades. Atualmente, elas desempenham um papel fundamental no desenvolvimento de software, pois promovem a integração
e a escalabilidade de sistemas.

# Motivação

Uma aplicação com boas decisões de design é essencial para garantir sua usabilidade, segurança, manutenibilidade e eficiência. Um design bem feito assegura
que as APIs sejam intuitivas para desenvolvedores, reduzindo o tempo de aprendizado e os erros de utilização. Além disso, APIs bem projetadas
promovem consistência, facilitam a adaptação a mudanças futuras e maximizam o impacto que podem gerar no contexto em que estão inseridas.

O tema pode assumir diferentes representações na prática, considerando a variedade de tecnologias disponíveis para a construção de aplicações. Essa diversidade
evidencia a necessidade de desenvolver uma aplicação utilizando ferramentas específicas, a fim de aplicar concretamente os conceitos discutidos no
artigo da primeira entrega.

# Objetivo

Este projeto tem como objetivo o desenvolvimento de uma API que sirva como um guia prático, contemplando todos os tópicos indispensáveis na construção
de uma boa aplicação. O foco da API implementada não são seus requisitos funcionais, mas sim aspectos não funcionais, compostos pelas decisões de
design e arquitetura.

Este documento abordará, de forma técnica, como cada tópico foi implementado.

# Contexto da API

A aplicação foi desenvolvida utilizando a linguagem de programação javascript em conjunto com o framework NestJS.

O contexto escolhido para a API de exemplo foi o universo de filmes. Ela utiliza como client a API do The Movie Database ([TMDb](https://developer.themoviedb.org/docs/getting-started)), abstraindo
e utilizando os serviços disponíveis nesse client para compor os seus próprios serviços. A API permite a busca por filmes, atores,
avaliações e outros dados relacionados, garantindo que os consumidores possam acessar essas informações de forma simplificada e bem estruturada.

# Tópicos indispensáveis na construção do design da API

O levantamento e estudo de todos esses tópicos foi realizado no projeto da POC1, e o artigo construído foi usado como base para o levantamento dos requisitos
de implementação do sistema de exemplo. Os tópicos implementados estão listados abaixo:

- Versionamento
- Rate Limits
- Autenticação e Autorização
- Monitoramento
- Documentação
- Testabilidade
- Tratamento de Falhas

# Detalhamento das Rotas do Sistema

A API oferece serviços em dois módulos principais: **Auth** e **Movie**, cada um com seus respectivos controladores e serviços. A seguir,
detalhamos as rotas e suas funcionalidades:

## Módulo Auth

O módulo de autenticação (Auth) é responsável pelo gerenciamento de usuários e autenticação no sistema. Ele disponibiliza duas rotas principais:

- **`POST /auth/signup`**  
  Essa rota permite o cadastro de novos usuários no sistema. Ela recebe um Data Transfer Object (DTO) contendo as informações do usuário (username, e-mail, senha). Internamente, essa funcionalidade utiliza o método `createUser`, encapsulado no módulo `User`, para persistir os dados do usuário no banco de dados.

- **`POST /auth/login`**  
  A rota de login autentica usuários cadastrados no sistema. Ela recebe as credenciais do usuário (e-mail e senha) e as verifica por meio do módulo `User`, que busca
  as informações no banco de dados. Caso as credenciais estejam corretas, a rota retorna um token de autorização, permitindo o acesso às funcionalidades do
  módulo Movie protegidas da API.

## Módulo Movie

O módulo principal da API é o de filmes (Movie), que fornece integração com uma base de dados externa para busca de informações sobre filmes e atores/atrizes. Ele oferece quatro rotas principais:

- **`GET /v1/movie/actors/:id`**  
  Permite buscar informações detalhadas sobre um ator ou atriz a partir do ID do IMDB.

- **`GET /v1/movie/:id`**  
  Fornece informações detalhadas sobre um filme a partir do ID do IMDB.

- **`GET /v1/movie/search`**  
  Realiza buscas de filmes por título. Essa rota suporta pesquisas que podem retornar múltiplos resultados, como quando o título buscado corresponde a mais de um filme registrado na base.

- **`GET /v1/movie/actors/search`**  
  Busca atores e atrizes por nome. Assim como a busca por filmes, essa rota pode retornar vários resultados dependendo da correspondência com o nome informado.

## Arquitetura e Consistência do Módulo Movie

O módulo Movie utiliza o padrão de adaptadores, que é robusto para lidar com integrações externas. Ele conta com uma classe chamada `MovieClientAdapter`, que intermedia as chamadas ao cliente de filmes (MovieClient). Essa classe adapta os dados retornados pela API do provedor externo para o formato esperado pelo domínio da nossa API.

Essa estratégia oferece uma vantagem significativa: se houver necessidade de trocar o provedor de dados de filmes no futuro, a alteração será isolada no cliente e no adaptador, preservando a lógica do módulo Movie e garantindo a consistência dos contratos da API.

# Versionamento

## Introdução

O desenvolvimento de software é um processo de construção extremamente dinâmico e
mutável. Isso significa que durante o desenvolvimento, os requisitos certamente irão mudar
e novos requisitos surgirão com mais frequência do que gostaríamos. Além disso, o próprio
processo de construir envolve mudanças de planejamento e refatorações ao longo
do tempo, mesmo que não haja alteração nos requisitos.

Esse contexto também se aplica na implementação de APIs. O ciclo descrito é bastante
desafiador quando falamos de uma API em construção que ainda não foi publicada em
produção. Na maior parte do tempo, isso ocorre enquanto nossa API já está no ar
e possui usuários ativos que dependem dela. Nesse caso, como garantir que o usuário final
não seja afetado pelas alterações que realizamos em nossa API? Em caso de alterações
indispensáveis que afetem o usuário final, como comunicar isso de forma assertiva e
clara? A resposta reside em possuir uma boa estratégia de versionamento.

## Descrição da implementação

Na API desenvolvida, implementei o versionamento de recursos utilizando uma abordagem baseada em URIs. Isso significa que a versão é identificada
diretamente no caminho das rotas, como /v1/resource, tornando o versionamento explícito e facilmente reconhecível pelos consumidores de cada recurso.

### Padrão de Versão MMP

Adotamos o padrão MMP (Major.Minor.Patch) para definir a versão da API, que funciona da seguinte forma:

- Major (Mudanças Principais): Indica alterações significativas que podem quebrar a compatibilidade com versões anteriores.
- Minor (Novas Funcionalidades): Introduz novas funcionalidades sem afetar os recursos existentes.
- Patch (Correções): Refere-se a pequenas melhorias ou correções de bugs sem alterar o comportamento geral da API.

A versão atual da API foi estabelecida como 1.0.1, refletindo seu estado inicial, com uma base estável e melhorias incrementais.

### Implementação no NestJS

O módulo de filmes, principal e mais utilizado na API, teve seu versionamento configurado diretamente nos controladores. No NestJS, é possível
definir a versão de um controlador no próprio decorador da classe, o que facilita a aplicação automática de prefixos como v1 em todas as rotas pertencentes a ele.
Por exemplo, o controlador do módulo de filmes foi configurado para usar o prefixo /v1/movie, garantindo que todas as rotas desse módulo estejam claramente associadas à versão 1.

```typescript
@Controller({ path: 'movie', version: '1' })
export class MovieController {}
```

Essa abordagem traz duas vantagens importantes:

- Flexibilidade para manutenção: No futuro, será possível introduzir novas versões do módulo (como /v2/movie) sem descontinuar a versão anterior imediatamente, permitindo uma transição suave para os usuários.
- Organização e clareza: Ao versionar diretamente no decorador do controlador, o código permanece limpo e centralizado, refletindo claramente as versões disponíveis.

Embora o versionamento seja uma necessidade mais evidente à medida que a API cresce e atinge um público maior, é uma boa prática estruturar desde o início com suporte a múltiplas versões. Isso evita retrabalho e garante que a API possa evoluir sem impactar negativamente os consumidores que dependem dela.

# Rate Limits

## Introdução

Como tudo no nosso mundo, os recursos de uma API também são limitados e devem ser gerenciados.
Rate Limits é a técnica utilizada para controlar a taxa de requisições feitas para uma API, com
o objetivo de proteger os recursos do uso excessivo.

Qual a razão para me preocupar com taxa de requisições?
O principal motivo para implementar Rate Limit, é evitar que sua API sofra com lentidão
ao atender novos requests ou até mesmo fique fora do ar. Isso pode ocorrer por alta demanda
dos seus serviços e também ser ocasionado por ataques maliciosos. Além de aumentar a
segurança de sua API, os limites de requisições são fundamentais para gerenciar de forma
saudável o uso de seus usuários legítimos. Logo, o foco é manter os recursos da sua API
disponíveis para todos os seus usuários a todo momento. Podemos citar como bônus de todos
esses benefícios, a redução e controle dos custos da sua API.

## Descrição da implementação

O recurso utilizado no contexto do NestJS para implementar esse conceito foi o ThrottlerModule. Esse módulo permite configurar regras de limite de requisições de
forma centralizada, aplicada por padrão a todas as rotas, ou de forma personalizada para rotas ou controladores específicos. O Throttler atua interceptando requisições
e verificando, com base no IP do cliente, se o limite de requisições foi excedido. Caso ultrapasse o limite, o módulo bloqueia a requisição e retorna
um erro adequado.

## Rate Limit geral da API

Na minha aplicação, configurei um limite geral de 10 requisições por IP a cada 30 segundos, aplicado a todas as rotas como padrão. Esse comportamento foi implementado diretamente no módulo principal. Além disso, criei um provider para expor o ThrottlerGuard a todos os módulos, possibilitando o uso do conceito de Guards
exemplificado anteriormente no AuthModule, visando aplicar limites a rotas ou controladores.

```typescript
@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: seconds(30),
        limit: 10,
      },
    ]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
```

## Rate Limit para serviços sensíveis

No contexto dessa API, implementei um controle mais restritivo apenas na rota de login. Como se trata de uma rota sensível, sujeita a ataques maliciosos, apliquei um rate limit de 10 requisições a cada 10 minutos. Isso ajuda a proteger a API de tentativas de força bruta e de acessos indevidos.

```typescript
@Throttle({ default: { limit: 10, ttl: minutes(10) } })
  @Post('login')
  async login(@Body() credentials: LoginDto): Promise<any> {
    return this.authService.login(credentials);
  }
```

## Conclusão

A utilização de rate limits, torna a API mais segura e garante uma melhor disponibilidade dos recursos. Dessa forma, esse tópico é fundamental no design de APIs modernas.

# Autenticação e Autorização

## Introdução

Esse é um dos temas centrais quando se pensa em segurança de uma aplicação. Apesar de cada
um desses termos se referirem a processos distintos, ambos trabalham juntos para garantir
a segurança de uma API.

## Descrição da implementação

A implementação de autenticação e autorização é uma etapa essencial no desenvolvimento de APIs seguras e confiáveis. Esses dois conceitos têm papéis distintos,
mas complementares: enquanto a autenticação garante que a identidade do usuário seja validada, a autorização controla o acesso aos recursos da API com
base nas permissões desse usuário.

## Abordagem usada no projeto

Nessa API, utilizei um design baseado em tokens JWT (JSON Web Tokens), um padrão amplamente utilizado para autenticação. Um JWT
é um token criptografado compacto e seguro, usado para transmitir informações entre as partes envolvidas de maneira confiável. Ele contém três partes principais:

- Cabeçalho (Header): Indica o tipo de token e o algoritmo de assinatura.
- Carga útil (Payload): Armazena informações sobre o usuário, no caso da nossa API ele armazena o objeto { id, username, email }.
- Assinatura (Signature): Garante a integridade do token, evitando adulterações.

O fluxo geral de autenticação utilizando JWT funciona assim: quando um usuário realiza login com credenciais válidas, o sistema gera um token JWT, que
é enviado ao cliente. Em todas as requisições subsequentes, o cliente inclui esse token no cabeçalho da requisição para acessar os recursos protegidos.
A API, por sua vez, valida o token para garantir que ele seja legítimo e não tenha expirado.

## Arquitetura da solução

No contexto do NestJS, essa lógica foi encapsulada no módulo AuthModule, mantendo a aplicação modular e escalável. Os serviços como cadastro (signup) e autenticação (login) do AuthModule, foram possibilitadas pelas funções de buscar e cadastrar usuários fornecidas pelo UserModule. Além disso, as senhas dos usuários são armazenadas e manipuladas de forma segura utilizando criptografia, como o bcrypt, para impedir que sejam expostas em caso de violações de dados.

Abaixo um trecho da implementação do método de login:

```typescript
try {
  const user = await this.userService.getUserByEmail(email);
  const isPasswordMatch = await bcrypt.compare(pass, user?.password);

  if (!isPasswordMatch) {
    throw new UnauthorizedException();
  }

  const access_token = await this.jwtService.signAsync({
    sub: user.id,
    username: user.username,
    email: user.email,
  });

  return { access_token };
} catch (e) {
  throw new UnauthorizedException();
}
```

Já a autorização foi implementada verificando o token recebido em cada requisição protegida. Isso foi feito com um mecanismo que intercepta as requisições
antes que elas cheguem aos controladores verificando a validade do token e extraindo as informações do usuário para que possam ser utilizadas pela aplicação. Na
aplicação, nomeamos a classe que implementa a autorização de AuthGuard e por meio do NestJS ela pode ser aplicada tanto a nível de rotas quanto a
nível dos controladores. Essa abordagem é recomendada ao separar as responsabilidades de autenticação e autorização, além de permitir que sejam aplicadas de forma consistente em toda a API.

Abaixo a implementação do método que autoriza ou não o acesso a rota e sua utilização no controlador do módulo Movie:

```typescript
async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest();

    const token = this.getBearerTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const userObj = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      //Allow us to access authenticated user info on the route handlers
      request['user'] = userObj;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
```

```typescript
@UseGuards(AuthGuard)
export class MovieController {}
```

## Conclusão

Esse modelo de design com JWT permite criar APIs sem estado, onde o servidor não precisa manter informações de sessão para cada usuário. Isso é ideal para aplicações escaláveis, já que os tokens contêm todas as informações necessárias para validar o acesso. No caso do NestJS, a integração nativa com ferramentas de proteção, como guards e módulos dedicados, torna essa implementação robusta e de fácil manutenção.

# Monitoramento

## Introdução

O monitoramento de APIs é a prática de observar e analisar o comportamento de uma aplicação em produção.
Durante esse processo, vários fatores são avaliados, sendo os principais: performance, disponibilidade
e taxa de falhas.

Ao expor uma API para os usuários, é imprescindível que dediquemos esforço para entregarmos uma interface
que funcione, esteja disponível a maior parte do tempo e seja segura. Sem o monitoramento, essa tarefa se
tornaria muito difícil ou quase impossível, visto que não teríamos visibilidade sobre o comportamento da
nossa aplicação em produção.

## Descrição da implementação

# Documentação

## Introdução

Este tópico aborda o conteúdo que descreve como utilizar uma API. Uma documentação clara e objetiva é fundamental
para facilitar o uso da API pelos clientes, funcionando como um manual de instruções sobre a utilização do software.

A documentação é um componente essencial para qualquer API, pois ela serve como a principal interface entre os desenvolvedores que consomem os serviços e os que os implementam. Uma documentação clara e acessível reduz a curva de aprendizado, minimiza dúvidas e erros, e acelera o desenvolvimento de integrações. Para APIs menores ou de exemplo, uma abordagem eficiente e prática é a geração automática de documentação.

## Descrição da implementação

Para esse projeto, foi utilizado o Swagger, uma ferramenta conhecida no mercado para documentação de APIs. Ele se destaca por sua interface intuitiva e por permitir que desenvolvedores explorem os serviços e contratos de uma API de forma visual e interativa. Por ser amplamente difundida, sua aceitação e compreensão por equipes de diferentes níveis de experiência é facilitada.

O NestJS fornece suporte nativo para a integração com o Swagger, o que torna o processo de documentação mais centralizado. A configuração foi feita utilizando as classes DocumentBuilder e SwaggerModule, oferecidas pelo framework. Esses recursos permitem configurar o título da documentação, uma breve descrição do contexto da API e outras informações como versão e tags.

Uma vez configurada, a documentação é gerada automaticamente. O Swagger lista todas as rotas disponíveis, seus contratos de entrada e saída, e os parâmetros esperados. Além disso, ele oferece uma interface que permite realizar chamadas diretamente da documentação, o que é especialmente útil para testes rápidos, para validar o comportamento dos serviços e para entender o funcionamento de cada recurso por meio de testes reais.

## Benefícios da Abordagem Automática

- Eficiência: Com o Swagger integrado ao código, a documentação é atualizada automaticamente conforme novos serviços ou alterações são adicionados à API. Isso elimina a necessidade de manutenção manual, reduzindo erros e inconsistências.
- Interatividade: A interface permite que os desenvolvedores explorem os serviços diretamente, testando endpoints e verificando retornos sem a necessidade de ferramentas externas.
- Acessibilidade: A documentação gerada pelo Swagger é visual, organizada e de fácil navegação, ajudando tanto desenvolvedores experientes quanto iniciantes.

Com ferramentas como o Swagger, é possível manter a documentação sempre atualizada e integrada ao fluxo de desenvolvimento, sem comprometer a simplicidade. Essa abordagem é especialmente útil em projetos menores, mas também escalável para APIs maiores.

# Testabilidade

## Introdução

A característica, que determina a facilidade de testar um software e a eficácia dos testes em refletir a conformidade com os requisitos,
é chamada de testabilidade.

A testabilidade é um pilar fundamental no desenvolvimento de APIs robustas, pois garante que a funcionalidade dos serviços possa ser validada de
forma eficiente, ajudando a prevenir erros e a acelerar o desenvolvimento com segurança. APIs bem projetadas são naturalmente mais testáveis,
permitindo a aplicação de testes unitários, de integração e automatizados com facilidade.

Quanto maior a cobertura e a qualidade dos testes de uma API, maior é a segurança ao evoluir o software e lançar versões estáveis.
Isso ocorre porque os testes atuam como uma barreira que garante que, apesar das alterações, tudo continue funcionando corretamente,
ou indicam quando precisam ser ajustados para se adequar a novas funcionalidades ou correções.

Dada a importância da cobertura de testes no desenvolvimento de APIs, facilitar sua implementação e aumentar sua eficiência é crucial.
Por isso, a testabilidade é essencial, pois torna mais fácil escrever testes e aumenta a eficácia deles, simplificando e melhorando
significativamente esse aspecto do desenvolvimento.

## Descrição da implementação

## A Base da Testabilidade

A API foi construída com uma arquitetura modular, onde cada funcionalidade está separada em módulos distintos. Essa separação de responsabilidades
facilita não apenas a manutenção do código, mas também a escrita de testes, pois cada módulo pode ser testado de forma independente. Além disso,
a adoção de práticas como Clean Code e os princípios SOLID durante o desenvolvimento garantiu que o código fosse claro, coeso e com baixo acoplamento,
características essenciais para uma alta testabilidade.

## Testes Automatizados

- Testes Unitários: Foram implementados testes automatizados para todas as classes de controladores e serviços em cada módulo da aplicação. Esses testes validam o comportamento isolado de cada unidade de código, garantindo que os métodos e funcionalidades individuais funcionem conforme o esperado. No contexto do NestJS, o suporte integrado a bibliotecas de testes, como Jest, facilita a criação de testes com cenários reais utilizando mocks e injeção de dependências.
- Testes do Cliente de Movies: Um conjunto específico de testes foi desenvolvido para o cliente de movies, validando sua comunicação com APIs externas e garantindo a integridade dos dados que alimentam a aplicação.

## Benefícios do framework

O NestJS oferece recursos que tornam a aplicação mais testável por design. O suporte à injeção de dependências, modularização e ferramentas nativas de testes cria um ambiente propício para a escrita de testes abrangentes e organizados. Além disso, a possibilidade de isolar facilmente os componentes do sistema reduz o esforço necessário para configurar cenários de teste.

## Conclusão

Combinando uma arquitetura bem planejada, princípios sólidos de design e ferramentas automatizadas, a API foi estruturada para garantir alta testabilidade. Isso não apenas assegura que os serviços funcionem como esperado, mas também prepara o sistema para evoluir com segurança, reduzindo riscos e facilitando a detecção de problemas durante o ciclo de desenvolvimento.

# Tratamento de Falhas

## Introdução

O tratamento de falhas é um aspecto essencial no design de APIs robustas e confiáveis. Em uma arquitetura bem projetada, é fundamental que os serviços
sejam capazes de lidar adequadamente com erros, assegurando que a API ofereça respostas consistentes e resilientes para os consumidores.

## Descrição da implementação

## Blocos Try-Catch e Validação de Resultados

Um dos princípios básicos aplicados nos serviços do projeto consiste em proteger os serviços com blocos try-catch. Isso permitiu capturar exceções que
possam surgir durante a execução e responder aos clientes com mensagens adequadas. No caso de operações que envolvem busca de dados, uma prática importante é verificar os resultados antes de retorná-los. Por exemplo, ao invés de simplesmente devolver uma resposta vazia, a API informa que os dados solicitados não foram encontrados, melhorando a transparência e usabilidade.

```typescript
async getMovieByIMDBId(movieId: string): Promise<TMDBMovie> {
    try {
      const response = await firstValueFrom(
        this.httpClient.get<TMDBFindResponse>(
          `/find/${movieId}?external_source=imdb_id`,
        ),
      );

      if (response.data.movie_results.length === 0) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            data: {
              message:
                'O filme que você procura não pode ser encontrado! Confira se o ID do Imdb está correto!',
            },
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return response.data.movie_results[0];
    } catch (error) {
      throw error;
    }
  }
```

## Interceptador Global para Erros Não Tratados

Foi realizado a implementação de um interceptador global para capturar erros que não foram tratados diretamente nos serviços ou controladores, garantindo
que a API sempre retorne respostas consistentes. Essa camada adicional de proteção contribui para a robustez do sistema, especialmente em cenários
nos quais erros inesperados acontecem.

```typescript
intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof HttpException) {
          throw error;
        }

        const response = {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          data: {
            message: 'An unexpected error occurred.',
            error: error.message,
          },
        };

        throw new HttpException(response, HttpStatus.INTERNAL_SERVER_ERROR);
      }),
    );
```

## Resiliência Contra Falhas em APIs Terceiras: Circuit Breaker

Como esse projeto integra com uma API pública de filmes, a resiliência da API pode ser desafiada pela indisponibilidade ou instabilidade do provedor terceiro.
Para mitigar esse risco, foi implementado o padrão Circuit Breaker, uma solução que ajuda a prevenir o esgotamento de recursos ao limitar as tentativas de
acesso a um serviço falho.

Essa lógica foi implementada em um módulo dedicado, assim como um interceptador que monitora e gerencia os circuit breakers de maneira granular, por serviço.
Além disso, foi implementado um decorador para simplificar a aplicação do Circuit Breaker em serviços ou controladores específicos e promover a reusabilidade
desse sistema em toda API.

O método responsável por interceptar as requests e gerenciar os breakers:

```typescript
intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const controllerName = context.getClass().name;
    const routeName = context.getHandler().name;

    const circuitKey = `${controllerName}.${routeName}`;

    const breaker = this.circuitBreakerService.getBreaker(circuitKey, () =>
      firstValueFrom(from(next.handle())),
    );

    return from(
      breaker
        .fire()
        .then((result) => result) // Bypass success async/await
        .catch((err) => {
          if (breaker.opened) {
            throw new BadGatewayException(
              'Serviço temporariamente indisponível.',
            );
          }
          throw err;
        }),
    ).pipe(map((response) => response)); // Bypass observable success
  }
```

## Aplicação Prática: API Client de Filmes

No controlador responsável pelo acesso à API pública de filmes, o decorador foi utilizado para aplicar a lógica do Circuit Breaker. Com isso, em cenários
de indisponibilidade, a nossa API suspende imediatamente o processamento de novas requisições relacionadas, evitando sobrecarregar seus recursos ou
amplificar os problemas causados pelo serviço externo. Essa estratégia garante que a API permaneça disponível para outras operações enquanto o provedor
terceiro restabelece sua funcionalidade.

```typescript
@UseCircuitBreaker()
export class MovieController {}
```

## Conclusão

O tratamento de falhas no design de APIs não é apenas uma questão de capturar erros, mas de projetar um sistema resiliente, escalável e seguro. As práticas
como blocos try-catch, validação de resultados, interceptadores globais e o padrão Circuit Breaker, contribuem para um bom design em que a API se torna resistente a
erros. Essas estratégias não só protegem os recursos da aplicação, como também asseguram uma experiência confiável para os clientes.
