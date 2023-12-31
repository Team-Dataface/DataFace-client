# 😉 DataFace <!-- omit in toc -->

<p align="center">
  <img width="300px" src="https://github.com/Team-Dataface/DataFace-client/assets/83858724/c960b9ec-a543-4cda-a5ce-9255160688d8" />
</p>

<p align="center">
  DataFace는 누구나 손쉽게 <b>나만의 데이터베이스</b>를 만들고 <b>커스터마이즈 인터페이스</b>로 관리할 수 있는 웹 어플리케이션입니다. <br>
  또한 데이터베이스간의 <b>관계설정</b>을 통하여 여러 데이터를 한 곳에서 편리하게 확인할 수 있습니다.
</p>

<br>

# **🔗 Links**

<p align="center">
  <a href="https://app.dataface.solutions">Deployed website</a>
  <span> | </span>
  <a href="https://github.com/Team-Dataface/DataFace-client">Frontend Repository</a>
  <span> | </span>
  <a href="https://github.com/Team-Dataface/DataFace-server">Backend Repository</a>
</p>

# 📖 CONTENTS <!-- omit in toc -->
- [**💪 Motivation**](#-motivation)
- [**🛠 Tech Stacks**](#-tech-stacks)
  - [🤔 Why Tanstack-Query?](#-why-tanstack-query)
  - [🤔 Why MongoDB?](#-why-mongodb)
- [**🕹️ Features**](#-features)
- [**🏔 Challenges**](#-challenges)
  - [1. MongoDB로 데이터베이스 간 관계 설정 기능을 어떻게 구현할까?](#1-mongodb로-데이터베이스-간-관계-설정-기능을-어떻게-구현할까)
  - [2. 비전문가를 배려한 직관적인 데이터베이스툴 구현](#2-비전문가를-배려한-직관적인-데이터베이스툴-구현)
    - [2-1. 자연스러운 유저플로우를 위한 저장방식 고민](#2-1-자연스러운-유저플로우를-위한-저장방식-고민)
    - [2-2. 각 타입에 어울리는 태그를 다르게 적용하기](#2-2-각-타입에-어울리는-태그를-다르게-적용하기)
    - [2-3. 포탈마다 다른 쿼리결과를 렌더링하도록 구현](#2-3-포탈마다-다른-쿼리결과를-렌더링하도록-구현)
    - [2-4. 배경지식이 없더라도 쉽게 할 수 있는 관계설정](#2-4-배경지식이-없더라도-쉽게-할-수-있는-관계설정)
- [**🔥 Issues**](#-issues)
  - [Portal의 값 갱신 이슈](#portal의-값-갱신-이슈)
  - [Header 와 SideBar 컴포넌트 간의 state 변경 이슈](#header-와-sidebar-컴포넌트-간의-state-변경-이슈)
- [**🗓 Schedule**](#-schedule)
- [**👨‍👩‍👦 Memoir**](#-memoir)

<br>

# **💪 Motivation**

우리는 일상속에서 맛집 방문기록, 공부 일지, 다이어리, 영화 관람기록 등 다양한 기록을 관리하고 있습니다. <br>
그러나 일반적인 엑셀과 같은 툴을 사용하면 어떠한 자료라도 똑같이 표 형식을 따라야하는 불편함이 있습니다.

**각 자료 별 특성에 걸맞는 인터페이스를 직접 만들 순 없는걸까요?**

철수씨는 제품 카탈로그를 보던 중, B상품이 언제 어떤 고객에게 판매되고 있는지 궁금해졌습니다. <br>
따라서 철수씨는 판매대장을 열고 수많은 데이터들 틈에서 B상품 판매이력을 뒤져봐야만 했습니다.

**카탈로그에서 B상품을 열람할 때 판매이력도 자동으로 검색해서 보여줄 수는 없을까요?**

저희는 위와 같은 불편함을 해결해줄 신개념 데이터베이스 관리툴을 실현시켜보고자 이 프로젝트를 기획하게 되었습니다.

<br>

# **🛠 Tech Stacks**

### Client

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Tanstack Query](https://img.shields.io/badge/-Tanstack%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white) ![Jotai](https://img.shields.io/badge/Jotai-000?style=for-the-badge&logoColor=white)  ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

### Server

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![MongoDB & Mongoose](https://img.shields.io/badge/MongoDB%20&%20Mongoose-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

### Test

![React Dom Testing](https://img.shields.io/badge/react%20dom%20testing-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Vitest](https://img.shields.io/badge/Vitest-%2344A833.svg?style=for-the-badge&logoColor=white) ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

### Deployment

![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7) ![AWS Elastic Beanstalk](https://img.shields.io/badge/AWS%20Elastic%20Beanstalk-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

<br>

## 🤔 Why Tanstack-Query?

### Tanstack-Query를 통한 client/server 스테이트 분리와 캐싱 활용

프로젝트를 구상하는 단계에서 최초에 자연스레 생각했던건, 데이터 베이스를 만드는 어플리케이션의 특성상 서버에서 가져온 데이터는 곧 렌더링과 직관되기에, 클라이언트 측에서 state를 통하여 상태 관리 라이브러리로 관리하는 것이었습니다. 이에 따라, 사용자가 어플리케이션을 사용하며 끊임없이 그리고 빈번하게 서버와 소통을 하게되는건 당연한 예측이었습니다. 그렇기에 이 state를 리덕스 등의 라이브러리를 통해 전역적으로 관리하면 좋겠다고 생각했습니다.
<br>

그러나 단순 데이터를 가져오기만 하는게 아닌 *수정, 생성, 삭제*가 빈번하게 일어날것으로 보여지는 어플리케이션 이기에 클라이언트에 저장되는 데이터들은 변화되기 쉬우며 이는 곧 서버와 클라이언트 간의 데이터가 같은 데이터임에도, 시점의 차이를 불러 일으킬 위험성이 있다고 저희는 판단하였습니다. 서버에서 가져온 *A 데이터*를 클라이언트에서 state로 관리하고 수정하여 *A’ 데이터*가 되었을때, 서버와 문제가 생겨 업데이트 되지 않는다면, 둘 사이의 데이터는 달라지게 되고 이는 추후 어플리케이션의 확장성 및 데이터의 무결성 측면에서 좋지 않을것이라는게 가장 큰 이유였습니다.
<br>
이러한 이유로 저희는 *서버와 클라이언트의 스테이트*를 분리하여 관리하고자 하였고, 다음과 같은 이점을 가져오고자 했습니다.
<br>

- _데이터 무결성_ - 항상 서버와 클라이언트는 같은 시점의 데이터를 공유 하기 때문에 데이터는 안전하고 무결하게 지켜집니다.
- _성능_ - 캐싱 기능을 통한 서버와의 fetch 최소화와 불필요한 데이터 전송의 감소로 성능 개선을 달성했습니다.
- _유지보수성_ - 모든 데이터는 서버에서 오기 때문에 브라우저가 종료되거나 새로고침 되어도 데이터가 유실되지 않습니다.
  <br>

또한 Tanstack Query는 서버 및 클라이언트 스테이트의 분리와 캐싱을 모두 구현할수 있는 장점도 가지고 있습니다.
서버에서 가져온 데이터를 `tanstack query`는 `queryClient`라고 불리우는 캐싱 상자에 담아 클라이언트에서 특별한 요청이 있지 않은 이상 다시 서버에 요청하지 않고, 캐싱된 데이터를 바로 반납해줍니다. 이는 곧 저희가 목표로 하였던 불필요한 *fetch의 최소화*로 이어질 수 있었습니다. `tanstack query`는 캐싱된 값을 반납할지 새롭게 서버에 요청할지를 *stale / fresh*라는 기준으로 판단합니다.
만약 data의 상태가 최초 서버로부터 전달받아 cached 되어 있는 상태라고 가정했을때, 다음과 같은 메커니즘으로 동작하게 됩니다.

- data의 상태가 `stale`이라면?
  → refetch!
- data의 상태가 `fresh`라면?
  → 캐싱된 data를 반환

이를 통해 캐싱이 필요한 컴포넌트마다 `tanstack query`의 `stale time`을 활용하여 클라이언트와 서버간의 fetching을 최소화 하였습니다.

<p>
  <img width="500px" src="https://github.com/Team-Dataface/DataFace-client/assets/83858724/6d886294-3fd1-4367-8a6c-37c2ebc81071">
  <img width="500px" src="https://github.com/Team-Dataface/DataFace-client/assets/83858724/ec55c4a0-998e-4cf7-8c9d-bb0cf000594e">
</p>

🔺 실제 어플리케이션 상에서 stale time option을 활용해서 stale time : Infinity 일때와 stale time : 0 일때 불필요한 server와의 fetching이 최소화 된 모습 (13 -> 5)

<br>

## 🤔 Why MongoDB?

### 유연한 스키마와 신속한 개발을 위한 MongoDB 도입

DataFace는 사용자가 데이터베이스를 자유롭게 관리하고, 나아가 생성한 여러 개의 데이터베이스 간에 관계를 설정할 수 있는 기능을 핵심적으로 지원합니다. 서비스가 지원하는 핵심 기능과의 적합성만을 고려한다면, PostgreSQL 등의 관계형 DB를 도입하여, 강력한 관계 짓기와 쿼리 기능을 활용하는 것이 자연스러운 결정으로 보입니다.

하지만 개발 당시 팀원 모두 관계형 DB를 사용해 본 경험이 없었고, 10일 남짓의 짧은 개발기간 내에 관계형 DB를 처음부터 학습하고 실제 프로젝트에 적용하는 것은 최선의 수행 방향이 아니라고 생각했습니다.

오히려, 프로젝트의 성공을 위해서는 팀원 모두가 익숙한 MongoDB 등의 비관계형 DB를 활용하되, **자체적으로 데이터베이스 간 관계를 설정해주는 로직을 작성해 사용**하는 것이 더욱 현실적이고 합리적인 방안이며, 동시에 더욱 도전적인 개발 경험이 될 수 있을 것이라 판단했습니다.

뿐만 아니라, 데이터 스키마가 미리 정의되어야 하는 관계형 DB와 달리, 비관계형 DB는 데이터 구조를 필요에 따라 손쉽게 변경하며 개발을 진행할 수 있기에, 개발 도중 스키마가 변경되어야 하는 상황에 대한 유연한 대처가 가능했습니다.

|                                            | 관계형 DB (PostgreSQL)             | 비관계형 DB (MongoDB)                                           |
| ------------------------------------------ | ---------------------------------- | --------------------------------------------------------------- |
| 스키마 유연성                              | 매우 낮음                          | **매우 높음**                                                       |
| 개발 초기 도입 속도                        | 느림 (스키마가 미리 정의되어야 함) | **빠름** (데이터 구조를 필요에 따라 손쉽게 변경하며 개발할 수 있음) |
| 핵심 기능 적합성 - 데이터베이스 CRUD       | 적합                               | 적합                                                            |
| 핵심 기능 적합성 - 데이터베이스간 관계설정 | **매우 적합**                          | 다소 부적합. 기능 구현에 필요한 자체 로직 작성 필요.            |
| 학습 곡선(learning curve)                  | 가파름                             | **완만함**                                                          |
| 즉시 도입 가능 여부                        | 사실상 불가능                      | **가능**                                                        |

<br>

# **🕹️ Features**

### 데이터베이스 열람

<details><summary>🎬 preview</summary>
<p align="center">
  <img width="800px" src="https://github.com/Team-Dataface/DataFace-client/assets/83858724/22fecbfc-6a1a-4d53-bd7e-db6d30bcb492">
</p>
</details>

- 사용자는 구글계정 로그인을 통해 자신의 데이터베이스에 엑세스 가능합니다.
- 사용자는 사이드바 상에서 원하는 데이터베이스를 선택하여 열람할 수 있습니다.
- 또한 리스트뷰와 디테일뷰 모드를 필요에 따라 바꾸며 열람할 수 있습니다.

### 데이터베이스 생성/삭제

<details><summary>🎬 preview</summary>
  <p align="center">
    <img width="800px" src="https://github.com/Team-Dataface/DataFace-client/assets/83858724/9b692c4a-b8ca-4707-8a28-5446fc25c2b4">
  </p>
</details>

- 사용자는 사이드바의 New Database를 클릭하여 새로운 데이터베이스 생성이 가능합니다.
  - 데이터베이스 이름과 필드명은 필수로 입력해야하며 필드명은 중복될 수 없습니다.
  - 각 필드의 타입을 드롭다운 메뉴로 설정 가능합니다. 기본타입은 Text로 적용됩니다.
  - 필드개수는 원하는 만큼 추가하거나 삭제할 수 있습니다.
- 사용자는 데이터베이스 옆에 위치한 휴지통 버튼을 눌러 데이터베이스를 삭제할 수 있습니다.

### 도큐먼트 생성/삭제

<details><summary>🎬 preview</summary>
  <p align="center">
    <img width="800px" src="https://github.com/Team-Dataface/DataFace-client/assets/83858724/1f14f06a-bdb1-47f6-850b-3effdc465b1c">
  </p>
</details>

- 사용자는 헤더의 + 버튼을 눌러 도큐먼트를 작성할 수 있습니다.
  - 이전에 사용자가 생성한 필드항목에 어울리는 값을 입력할 수 있습니다.
- 사용자는 특정 도큐먼트를 열람하고 있는 상태에서 - 버튼을 눌러 도큐먼트를 삭제할 수 있습니다.

### 도큐먼트 수정

<details><summary>🎬 preview</summary>
  <p align="center">
    <img width="800px" src="https://github.com/Team-Dataface/DataFace-client/assets/83858724/1b75ae18-231f-4054-b5f7-4ada4b27fd03">
  </p>
</details>

- 사용자는 도큐먼트를 자유롭게 수정가능합니다.
  - 더블클릭 혹은 Edit 버튼클릭을 하여 수정모드로 진입합니다.
  - 원하는 부분을 수정한 후 Save버튼을 눌러 저장합니다.

### 디테일뷰 GUI 커스터마이즈

<details><summary>🎬 preview</summary>
  <p align="center">
    <img width="800px" src="https://github.com/Team-Dataface/DataFace-client/assets/83858724/ae9afbb9-6425-4757-b873-5ad6952e1317">
  </p>
</details>

- 사용자는 디테일뷰의 필드 배치를 원하는대로 커스터마이즈할 수 있습니다.
  - 더블클릭 혹은 Edit 버튼클릭을 하여 수정모드로 진입합니다.
  - small / medium / large 중 원하는 크기를 선택합니다.
  - 필드를 드래그하여 원하는 위치로 이동시킵니다.
  - Save버튼을 눌러 저장합니다.

### 관계설정

<details><summary>🎬 preview</summary>
  <p align="center">
    <img width="800px" src="https://github.com/Team-Dataface/DataFace-client/assets/83858724/a16f4de4-e4e4-476e-b88a-fa952c46dd63">
  </p>
</details>

- 사용자는 헤더의 좌측에 위치한 Relationship 버튼을 누르고 원하는 데이터베이스를 선택한 후 관계설정을 할 수 있습니다.
  - Create Relationship 버튼을 눌러 관계설정마법사를 시작합니다.
  - Step 1: 관계설정을 통해 함께 동시에 열람하고 싶은 타겟 데이터베이스를 선택합니다.
  - Step 2: 각 데이터베이스에서 값이 필드들을 선택하여 연결해줍니다. 이 떄에 각 필드는 동일한 값을 가르켜야합니다. 이후 자동적으로 검색하여 결과를 포탈을 통해 확인할 수 있게 됩니다.
  - Step 3: 포탈에 표시하고 싶은 필드를 선택하고 다음 버튼을 누르면 관계설정이 종료됩니다.
  - 디테일뷰 페이지에 생성된 포탈을 확인하여 관계설정이 잘 되었는지 확인합니다.

  <br>

# **🏔 Challenges**

## 1. MongoDB로 데이터베이스 간 관계 설정 기능을 어떻게 구현할까?

### 관계형 DB의 Primary Key, Foreign Key 개념을 응용

관계형 DB는 Primary Key, Foreign Key 개념을 이용하여 서로 다른 데이터들 간의 관계를 설정하게 해 줍니다. 관계형 DB에서, 데이터들 간의 관계는 아래와 같은 과정을 거쳐 정의됩니다:

1. 관계 내에서 다른 데이터베이스를 참조할 “주인” 데이터베이스를 결정합니다. 이러한 데이터베이스를 **Base DB**라고 합니다.<br>
   ex) 맛집 동아리 부원 명부

2. 관계 내에서 1. 의 “주인” 데이터베이스에 의해 참조당할 데이터베이스를 결정합니다. 이러한 데이터베이스를 **Target DB**라고 합니다.<br>
   ex) 주변 맛집 리스트

3. Base DB의 **Primary Key**를 결정합니다. 일반적으로, Base DB의 값들 중 가장 특징적이고 고유한 값을 Primary Key로 설정합니다.<br>
   ex) 맛집 동아리 부원의 이름

4. Target DB의 **Foreign Key**를 결정합니다. Base DB의 Primary Key와 직접적으로 연관되어, 관계된 데이터를 조회하기 위해 사용하는 값을 지정합니다.<br>
   ex) 특정 맛집의 추천인
   <br><br>

<p align="center">
  <img width="800px" src="https://github.com/Team-Dataface/DataFace-client/assets/83858724/05566bb9-8426-4c23-9d47-69d1df1b5bf9">
</p>

이렇게 데이터베이스 간의 관계가 설정되면, Base DB의 특정 데이터를 열람할 때, 해당 데이터와 PK-FK 관계로 연관된 모든 데이터에 대한 연쇄적인 열람이 가능합니다. 위 예시에서 볼 수 있듯, 맛집 동아리 부원 “김병균”의 데이터를 확인하면서, 동시에 “김병균”이 추천한 주변 맛집인 “무월식탁”과 “하이보”에 대한 정보도 함께 조회할 수 있습니다.

이 점에 착안하여, DataFace는 사용자가 관계 설정 마법사를 통해 새로운 데이터베이스 간 관계를 정의할 때마다, 아래 속성들로 구성된 `relationship`이라는 `database`의 subdocument를 생성하도록 하였습니다.

| 비관계형 DB인 MongoDB로 구현한 relationship subdocument의 속성 | 관계형 DB의 대응되는 개념                                         |
| -------------------------------------------------------------- | ----------------------------------------------------------------- |
| primaryFieldName                                               | Base DB의 Primary Key                                             |
| foreignDbId                                                    | Target DB를 특정할 수 있는 고유한 값                              |
| foreignFieldName                                               | Target DB의 Foreign Key                                           |
| foreignFieldsToDisplay                                         | Target DB의 Foreign Key로 조회한 데이터에서, 실제로 열람할 속성들 |

> [!NOTE]
> relationship은 Base DB인 database에 종속된 subdocument 이기에,
Base DB를 특정할 수 있는 고유한 값 (baseDbId, targetDbId...)을 별도의 속성으로 가지고 있을 필요가 없습니다.

```js
const relationshipSchema = new Schema([
  {
    primaryFieldName: {
      type: String,
      required: true,
    },
    foreignDbId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    foreignFieldName: {
      type: String,
      required: true,
    },
    foreignFieldsToDisplay: {
      type: Array,
      default: [],
      required: true,
    },
    // ... (생략된 코드)
  },
]);

const databaseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  documents: [documentSchema],
  relationships: [relationshipSchema],
});
```

<br>

## 2. 비전문가를 배려한 직관적인 데이터베이스툴 구현

### 2-1. 자연스러운 유저플로우를 위한 저장방식 고민

DataFace는 비전문가도 부담없이 운용가능한 앱으로 구상하였습니다. 따라서,

- 열람 => 편집=> 저장을 반복하는 과정이 간편해야하고
- 저장여부를 신뢰할 수 있어야하며
- UI 커스터마이즈가 쉬워야했습니다.

본격적인 구현 전 저희는 아래의 두가지 수정방식 사이에서 고민하였습니다.

| 즉시 저장 방식                               | 컨펌 저장 방식                                         |
| -------------------------------------------- | ------------------------------------------------------ |
| 내용변경 즉시 저장하는 방식                  | 편집 모드를 종료하면서 변경사항을 모아서 저장하는 방식 |
| Apple 메모 앱, Notion 등에서 볼 수 있는 방식 | tstory, 네이버 블로그 등에서 볼 수 있는 방식           |

또한 여러 특징에 대해서도 비교해보았습니다.

| 즉시 저장 방식                             | 컨펌 저장 방식                              |
| ------------------------------------------ | ------------------------------------------- |
| 백엔드와의 통신횟수가 상당할 것으로 예상됌 | 통신횟수가 적은 편                          |
| 최근 다양한 웹서비스에서 차용되는 방식     | 오래전부터 대중이 익숙해하는 방식           |
| 작은 변경으로도 DB가 바로 갱신되어짐       | 저장을 잊으면 데이터가 유실될 가능성이 있음 |
| 편집 모드가 없음                           | 열람 모드와 편집 모드가 명시적으로 나뉨     |

저희는 토의 끝에 fetch회수를 줄여주는 장점, 그리고 데이터베이스 관리툴 특성상 CRUD동작의 신뢰성을 중시할 사용자경험을 고려하여 "컨펌 저장 방식"을 택하기로 결정하였습니다. 또한 인터페이스의 편집기능이 있는 것도 이 결정에 영향을 미쳤습니다. 인터페이스 변경이 데이터 열람시에 허용되어버리면 원치 않은 상황을 초래하기 때문에 관련 모드가 따로 존재해야만 했습니다. 따라서 편집 모드 상에서 값의 수정 그리고 인터페이스 수정이 함께 이루어지도록 하였습니다.

<br>

### 2-2. 각 타입에 어울리는 태그를 다르게 적용하기

DataFace의 이름처럼, 데이터를 원하는 디자인의 UI를 통해 열람할 수 있는 것은 이 앱의 핵심기능입니다.
그러나 도큐멘트를 하나씩 열람해서 확인하는 용도의 인터페이스만 주어진다면, 다수의 도큐멘트를 한 곳에서 보고싶을 때 선택지가 없는 불편한 상황을 발생하리라 예상되었습니다. 많은 자료를 가지런히 담은 레이아웃을 통해 한번에 다수의 정보를 습득할 수 있는 것은 표형식이 가진 분명한 장점이기에 디테일뷰와 리스트뷰를 두가지 제공하고 토글을 통해 원하는 모드를 선택할 수 있도록 구현하였습니다.

개발 초기단계에서는 먼저 Text 타입에 해당하는 textarea태그를 이용해 핵심 기능의 개발속도에 박차를 가했습니다.
이후 Text외에도 Date, Time과 같은 타입 기능 구현을 진행하려고 하자 디폴트로 활용하던 textarea태그와 관련한 문제점이 수면위로 드러났습니다.

<p align="center">
  <img width="400px" alt="スクリーンショット 2023-11-27 22 00 29" src="https://github.com/Team-Dataface/DataFace-client/assets/83858724/6b0626a1-a63d-4953-802f-1e0049508f3d">
</p>

- 🔺 데이터페이스가 제공하는 5가지 타입. 유효성검사를 통해 입력값의 포맷을 일치시키는 역할을 수행합니다.<br>

실사용자경험을 분석해본 결과, Text 필드에 입력하는 값은 길이가 길더라도 편하게 입력이 가능하고 개행이 가능해야만 했습니다.
반면 Date, Time 등의 경우 경우 데이터가 통일성을 잃지 않도록 유효성검사가 필요하며 입력 박스의 높이는 한 줄 이상일 필요가 없었습니다. 따라서 미리 디자인된 UX에 어울리는 태그를 찾기 위해서는 textarea와 input의 차이점을 정확히 조사할 필요가 있었습니다.

|                      | textarea                                                                                                                        | input                                                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| 예시                 | <img width="300px" src="https://github.com/Team-Dataface/DataFace-client/assets/83858724/be359ca6-f724-44e3-afd5-67026849be19"> | <img width="300px" src="https://github.com/Team-Dataface/DataFace-client/assets/83858724/8dab6c2a-42ac-4714-b6d5-e25f849a4d1b"> |
| 입력시 특징          | 여러 줄의 멀티라인 텍스트 입력 가능                                                                                             | 한 줄 텍스트만 입력 가능                                                                                                        |
| 크기 조절            | col, row 속성을 통해 박스가 몇 줄을 담게 할 것인지 결정 가능                                                                    | height로 박스크기 조절가능하나 한줄의 위 아래로 여백이 생기는 형태                                                              |
| type 어트리뷰트 유무 | 무                                                                                                                              | 유: date와 time 밖에도 password, email 등 다양한 타입 존재                                                                      |
| 어울리는 타입        | Text                                                                                                                            | Date, Time, Date modified, Date created                                                                                         |

이를 바탕으로 Text타입의 경우 textarea태그, 그 밖의 타입들은 input태그가 적용되도록 분기설정을 해주자 기존에 계획했던 UI디자인 및 사용경험을 정확하게 구현할 수 있었습니다.

다음으로, textarea의 높이설정은 리스트뷰와 디테일뷰 각각의 사용자 경험에 맞추어 다르게 적용해줄 필요가 있었습니다.

<p align="center">
  <img width="600px" src="https://github.com/Team-Dataface/DataFace-client/assets/83858724/efd47dbf-d87d-424b-8f60-4faf86229a0d">
</p>

- 리스트 뷰의 경우 박스의 크기를 정하고 스크롤을 이용하기보다는 내용에 맞추어 박스 높이가 동적으로 결정되는 것이 자연스럽습니다. 따라서 초기 렌더링시 textarea태그의 엘레멘트의 속성(`event.target.style.height`)을 가져와 스크롤 높이 (`event.target.scrollHeight`)에 할당해줌으로써 박스가 내용의 길이에 따라 자동으로 높이조절이 되도록 했습니다.

<p align="center">
  <img width="600px" src="https://github.com/Team-Dataface/DataFace-client/assets/83858724/5652aca5-17a3-471f-a32b-d1bba5479584">
</p>

- 이에 반하여, 디테일 뷰에서는 사용자가 정의한 디자인에 따라 박스의 높이가 고정되어야 합니다. 따라서 편집모드 내에서 사용자가 크기 조절 footer내의 small(== 1), medium(== 4), large(== 8) 버튼을 클릭하여 row속성에 할당할 수 있도록 구현하였습니다. Text인지 아닌지로 여부로 분기점을 설정하여 크기 조절을 할 필요가 없는 Text타입 외의 필드에는 크기 조절 관련 footer가 뜨지 않도록 했습니다.

<br>

### 2-3. 포탈마다 다른 쿼리결과를 렌더링하도록 구현

포탈이란, 관련성이 높은 정보를 동시제공하기 위해 다양한 소스의 정보를 단일 인터페이스로 수집하여, 기본적으로 사용자가 한 곳에서 콘텐츠를 열람가능하도록 하는 도구입니다. 특정 키워드에 관하여 타 데이터베이스의 자료를 자동쿼리하여 함께 표시해줌으로써 콘텐츠를 한단계 복합적으로 진화시켜줍니다. 주로 관계형데이터베이스 기반의 애플리케이션에서 제공하는 유저 인터페이스인 포탈을 DataFace에서도 적용하여, 사용자의 커스터마이즈 UI를 통한 데이터 열람 경험을 극적으로 향상시키고자 하였습니다.

포맷에 대해 고민한 결과, 캐주얼한 앱의 특성에 잘 어울리는 표 형식을 택하게 되었으며, 높이와 위치등을 자유롭게 커스터마이즈 가능하도록 했습니다. 관계설정 페이지에서 설정마법사의 과정을 완료하면 디테일뷰에서 관계설정의 결과인 포탈이 즉시 생성되도록 하였습니다. 사용자가 도큐먼트를 열람하는 동시에 미리 설정해놓은 primary key와 foreign key를 이용한 쿼리를 수행하여 타 데이터베이스의 레코드를 가져와 포탈에 렌더링해주게 됩니다.

단수의 포탈에 렌더링할 데이터 요청 설계는 간단했으나 관계설정이 두개 이상인 복수일 경우의 설계에서 많은 시행착오가 있었습니다.
당초 클라이언트가 DB를 로드할 시에는 관계설정의 개수만큼 요소가 담긴 배열을 받도록 api를 디자인한 상태였기 때문에 이에 따라 포탈을 해당 객체의 개수만큼 렌더링해주는데까지는 간단했으나, 각 포탈의 내용이 될 동적 데이터를 어떤 컴포넌트에서, 어느 시점에, 한번에 불러올지 혹은 따로 불러올지 고민하고 설계하는데서 많은 고민이 있었습니다.
결과적으로 각각의 관계설정에 맞는 쿼리결과를 개별적으로 렌더링하는데 성공하였고 구조를 도식으로 정리하면 다음과 같습니다.

<p align="center">
  <img width="800px" alt="スクリーンショット 2023-11-27 21 22 12" src="https://github.com/Team-Dataface/DataFace-client/assets/83858724/8e24557a-69e9-45ff-8606-efeec7e357a1">
</p>

- 🔺 DB의 관계설정이 두개일 경우의 예시를 나타낸 도식. 반복문으로 렌더링된 각각의 포탈이 각기 다른 Target DB에 queryString으로 검색키워드를 보내며, 그에 따른 쿼리결과를 response로 받아 렌더합니다.

<p align="center">
  <img width="800px" src="https://github.com/Team-Dataface/DataFace-client/assets/83858724/cdbc0937-039e-4758-b08c-721eba63015b">
</p>

- 🔺 달라진 쿼리스트링과 그에 따른 새로운 결과를 표시하는 두 포탈의 모습. 안정적으로 작동하는 것을 직접 확인했을 때는 큰 보람이 있었습니다.

<br>

### 2-4. 배경지식이 없더라도 쉽게 할 수 있는 관계설정

관계 설정 기능에 대한 제작이 확정지어지고 처음 고안했던 UI는 data modeling mapping에서 흔히 볼 수 있는, 각 데이터베이스간에 Foreign Key와 Primary Key를 서로 드래그앤드랍으로 짝지어주는 방식이었습니다. DBMS 및 모델링 시각화 툴 등에서 흔히 볼 수 있는 인터페이스로써, 원클릭 관계설정이 가능하고 데이터베이스간 관계를 파악하는데 매우 편리하다는 장점이 있었습니다.

그러나 데이터페이스의 예상 타겟 유저는 비전문가이기 때문에 인터페이스를 접하였을 때, 이것이 무엇을 하는 기능이며, 어디와 어디를 연결해야하는지 대해 이해가 어려우리라 판단되었습니다. 이 기능이 낳는 포탈 인터페이스는 극적으로 유저경험을 향상시켜 수 있으나 그것을 생성하기까지 유저를 유도하기 위해서는 반드시 허들을 낮출 필요가 있었습니다. 저희는 따라서 비전문가용 툴이라는 기본컨셉과 어울릴만한 다른 UI 디자인은 없을지 고민하게 되었습니다.

그러자 평소 다양한 상황에서 마주치는 고급 기능들에 설명을 표시해주는 물음표 버튼이 달려있거나, 마법사(wizard) 인터페이스를 통해 복잡한 설정을 추상화하여 사용자를 배려하는 장치가 존재함이 떠올랐습니다. 토의 끝에 데이터페이스의 관계설정기능에도 이러한 마법사 인터페이스를 이용하여 설정의 일련의 플로우를 단계적으로 알기쉽도록 구현해보자고 결정했습니다.

여러 설계를 고민해본 후 아래와 같이 모달을 단계별로 제작하고, state를 통해 교체해주는 방식을 채택하였습니다.

```js
export const relationshipStepAtom = atom("start");
// relationshipStep을 setRelationshipStep을 통해 갱신
```

- 🔺 현단계를 설정할 때 필요한 atom내 state를 준비.

```js
<ContentWrapper>
  {relationshipStep === "start" && <Start />}
  {relationshipStep === "stepOne" && <StepOne />}
  {relationshipStep === "stepTwo" && <StepTwo />}
  {relationshipStep === "stepThree" && <StepThree />}
  {relationshipStep === "done" && <Done />}
</ContentWrapper>
```

- 🔺 `relationshipStep`별로 다른 컴포넌트가 렌더되도록 논리연산자를 통해 조건부 렌더링.
  컴포넌트 내부의 버튼을 이용하여 state 값을 교체하도록 구현하였다.

스텝 별로 내용을 교체해주는 것이 아닌, 각각의 스텝별 컴포넌트를 제작하고 조건부 렌더링을 해줌으로써 코드 가독성을 대폭 상승하는 효과를 얻을 수 있었습니다. 또한 각 스텝의 관심사에 맞는 로직이 깔끔하게 분리되어 유지보수성도 향상될 수 있었습니다.

구현을 모두 완료한 후 유저들에게 시연을 부탁하자 알기 쉽다는 긍정적인 피드백을 얻었을 때는 큰 보람을 느낄 수 있었습니다.

좋은 UI는 사용자로 하여금 새 기능에 긍정적으로 반응하도록 하고, 나아가 어려운 기능도 충분히 활용하게끔 한다는 사실을 잘 느낄 수 있었던 챌린지였습니다.

<br>

# **🔥 Issues**

## Portal의 값 갱신 이슈

### 이슈 상세

portal이 다음 두 상황에서 갱신되지 않는 것을 확인하였습니다.

1. 값을 수정하고 저장했을 시: primary키에 해당하는 필드의 값을 수정했음에도 포탈이 이전 쿼리결과값을 보여주는 채로 묵묵부답.

2. 새 도큐먼트를 추가했을 시: primary키에 해당하는 필드에 값을 채워넣고 추가했을 시, 모든 포탈이 쿼리 결과 없음, 즉 no result를 띄우는 문제 확인.

### 해결

1. 값을 수정하고 저장했을 시:
   usePutSaveChangedData 커스텀훅의 onSuccess단에서 모든 관계설정의 쿼리결과를 forEach를 통해 refetch시켜 해결하였습니다. 기존에 존재하는 도큐먼트를 수정 및 저장하는 케이스이므로 refetch 메서드의 갱신개념을 이용하여 잘 해결할 수 있었습니다.

2. 새 도큐먼트를 추가했을 시:
   새 도큐먼트의 경우 이전에 존재하지 않는 인덱스의 데이터이므로 refetch를 이용한 갱신은 해당되지 않았습니다. 따라서 다른 해결방법을 모색하게 되었습니다.
   먼저 쿼리결과를 요청하는 useGetForeignDocument 커스텀훅에 "새 도큐먼트"도 포함된 fresh한 documents 배열이 전달되도록 수정하였습니다. 그리하여 커스텀훅 내부에서 새롭게 생긴 도큐먼트의 queryValue에 접근이 가능하게 되었습니다.
   다음으로 같은 파일 내 useQuery의 dependency에 새 도큐먼트 개수의 길이 (documents.length)를 새롭게 추가하였습니다. 따라서 useQuery documents의 개수가 바뀐 것이 인식되면 새롭게 트리거되도록 하여 문제를 해결할 수 있었습니다.

## Header 와 SideBar 컴포넌트 간의 state 변경 이슈

### 이슈 상세

2개 이상의 `Database`가 있는 상태에서 각 `Database` 클릭 시, 해당 `Database`에 맞는 현재 `document` 번호와 총 `document`의 숫자가 `Header` 컴포넌트에 표기 되어야 합니다.
<br>
그러나 클릭 직후 변경되는 것이 아닌 다시 서버와 `fetching` 되는 시점에 변경되는 문제가 있었습니다.

### 해결

`SideBar`에서 `Database`가 클릭 되었을때, 새로운 `Database`로 `fetch` 시켜주는 로직에서`local state`를 업데이트 시켜줍니다.
<br>
그리고, 업데이트된 state를 바로 참조하여 해당 state로 fetch 하는 로직에서 state 업데이트의 비동기적 특성 때문에 발생한 문제였습니다.

```jsx
function switchDatabase(clickedDBId, clickedDB) {
  setCurrentDBId(clickedDBId);

  queryClient.refetchQueries(["userDb"]);
  queryClient.refetchQueries(["dbDocumentList", currentDBId]);
}
```

> [!IMPORTANT]
> **_`react`의 `state`는 비동기적으로 업데이트 됩니다!_**
> <p align="left">
>  <img width="691" src="https://github.com/darren-kk/Jaenitel-client/assets/111283378/69c3e87a-de93-4852-b014-50382b667f95">
> </p>

사실 너무 당연하게 알고 있던 사실이지만, 복잡해지는 기능들 속에서 놓친 당연한 이유 였습니다.
<br>
state는 즉각적으로 업데이트 되지 않으며 다음 리렌더링을 위해 요청이 보내집니다.
<br>
이를 위해 기존에 fetch하던 키를 인자로 받아오는 값으로 바로 전달 하여 사용 하였습니다.

```jsx
function switchDatabase(clickedDBId, clickedDB) {
  setCurrentDBId(clickedDBId);

  queryClient.refetchQueries(["userDb"]);
  queryClient.refetchQueries(["dbDocumentList", clickedDBId]);
}
```

추후에 상태관리 라이브러리인 `jotai`를 도입하고 지역적으로 사용되던 fetch 함수들을 `customHook` 화 시키는 방향으로 리팩토링을 진행하면서 local State의 시점차이로 인해 촉발되던 해당 오류는 일어나지 않았어도 괜찮을 오류가 되었습니다만, 다시한번 리액트와 useState의 동작방시에 대해 깊게 생각해볼 수 있는 계기 였습니다.

<br>

# **🗓 Schedule**

- 1주차

  - 아이디어 수집, 선정
  - 기술 스택 결정 및 학습
  - Git 작업 플로우 결정
  - ESLint, Prettier, Husky 설정
  - KANBAN 작성

- 2주차

  - 리액트 및 Node.js/Express 환경 세팅
  - 로그인 및 로그아웃 구현
  - 데이터베이스 생성, 조회, 삭제 구현
  - 메인화면 구현
  - 헤더 및 사이드바 구현

- 3주차
  - 도큐먼트 생성, 조회, 삭제 구현
  - 리스트뷰 구현
  - 디테일뷰 구현
  - 포탈 및 관계설정 구현
  - 에러페이지 구현

  <br>

# **👨‍👩‍👦 Memoir**

<details><summary>김재환</summary>
처음 진행해보는 협업 싸이클 속에서 우당탕탕 진행된 팀 프로젝트 였습니다. 치열하게 고민하고 토론하며 결과물을 만들어가는 과정은 분명 쉽지 않았지만 인풋 그 이상의 아웃풋이 있는 시간이었다고 생각합니다. 사소하다면 사소할 머지 방식을 정하는 과정에서 부터, 아이디어 회의, 일정 및 계획 수립, 구현 및 테스트를 한단계씩 지나 오며 좀 더 견고하고 단단해져가는 팀워크를 바탕으로 작업 했습니다.
<br>
각자 추구하는 방향성이 같지는 않았습니다. 그러나 한가지 확실한 공통점은 모두가 각자의 방식으로 더 좋은 프로젝트를 만들고 싶다는 열망이 있었습니다. 그러한 공통점을 중심으로 서로의 의견을 조율해가며 진행하는 프로젝트는 서로의 목소리에 귀기울여가며, 모두가 납득할 수 있는 방향성을 찾아가는 과정이었다고 생각합니다. 이는 곧 어떤 환경에서 저희가 그 누구와 작업을 하더라도 가장 중요한 가치라고 생각합니다.
</details>
<details><summary>김병균</summary>
프로젝트 아이디어부터 시작해서, 깃 전략, 커밋 메시지 및 브랜치명 컨벤션, 코드 컨벤션, 기술 스택까지 중요한 의사결정을 하나하나 치열하게 토의하고 결정했던 과정이 너무나도 값진 시간이었습니다. 지금껏 학습한 내용을 점검하고, 고도화하고, 실제 프로덕트 레벨 서비스로 발전시키는 과정에서 많은 배움과 성장, 성찰이 있었습니다.
</details>
<details><summary>김유진</summary>
김씨 셋이서 팀을 이루고 난 뒤 맞이한 첫번째 날, 협동작업에 관한 모든게 처음이라 막막했지만 침착하게 한단계 한단계 밟아나갔던 것이 기억이 납니다. 낯설기만한 깃을 이용한 협동과정을 제대로 이해하기 위해 먼저 테스트레포를 생성한 후 납득이 갈 때까지 브렌치생성과 머지연습을 반복했습니다. 전체 일정과 API 디자인을 미리 계획하고 시작하는 것에 서툴러서 많은 조사와 토의를 하고 다른 숙련자들은 어떤 기술을 쓸까, 어떤 방식으로 진행할까 활발하게 조사하고 고민하였습니다. 그렇게 하나 둘 구체적인 계획들이 수립되자 아무것도 없던 도화지에 밑그림이 술술 그려지기 시작했습니다. 거대한 산 같기만 했던 이 프로젝트를 우리가 오를 수 있겠구나, 정말 구현을 할 수 있겠다라는 자신감이 생겼습니다.
<br><br>
저희 셋은 성격도 개발에서 중요히 여기는 가치도 조금씩 달랐습니다. 뜨거운 토론 속에 좀처럼 의견을 좁히지 못할 때는 내심 걱정이 되기도 했습니다. 그러나 각자 원하는 방향성을 토의를 통해 조금씩 절충해나가자 세 꼭지점들 사이에 있던 팽팽하게 끊어질 것 같던 선이 한결 부드러워졌습니다. 그리고 걱정은 프로젝트에 진심인 팀원들에 대한 깊은 신뢰와 믿음으로 바뀌었습니다. 서비스 구상과 칸반준비가 마무리 된 후 저희는 프로젝트에 돌입하기 전, 이 프로젝트를 통해 무엇에 능숙한 사람으로 거듭나고 싶은지 각자 솔직하게 공유하여 의기투합하였습니다. 이 때에 나눈 이야기는 어려움에 봉착할 때마다 이 프로젝트를 진행하는 목적, 그리고 배울 수 있는 것을 상기시켜주어 마음을 다 잡는데 도움을 주었습니다. 제가 부족한 부분이 있을 때면 그 방면에 더 소상한 다른 멤버가 이끌어주고, 때로는 제가 더 능숙한 부분에 관해서는 다른 멤버에게 피드백을 해주며 긍정적인 분위기속에서 함께 작업을 해나갔습니다. 서로 다른 사람들이 힘을 모으면 어떤 시너지효과를 낼 수 있는지 느낀 순간이었습니다.　<br><br>
DataFace는 UI/UX와 그를 뒷받힘하는 백엔드 쿼리 로직, 데이터베이스 모델링 등 다방면의 기술이 결합되어있습니다. 비즈니스툴에 가까운 서비스이기에 톡톡튀는 엔터테이닝한 앱은 아니지만, 데이터CRUD와 UI의 합작품인 웹애플리케이션의 작동원리 이해하고 이전에 몰랐던 데이터베이스 관리툴에 대한 식견도 넓힐 수 있는 매우 뜻 깊은 프로젝트였습니다. 혼자였다면 시도해보기 어려웠을 이 복합적인 프로젝트를 목표삼고 완성할 수 있었던 것은 재환님 병균님이 함께 계셔준 덕분이라고 생각합니다. 이번 프로젝트를 진행하며 문제점을 끝까지 해결하고자 하는 마음가짐, 팀원 사이의 의사소통법, 그리고 깃을 통한 협동방법을 배울 수 있었습니다. 앞으로 다른 개발자님들과 함께 협력하며 소프트웨어 개발을 할 때에 이 경험을 적용할 수 있으면 기쁠 것 같습니다. </details>
