# League of Legends 소환사 전적검색 사이트

## 소개

Riot Api를 활용하여 전적검색 사이트 만들기

### 시작하기

**현재 Riot API key 재발급 필요**
```
npm install
npm run start
```
  
---

### 기술 스택

**1. HTML5**

**2. CSS3**

**3. CRA (create-react-app)**

(auto installed by CRA)
- webpack (bundler)
- babel

- others..

**4. React Library**
- axios
	- HTTP통신으로 RIOT API 가져오기
- gh-pages 
	- github의 호스팅 서비스 이용하기
  
---

### Dependencies
"dependencies": {

"@testing-library/jest-dom": "^5.11.4",

"@testing-library/react": "^11.1.0",

"@testing-library/user-event": "^12.1.10",

"axios": "^0.21.4",

"gh-pages": "^3.2.3",

"react": "^17.0.2",

"react-dom": "^17.0.2",

"react-scripts": "4.0.3",

"web-vitals": "^1.0.1"

}

---

### 겪었던 어려움

#### 문제 1.

**내용** : useEffect 사용 시 exhaustive-deps-warning

**원인** : useEffect가 의존성배열을 두번째 인자로 받았을 때, 배열 내에 선언하지 않고 쓰인 useEffect 외부의 변수와 함수 때문에 warning을 던졌다. 

**해결** : 본 프로젝트에서는 의도적으로 state가 업데이트 되었을 때, useEffect 가 다시 실행되지 않도록 유도했기 때문에 의존성배열에 특정 함수를 추가하기 보다, useEffect 함수 내에서 특정 함수를 정의하여 warning을 제거했다.

**기타** : 
구글링을 하여 찾은 해결책으로는 다음과 같다
1. 의존성 배열에 state 삽입
2. useCallback 사용
3. useEffect내에서 함수 선언

소환사의 닉네임을 기준으로 전적이 검색된다. 따라서 nickName state가 변경될때만 useEffect가 실행되었으면 해서 의존성배열 내에는 [nickName] 만 선언되어 있어야 한다. 구조적으로 다른 state가 의존성 배열에 추가되면 기능이 동작하지 않는다. 따라서 1번 2번과 같은 해결책을 쓸 수 없었다. 그래서 3번 해결책을 사용했다. 결과적으로 useEffect 안에 함수를 모두 정의하여 문제를 해결했다. 그렇지만 이로 인해 가독성이 떨어지게 된것 같다. useState 변수 선정과 구조를 변경한다면 좀 더 올바른 해결책을 적용할 수 있을것으로 예상된다.

#### 문제 2.

**내용** : gh-pages 로 github에 호스팅된 페이지에서만 데이터 불러오기 실패(로컬 환경에서는 성공적으로 동작)

**원인** : 데이터를 http를 통해 요청하였기 때문에 error를 던짐

**해결** : http를 https로 모두 바꾸어주었다.

**기타** : 간단하고 당연한 문제일 수 있겠지만 내 로컬에서는 잘 동작하는데 호스팅하니 동작하지 않게 되니 당황스러웠다. 그래도 다음엔 이와 같은 실수를 하지 않게 될것이므로 좋게 생각한다.


#### 문제 3.

**내용** : 팀의 승패를 표시하기 위해 같은 컴포넌트의 다른 스타일링이 필요.

**해결** : className이 다른 컴포넌트를 조건부로 생성하여서 스타일링하였다. 

**기타** : 더 좋은 방법을 찾기 위해 검색했을 때, 위와 같이 className을 다르게 설정하여 스타일링 하는것은 좋은 방법이 아니었다. 같은 기능을 하고 같은 데이터를 보여주지만 스타일링을 다르게 할려면 일반적인 CSS가 아닌 SCSS, Styled Components 를 사용하면 된다는 것을 알았다. 다음 프로젝트에서 사용해봐야겠다.

#### 문제 4.

**내용** : git branch 개념을 잘 이해하지 못하여 git 사용에 어려움을 느꼈음.

**해결** : search 기능을 구현할때 search 라는 branch를 생성하여 remot repo에 push 한다음 main branch 와 merge 해보았음.

**기타** : 지금 당장은 혼자하는 프로젝트이기에 branch의 필요성을 못느끼지만 나중의 협업을 위해 branch를 사용해보았다. 처음에 search branch 를 push 하지않고 merge를 하려고 하여서 안되었었다. push를 하지 않는다면 지금 내가 쓰고있는 branch 가 main이나 search나 같다는 것을 알고, branch에 대한 개념을 확고히 하게 되었다.

---

## 향후 계획

1. 다양한 스타일링 방법 사용.

2. 다양한 사이트 클론 코딩하기.

3. 실제로 서비스 운영을 위한 방법 고민하기.

