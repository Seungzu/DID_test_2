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
    - DID회원가입할때 APIKey 주니까 APIKey 는 개발자가 알고있다
    - 어디서 요청을 보냈는지 도메인 따서, 등록해 놓은 DIDapp 의 host와 비교

3. 조회가 성공하면 개발자가 DID 사이트에서 설정해놓은 app의 redirectUri로 login_server로 요청을 보내
    GET요청으로 DID 로그인 창을 띄운다.

4. user가 로그인을 한다. 만약 아이디가 없다면 DID 회원가입 진행 후 로그인 한다.

5. 로그인에 성공하면 facebook 서버로 true응답과 함께 code ( access Token ) 를 발급해준다. code는 token을 받기위함

6. code를 facebook에 보내서 facebook은 DID_Login_server로 요청을 보내서 ( userData를 받아오기 위해 ) token발급
    - jwt로 발급, payload에 유저정보 넣고 발급해줌

7. token을 발급 받았다면 그 토큰을 login_server로 보내서 유저정보 응답받을수 있음
    - payload안에 유저정보있음 salt값 넣어서 유저정보 응답해줌

8. 로그인 한 유저는 connected table에 저장되어 DID 메인사이트에서도 볼수 있음.

9. 이제 facebook 에서 그 유저정보들을 가지고 알아서 로그인 할수 있음
10. 우리의 궁극적인 목표는 우리페이지에 로그인되어있는 유저는
   어느페이지던 우리에게 요청보내면 유저정보를 보낼수 있음
