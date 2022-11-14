- 어떤 플랫폼을 가지고있는 개발자의 가정
어떤 개발자( Mark )는 자신이 개발한 홈페이지( Facebook ) 에서
우리의 DID를 이용한 SSO 서비스를 이용하고싶다. ( 통합 로그인 )

개발자는 DID 사이트에 회원가입 -> 로그인 -> dev -> application 등록 을 해야한다.
application 등록에는 appName, appDescription, appImg, host, redirectUri, APIKey 가 있다.

appName = facebook
appDescription = facebook에 대한 간단한 설명, 예) 지구상 가장 유명한 SNS
appImg = Facebook Logo
host = https://www.facebook.com 이다.
redirectUri = Login_server로 접근하기 위한 redirectUri
APIKey = uuid로 랜덤으로 부여해준다.

ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

- facebook 유저의 입장에 대한 가정
facebook에서 어떤 유저는 facebook 자체의 로그인이 아닌 우리 DID 서비스를 이용하고 싶어한다.

1. 유저는 facebook에서 DID 로그인을 클릭한다.

2. facebook이 가지고있는 APIKey가 DID Server에 있는지 가장먼저 조회
    - 어디서 요청을 보냈는지 도메인 따서, 등록해 놓은 DIDapp 의 host와 비교

3. 조회가 성공하면 개발자가 DID 사이트에서 설정해놓은 app의 redirectUri로 login_server로 요청을 보내
    GET요청으로 DID 로그인 창을 띄운다.

4. user가 로그인을 한다. 만약 아이디가 없다면 DID 회원가입 진행 후 로그인 한다.

5. 로그인에 성공하면 facebook 서버로 true응답과 함께 code를 발급해준다. code는 token을 받기위함

6. code 와 함께 DID_Login_server로 요청을 다시 보내서 token발급 

7. token을 발급 받았다면 그 토큰을 login_server로 보내서 유저정보 응답받을수 있음




DID에서 설정해 놓은 redirectUri로 

여기서 만들어진 APIKey를 이용하여 Facebook에서 DID_Login서버로 접근할수 있게 된다.




테스트사이트에는 로컬 로그인, DID 로그인이 있다.
DID로그인을 클릭하게 되면 DID_Login서버로 요청이간다.

