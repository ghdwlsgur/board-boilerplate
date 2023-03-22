app.module.ts는 루트 모듈, 각각의 모듈 안에는 컨트롤러, 엔티티, 서비스, 리포지토리 등으로 구성됩니다.

Controller란 ?
컨트롤러는 들어오는 요청을 처리하고 클라이언트에 응답을 반환합니다.

Handler란 ?
핸들러는 @Get, @Post, @Delete 등과 같은 데코레이터로 장식된 컨트롤러 클래스 내의 단순한 메서드입니다.

```bash
nest g controller boards
```

nest: using nestcli
g: generate
controller: controller schematic
boards: name of the schematic
--no-spec: 테스트를 위한 소스 코드 생성 x

<nest g controller boards --no-spec>
CLI로 명령어 입력 시 Controller 만드는 순서

1. cli는 먼저 boards라는 폴더 찾기
2. boards 폴더 안에 controller 파일 생성
3. boards 폴더 안에 module 파일 찾기
4. module 파일 안에 controller 추가

Service란 ?
Service 안에서는 데이터베이스 관련된 로직을 처리합니다. 다시 말해, 데이터베이스에서 데이터를 가져오거나
데이터베이스안에 게시판을 생성할 때 생성한 게시판에 정보를 넣어주는 등의 로직을 처리합니다.

```bash
nest g service boards --no-spec
```

nest: using nestcli
g: generate
service: service schematic
boards: name of the schematic
--no-spec: 테스트를 위한 소스 코드 생성 x

CLI를 이용해서 Service를 생성하면 boards.service.ts 파일이 생성됩니다.
이 생성된 파일 안에는 injectable 데코레이터가 이 데코레이터를 이용하여 다른 컴포넌트에서
이 서비스를 사용할 수 있게(injectable) 만들어줍니다.

Board Service를 Board Controller에서 사용할 수 있게 해주기 위해서 Dependency Injection 설정을 합니다.
NestJS에서 Dependency Injection은 클래스의 Constructor안에서 이루어집니다.

```typescript
@Controller('boards')
export class BoardsController {
  boardsService: BoardsService;

  constructor(boardsService: BoardsService) {
    this.boardsService = boardsService;
  }
}
```

1. boardsService 파라미터에 BoardsService 객체를 타입으로 지정해줍니다.
2. 이 boardsService 파라미터를 BoardsController 클래스 안에서 사용하기 위해서
   this.boardsService 프로퍼티에 boardsService 파라미터를 할당해줍니다.
3. 하지만 타입스크립트에서는 선언한 값만 객체의 프로퍼티로 사용가능하기 때문에 위에 boardsService:
   BoardsService로 선언해줍니다.
4. 이렇게 갖게된 boardsService 프로퍼티를 이용해서 BoardsController 클래스안에서 활용할 수 있습니다.

```typescript
@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService);
}
```

접근 제한자를 이용해서 소스 간단하게 하기
접근제한자(public, protected, private)을 생성자(contructor) 파라미터에 선언하면 접근 제한자가
사용된 생성자 파라미터는 암묵적으로 클래스 프로퍼티로 선언됩니다.

Providers란 ?
프로바이더는 Nest의 기본 개념입니다. 대부분의 기본 Nest 클래스는 서비스, 리포지토리, 팩토리, 헬퍼 등
프로바이더로 취급될 수 있습니다. 프로바이더의 주요 아이디어는 종속성으로 주입할 수 있다는 것입니다. 즉,
객체는 서로 다양한 관계를 만들 수 있으며 객체의 인스턴스를 "연결"하는 기능은 대부분 Nest 런타임 시스템에
위임될 수 있습니다.

Provider 등록하기
Provider를 사용하기 위해서는 module 파일에 providers 항목안에 해당 모듈에서 사용하고자 하는 Provider를 추가하면 됩니다.

Service란 ?
@Injectable 데코레이터로 감싸져서 모듈에 제공되며, 이 서비스 인스턴스는 애플리케이션 전체에서 사용될 수 있습니다. 서비스는 컨트롤러에서 데이터의 유효성 체크를 하거나 데이터베이스에 아이템을 생성하는 등의 작업을 하는 부분을 처리합니다.

