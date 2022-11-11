- 프라이빗키는 컨트랙을 배포시킨 계정의 비밀키를 써줘야한다.
- 배포시킨 계정의 account도 알아야한다.
- networkURL은 어디에서 누가 배포했느냐에따라 달라진다.
- 우리는 truffle에서 배포했고 ganache계정으로 배포를 했기때문에
  ganache가 제공해준 url로 접근해야한다.
- truffle.config.js에서 network설정을 뭘로했느냐가 관건이다.
- CA는 우리가 배포해놓은 컨트랙을 우리 서버에서 web3를 이용해서 사용하기위해
  알아둬야 한다.
- IDPW_SALT는 컨트랙에 상태변수에 올릴때 둘다 해쉬화해서 올린다.
- crypto_salt는 유저의 정보또한 해쉬해야 하기때문에 그에 따른 salt값이다.
- cookie_salt는 jwt토큰에 필요한 salt값이다.
