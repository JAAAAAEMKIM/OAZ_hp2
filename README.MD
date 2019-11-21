# CodeLab-React-Fundamentals 
# velopert님의 코드를 연습용으로 수정중인 깃입니다. 
# 원본강의링크 https://velopert.com/1921


하나와영 홈페이지 README

Dependencies
  babel		: 자바스크립트 컴파일러. 높은 버전의 JS문법을 웹브라우저가 인식할 수 있게			 해 줌
  webpack	: 여러 개의 모듈을 브라우저에서 실행할 수 있게 컴파일 하여 bundle.js로 			 만들어 줌.
  react		: 반응형 웹페이지를 만들 수 있는 Javascript 라이브러리 by facebook
  express	: Nodejs를 편리하게 사용할 수 있는 프레임워크
  nodemon	: 개발시, 소스 수정을 하는 경우 서버를 재시작 해줌.
  bcryptjs	: 비밀번호 암호화에 사용
  axios		: http request에 사용
  bootstrap	: 프론트 디자인에 사용
  dotenv-webpack: .env 파일을 사용할 수 있게 해 줌. 환경변수 관리가 필요할 때 사용
  mongoose	: 몽고디비를 사용할 수 있게 해 줌
  redux		: 상태관리 라이브러리. Reducer와 action으로 나눠 사용됨.
  외 의존모듈 다수 (package.json 참고)

Directories & Files
/(root)			                : 프로젝트 루트 디렉토리
  /build		                : 프로젝트를 빌드하여 만들어지는 디렉토리. (건들필요없음)
  /public		                : favicon.ico, index.html이 들어가는 곳. (별로 안건드림)
  /server		                : 서버관련 파일 디렉토리
  /src			                : 클라이언트 파일 디렉토리
  /.env                     : 환경변수 (License Key값 등)
  /.gitignore		            : git에 안올라갈 파일들 설정(.env, node_modules 등)
  /package-lock.json	      : 안 건드림
  /package.json		          : 사용 패키지 목록과 Name, version, dependencies, npm run option 등.
  (npm run development했을 때 main.js를 읽게 하고, babel로 hot-loading가능하도록 해줌.)
  /webpack.config.js	      : 웹팩 설정파일 (배포용)
  /webpack.dev.config.js	  : 웹팩 설정파일 (개발용)

/server
  /models	: DB 스키마 파일 디렉토리
  /account.js	: account 스키마 정함. 비밀번호 hashing(bcryptjs).
  /memo.js	: memo 스키마 정함.
  /routes	: 라우터 설정 파일들 디렉토리
  /account.js	: /models에서 만든 account schema를 가져와서 express router를 				 이용하여 signin, signup, logout 작업을 수행함. 
  /index.js	: 라우터 인덱스 파일(import 할 때 routes directory를 import할 수 				 있도록 해 줌)
  /memo.js	: /models에서 만든 memo schema를 가져와서 express router를 				 이용하여 메모작성, 찾기, 로드, 삭제 작업을 수행함.
  /main.js	: 서버 메인 파일. 포트/개발포트 설정, 몽고DB와 연결, 세션설정, ‘/api’ 사용,			 client-side routing 사용하기 등의 작업을 함.

/src
  /actions	: 리덕스에서 사용하는 “action”들과 타입들이 정의됨. 이 액션들은 다른			 함수를 반환하여 컴포넌트에서 dispatch를 통해 반환된 함수를 사용할			 수 있게 하거나, 상태(액션타입; 상수)를 반환하여 리듀서에서 감지할 수			 있게 함.
  /ActionTypes.js     : 모든 Action type(상수)를 여기에 정의하여 사용.
  /authentication.js	: authentication 관련 액션들
  /memo.js		        : memo 관련 액션들
  /assets/images	    : 로고 등의 이미지가 저장되는 곳.
  /components	        : 틀, 레이아웃 등이 나타나는 부분. (ex 버튼을 만든다, 제목칸을 만든다.) props를 이용하여 필요한 함수와 값을 container로부터 받을 수 있다.
  /containers	        : 컴포넌트에서 필요한 기능과 함수들이 만들어지는 부분. (ex 버튼을 누를 때 		 어떤 함수가 실행되게 한다.) 리듀서와 연결이                         필요한 애들이 여기 있다.
  /reducers	          : 위에 정의된 액션을 통하여 상태의 변화를 감지하여 리듀서를 구독하고 있는 컴포넌트에서도 상태(ex, 로그인상태)가 업데이트                           되게해 줌. Action이 행동			 부분을 나타낸다면 리듀서는 상태변화 부분을 나타냄.
  /authentication.js	: 로그인 관련 리듀서
  /index.js		        : 리듀서 인덱스 파일
  /memo.js		        : 메모작성 관련 리듀서
  index.js	          : Client-side 진입부(entry). 리액트라우터와 리덕스 등이 정의되어있음.
  style.css	          : 스타일 수정하는 css

/src/components
  Authentication.js : 로그인, 회원가입 화면을 담당하는 컴포넌트
  Board.js	        : 공지, 게시판 등의 화면이 나타날 컴포넌트
  Header.js	        : 헤더(nav bar)
  Memolist.js	      : 메모들을 리스트로 만들어줄 컴포넌트.
  Write.js	        : 메모쓰는 부분의 틀을 잡아주는 컴포넌트.
  index.js	        : component directory index
  memo.js	          : 각 메모의 모양을 만들어주는 컴포넌트
  oazhome.css	      : 홈 페이지 꾸미는 css파일
  oazhome.js	      : 풀페이지.js를 사용한 홈 화면 컴포넌트

/src/containers
  app.js		  : cookie와 로그아웃 등을 관리
  home.js	    : write와 memolist를 불러와서 그에 필요한 함수들을 만들어 넣어주는 곳.
  login.js	  : authentication 컴포넌트를 불러와서 로그인 함수를 만들어 넣어주는 곳.
  register.js	: 	“	   “	     “	   회원가입 “		“	“
  index.js	  : container directory index