클라이언트에서 요청을 보내면 먼저 컨트롤러로 전달되고 컨트롤러에서 알맞은 요청 경로로 라우팅하여 해당 핸들러로 전달합니다. 그런 후에 요청을 처리하기 위해서 서비스로 이동하여 요청에 맞는 로직을 처리한 후 컨트롤러에 리턴값을 보내준 후 컨트롤러에서 클라이언트로 결과값을 보냅니다. 따라서 컨트롤러는 요청을 처리하고 결과값을 리턴해주는 역할을 합니다.

DTO(Data Transfer Object)는 무엇인가요 ?
계층간 데이터 교환을 위한 객체입니다. DB에서 데이터를 얻어 Service나 Controller 등으로 보낼 때 사용하는 객체를 말합니다. DTO는 데이터가 네트워크를 통해 전송되는 방법을 정의하는 객체입니다. interface나 class를 이용해서 정의될 수 있습니다. (하지만 클래스를 이용하는 것을 추천합니다.)

DTO(Data Transfer Object)를 쓰는 이유는 무엇인가요 ?

- 데이터 유효성을 체크하는데 효율적입니다.
- 더 안정적인 코드를 만들어 줍니다. 타입스크립트의 타입으로도 사용됩니다.

클래스는 인터페이스와 다르게 런타임에서 작동하기 때문에 파이프 같은 기능을 이용할 때 더 유용합니다. 그래서 클래스를 사용해서 DTO를 작성합니다.

Pipe란 무엇인가요 ?
파이프는 @Injectable() 데코레이터로 주석이 달린 클래스입니다.
파이프는 data transformation과 data validation을 위해서 사용됩니다.
파이프는 컨트롤러 경로 처리기에 의해 처리되는 인수에 대해 작동합니다.
Nest는 메소드가 호출되기 직전에 파이프를 삽입하고 파이프는 메소드로 향하는 인수를 수신하고 이에 대해 작동합니다.

Data Transformation이란 ?
입력 데이터를 원하는 형식으로 변환 (예: 문자열에서 정수로)
만약 숫자를 받길 원하는데 문자열 형식으로 온다면 파이프에서 자동으로 숫자로 바꿔줍니다.

Data validation이란 ?
입력 데이터를 평가하고 유효한 경우 변경되지 않은 상태로 전달하면 됩니다. 그렇지 않으면 데이터가 올바르지 않을 때 예외를 발생시킵니다. 만약 이름의 길이가 10자 이하여야 하는데 10자 이상이 되면 에러를 발생시킵니다.

파이프는 위 두가지 모든 경우에서 라우트 핸들러가 처리하는 인수에 대해서 작동합니다. 그리고 파이프는 메소드 를 바로 직전에 작동해서 메소드로 향하는 인수에 대해서 변환할 것이 있으면 변환하고 유효성 체크를 위해서도 호출됩니다.

PIPE 사용하는 법 (Binding Pipes)
파이프를 사용하는 방법(Binding Pipes)은 세가지로 나눠질 수 있습니다. Handler-level Pipes, Parameter-level Pipes, Global-level Pipes 입니다. 이름에서 말하는 것 그대로 핸들러 레벨, 파라미터 레벨, 글로벌 레벨로 파이프를 사용할 수 있습니다.

## Handler-level

```typescript
@Post()
@UsePipes(pipe)
createBoard(
   @Board('title') title: string
   @Board('description') description: string
) {

}
```

## Parameter-level

```typescript
@Post()
createBoard(
   @Body('title', ParameterPipe) title: string,
   @Body('description') description: string
) {

}
```

## Global Pipes

글로벌 파이프로서 애플리케이션 레벨의 파이프입니다.
클라이언트에서 들어오는 모든 요청에 적용됩니다.
가장 상단 영역인 main.ts에 넣어 사용하면 됩니다.

```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(GlobalPipes);
  await app.listen(3000);
}
bootstrap();
```

## Built-in Pipes

NestJS에 기본적으로 사용할 수 있게 만들어 놓은 6가지의 파이프가 있습니다.

- ValidationPipe
- ParseIntPipe
- ParseBoolPipe
- ParseArrayPipe
- ParseUUIDPipe
- DefaultValuePipe

ex)

```typescript
@Get('id')
findOne(@Param('id', ParseIntPipe) id: number) {
   return;
}
```

필요한 모듈
class-validator, class-transformer
yarn add class-validator, class-transformer --dev

TypeORM이란 ?
TypeORM은 node.js에서 실행되고 TypeScript로 작성된 객체 관계형 매퍼 라이브러리입니다.
TypeORM은 MySQL, PostgreSQL, MariaDB, SQLite, MS SQL Server, Oracla, SAP Hana 및 WebSQL과 같은 여러 데이터베이스를 지원합니다.

