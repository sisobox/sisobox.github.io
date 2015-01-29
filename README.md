[NHN Technology Services] 프런트엔드 개발과제
네이버 모바일 페이지 http://m.naver.com 접속하여 "환율"키워드 검색후 실서비스와 동일한 스펙구현하기.

개발환경 : HTML, CSS, Bootstrap-3.3.2, jquery-1.10.2, node.js, express, cron module

개발소스 실행방법 : 1. 소스를 다운 받습니다.
                    2. 압축을 해제합니다.
                    3. node app.js로 서버를 실행합니다. (PC에 노드가 설치되어 있어야 확인이 가능합니다.)
                    4. http://127.0.0.1:4000 접속합니다.
                    
데모사이트 : http://54.64.63.0:4000 (언제 어디서나 과제를 확인할 수 있게 서버에 올렸으니 확인 부탁드립니다.)
             
주의점 : http://community.fxkeb.com/fxportal/jsp/RS/DEPLOY_EXRATE/fxrate_all.html에서 
         환율 정보를 얻어와서 계산하는 식으로 코딩을 구현하였습니다. 그래서
         http://m.naver.com 환율정보와 비교하면 데이터 가져오는 기준과 전일 데이터 저장시점이 달라
         값들이 다르게 보일 수 있는점 양해바랍니다.
         
구현하지 못한 기능 : 1. 3개월, 1년, 3년 데이터 정보를 불러와서 그래프로 보여주는 코드.
                     2. TC 살때 데이터 정보를 불러와서 보여주는 코드.