ORM(Object Relational Mapping)이란 ?
객체와 관계형 데이터베이스의 데이터를 자동으로 변형 및 연결하는 작업입니다.
ORM을 이용한 개발은 객체와 데이터베이스의 변형에 유연하게 사용할 수 있습니다.

### TypeORM

```typescript
const boards = Board.find({ title: 'Hello', status: 'PUBLIC' });
```

### Pure Javascript

```javascript
db.query('SELECT * FROM boards WHERE title = "Hello" AND status = "PUBLIC", (err, result) => {
   if(err) throw new Error('Error');
   boards = result.rows;
});
```

TypeORM 특징과 이점

- 모델을 기반으로 데이터베이스 테이블 체계를 자동으로 생성합니다.
- 데이터베이스에서 개체를 쉽게 삽입, 업데이트 및 삭제할 수 있습니다.
- 테이블 간의 매핑 (일대일, 일대다 및 다대다)을 만듭니다.
- 간단한 CLI 명령을 제공합니다.
- TypeORM은 간단한 코딩으로 ORM 프레임워크를 사용하기 쉽습니다.
- TypeORM은 다른 모듈과 쉽게 통합됩니다.

왜 Entity를 생성해야 하나요?
원래 ORM 없이 데이터베이스 테이블을 생성할 때를 먼저 보겠습니다.

```sql
CREATE TABLE board {
   id INTEGER AUTO_INCREMENT PRIMARY KEY,
   title VARCHAR(255) NOT NULL,
   description VARCHAR(255) NOT NULL
}
```

이런 식으로 테이블을 생성해줍니다. 하지만 TypeORM을 사용할 때는 데이터베이스 테이블로 변환되는 Class이기 때문에 위에 방법처럼 하지 않고 클래스를 생성한 후 그 안에 컬럼들을 정의해주면 됩니다.

Repository란 무엇인가요 ?
리포지토리는 엔티티 개체와 함께 작동하며 엔티티 찾기, 삽입, 업데이트, 삭제 등을 처리합니다.
즉, 데이터베이스에 관련된 일은 서비스에서 하는 것이 아닌 Repository에서 하면 됩니다. 이것을 Repository Pattern이라고도 부릅니다.

remove() vs delete()

- remove(): 무조건 존재하는 아이템을 remove 메소드를 이용해서 지워야 합니다. 그렇지 않으면 에러가 발생합니다. (404 Error)
- delete(): 만약 아이템이 존재하면 지우고 존재하지 않으면 아무런 영향이 없습니다. 이러한 차이 때문에 remove()를 이용하면 하나의 아이템을 지울 때 두번 데이터베이스를 이용해야 하기 때문에 (아이템 유무 + 지우기)
  데이터베이스에 한 번만 접근해도 되는 delete 메소드를 사용하겠습니다.

JWT 구조

- Header
  토큰에 대한 메타 데이터를 포함하고 있습니다. (타입, 해싱 알고리즘 SHA256, RSA...)

- Payload
  유저 정보(issuer), 만료 시간(expiration time), 주제(subject) 등등 ...

- Verify Signature
  JWT의 마지막 세그먼트는 토큰을 보낸 사람에 의해 서명되었으며 어떤 식으로든 변경되지 않았는지
  확인하는 데 사용되는 서명입니다. 서명은 헤더 및 페이로드 세그먼트, 서명 알고리즘, 비밀 또는 공개 키를 사용하여 생성됩니다.

각각의 미들웨어가 호출되는(called) 순서
middleware -> guard -> interceptor(before) -> pipe -> controller -> service -> controller -> interceptor(after) -> filter (if applicable) -> client

애플리케이션을 운영할 때 보면 에러가 날 때가 많이 있습니다. 그럴 때 어디 부분이 문제인지 빠르고 정확하게 파악하기 위해서는 어떠한 곳에서 에러가 어떻게 나고 있는지 보기 위해서 로그를 보느게 중요합니다.

로그의 종류
Log - 중요한 정보의 범용 로깅
Warning - 치명적이거나 파괴적이지 않은 처리되지 않은 문제
Error - 치명적이거나 파괴적인 처리되지 않은 문제
Debug - 오류 발생시 로직을 디버그하는 데 도움이 되는 유용한 정보입니다. 개발자용
Verbose - 응용 프로그램의 동작에 대한 통찰력을 제공하는 정보입니다. 운영자용
