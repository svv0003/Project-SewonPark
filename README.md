
# 👕 유니클로 클론 E-commerce 웹사이트

SPA(Single Page Application)의 원리를 이해하고 jQuery를 활용하여 동적인 웹 페이지를 구현한 유니클로 클론 코딩 프로젝트입니다. 회원 관리, 상품 검색 및 상세 보기 등 실제 이커머스 사이트의 핵심 기능을 프론트엔드 단에서 구현했습니다.

## 라이브 데모

<div align="center">

### **[배포된 웹사이트 보기](https://www.google.com/search?q=https://project-sewon-park.vercel.app/)**

[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://project-sewon-park.vercel.app/)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white)](https://project-sewon-park.vercel.app/)

**별도 설치 없이 위 링크에서 바로 체험 가능합니다.**

</div>

## 프로젝트 개요

이 프로젝트는 서버 없이 프론트엔드 기술만으로 실제 쇼핑몰의 사용자 경험을 시뮬레이션하는 것을 목표로 합니다. `localStorage`와 `sessionStorage`를 활용하여 사용자 데이터를 관리하고, `JSON` 파일을 통해 상품 정보를 동적으로 렌더링합니다.

### 주요 특징

  - **회원 관리 시스템**: `LocalStorage`를 DB처럼 활용한 회원가입, 로그인/로그아웃, 회원정보 수정 및 탈퇴 기능.
  - **동적 상품 렌더링**: `JSON` 데이터를 `fetch`하여 상품 목록 및 상세 정보를 동적으로 생성.
  - **검색 및 필터링**: 키워드 검색 및 카테고리별 상품 필터링 기능 구현.
  - **인터랙티브 UI**: 메인 페이지의 스크롤 기반 이미지 슬라이더, 동적 메뉴 등 사용자 상호작용 강화.
  - **반응형 디자인**: 미디어 쿼리를 사용하여 데스크톱, 태블릿, 모바일 등 다양한 디바이스 환경에 최적화된 레이아웃 제공.

## 기술 스택

### Frontend

  - **HTML5**: 시맨틱 마크업, 웹 접근성 준수.
  - **CSS3**: Flexbox, Grid를 활용한 레이아웃, 반응형 디자인을 위한 미디어 쿼리.
  - **JavaScript (ES6+)**: DOM 조작, 이벤트 처리, 비동기 데이터 통신.
  - **jQuery 3.7.1**: `AJAX`를 통한 데이터 로딩, 간결한 DOM 조작 및 이벤트 핸들링.

### 데이터 & 스토리지

  - **LocalStorage**: 회원 정보 데이터베이스 역할을 하여 영구 저장.
  - **SessionStorage**: 로그인한 사용자의 세션 정보 관리.
  - **JSON**: 상품 및 모델 이미지 데이터 구조화 및 관리.

### 배포

  - **Vercel**: 프론트엔드 프로젝트 배포 자동화.

## 프로젝트 구조

```
uniqlo-clone/
│
├── 📄 index.html              # 메인 홈페이지
│
├── 🎨 css/                     # CSS 스타일시트
│   ├── index.css               # 메인 페이지 전용 스타일
│   ├── styles.css              # 공통 및 반응형 스타일
│   ├── login.css               # 로그인 페이지 스타일
│   ├── register.css            # 회원가입 페이지 스타일
│   ├── myPage.css              # 마이페이지 스타일
│   ├── search.css              # 상품 검색 결과 페이지 스타일
│   └── detail.css              # 상품 상세 페이지 스타일
│
├── 🖼️ img/                     # 이미지 리소스
│   ├── UNIQLO_logo.jpeg        # 브랜드 로고
│   └── [20+ 상품/모델 이미지]     # 메인 페이지 슬라이더용 이미지
│
├── ⚙️ JS/                      # JavaScript 파일
│   ├── index.js                # 메인 페이지 (슬라이더, 메뉴)
│   ├── login.js                # 로그인/로그아웃 로직
│   ├── register.js             # 회원가입 및 유효성 검사
│   ├── myPage.js               # 마이페이지 기능
│   ├── userInfo.js             # 회원정보 수정
│   ├── withdraw.js             # 회원 탈퇴
│   ├── search.js               # 상품 검색 및 페이지네이션
│   ├── detail.js               # 상품 상세 정보 렌더링
│   ├── scripts1.js             # 페이지 공통 헤더 스크립트 (검색, 메뉴 등)
│   └── scripts2.js             # 페이지 공통 헤더 스크립트 (로고 클릭)
│
├── 📦 JSON/                    # 데이터 파일
│   ├── product.json            # 전체 상품 상세 정보
│   └── model.json              # 메인 페이지 슬라이더 모델 정보
│
└── 📃 Pages/                   # 서브 페이지 HTML
    ├── login.html              # 로그인 페이지
    ├── register.html           # 회원가입 페이지
    ├── myPage.html             # 마이페이지
    ├── userInfo.html           # 회원정보 상세/수정
    ├── withdraw.html           # 회원탈퇴 페이지
    ├── search.html             # 검색 결과 페이지
    └── detail.html             # 상품 상세 페이지
```

## 실행 방법

### 온라인에서 바로 체험

**가장 쉬운 방법** - 별도 설치 없이 아래 링크에서 바로 사용 가능합니다.

👉 **[https://project-sewon-park.vercel.app/](https://www.google.com/search?q=https://project-sewon-park.vercel.app/)**

### 로컬 환경에서 실행

#### 요구 사항

  - 웹 브라우저 (Chrome, Firefox, Safari, Edge 등)
  - 코드 에디터 (예: VS Code)
  - 로컬 웹 서버 (VS Code의 `Live Server` 확장 프로그램 권장)

#### 설치 및 실행

1.  **저장소 클론**

    ```bash
    git clone https://github.com/svv0003/Project-SewonPark.git
    cd Project-SewonPark
    ```

2.  **VS Code Live Server로 실행**

      - VS Code에서 프로젝트 폴더를 엽니다.
      - `Live Server` 확장 프로그램이 설치되어 있지 않다면 설치합니다.
      - `index.html` 파일을 우클릭한 후, "Open with Live Server"를 선택합니다.

3.  **브라우저에서 접속**

      - 서버가 실행되면 자동으로 브라우저에서 `http://127.0.0.1:5500` (또는 다른 포트) 주소로 열립니다.

## 핵심 기능 구현

### 1\. 회원 관리 시스템 (register.js, login.js, userInfo.js)

`localStorage`를 사용하여 사용자 정보를 JSON 문자열 형태로 저장하고, `sessionStorage`로 로그인 상태를 유지합니다.

```javascript
// [register.js] - 신규 회원 정보 저장
function register(e) {
  // ... 유효성 검사 ...

  // 기존 userList를 localStorage에서 가져오기
  let userList = JSON.parse(localStorage.getItem("userList") || "[]");

  // 이메일 중복 체크
  const existing = userList.find((user) => user.email === email);
  if (existing) { /* 에러 처리 */ return; }

  // 새 사용자 객체 생성 및 userList에 추가
  const newUser = { name, email, password, /*...*/ };
  userList.push(newUser);

  // 업데이트된 userList를 다시 localStorage에 저장
  localStorage.setItem("userList", JSON.stringify(userList));
  alert("회원가입이 완료되었습니다.");
}

// [login.js] - 로그인 정보 확인 및 세션 생성
function loginBtn(e) {
  // ...
  let userList = JSON.parse(localStorage.getItem("userList") || "[]");

  // localStorage에서 이메일과 비밀번호가 일치하는 사용자 찾기
  const loggedInUser = userList.find(
    (data) => data.email === inputEmail && data.password === inputPW
  );

  if (loggedInUser) {
    // 로그인 성공 시, sessionStorage에 사용자 정보 저장
    sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    window.location.href = "../index.html";
  }
}
```

### 2\. 동적 상품 렌더링 시스템 (search.js, detail.js)

jQuery의 `AJAX`를 사용해 `product.json` 파일을 비동기적으로 로드하고, URL 쿼리 파라미터에 따라 상품을 필터링하여 화면에 동적으로 렌더링합니다.

```javascript
// [search.js] - URL 파라미터 기반 상품 목록 생성
function renderPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("query");
    const genderAge = urlParams.get("genderAge");
    const page = parseInt(urlParams.get("page") || "1", 10);

    // 검색어 또는 카테고리에 따라 products 배열 필터링
    let filteredProducts = products;
    if (query) {
      filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
    } else if (genderAge) {
      // ... 카테고리 필터링 로직 ...
    }

    // 필터링된 상품들을 HTML로 변환하여 삽입
    const product_list = $("#product-list");
    product_list.empty();
    productsPerPages.forEach((product) => {
      product_list.append(`
        <div class="product-item" onclick="goToDetail('${product.referenceNumber}')">
          <img src="${product.image[initialColor]}" alt="${product.title}">
          // ... 상품 정보 ...
        </div>
      `);
    });
}
```

### 3\. 메인 페이지 스크롤 슬라이더 (index.js)

스크롤 위치에 따라 `model.json`에 정의된 이미지를 배경으로 동적으로 변경하여 인터랙티브한 경험을 제공합니다.

```javascript
// [index.js]
$(window).on("scroll", function () {
    const index = getCurrentIndex(); // 스크롤 위치 기반 인덱스 계산
    setSliderImage(index); // 해당 인덱스의 이미지로 배경 변경

    // 다음 이미지를 미리 로드하여 끊김 방지
    preloadImage((index + 1) % totalImages);
});

// 현재 스크롤 위치로 이미지 index 계산
function getCurrentIndex() {
    const scrollTop = $(window).scrollTop();
    const sectionHeight = $(window).height(); // 화면 높이를 한 섹션의 높이로 간주
    return Math.floor(scrollTop / sectionHeight) % totalImages;
}

// 슬라이더 배경 이미지 설정
function setSliderImage(index) {
    slider.css({
        "background-image": `url(${imageData[index].image})`,
    });
}
```

## 기능 테스트 방법

### 회원가입 및 로그인

1.  메인 페이지 우측 상단 '사람' 아이콘 클릭 → `로그인` 페이지로 이동.
2.  `신규 회원가입` 버튼 클릭.
3.  양식에 맞춰 정보를 입력하고 `회원가입` 완료. (입력한 정보는 브라우저의 `localStorage`에 저장됩니다.)
4.  가입한 이메일과 비밀번호로 `로그인`.
5.  로그인 후 '사람' 아이콘을 다시 클릭하면 `마이페이지`로 이동하는지 확인.

### 상품 검색 및 조회

1.  메인 페이지 또는 다른 페이지 상단의 '돋보기' 아이콘 클릭.
2.  검색창에 "셔츠", "팬츠" 등 키워드 입력 후 Enter.
3.  검색 결과가 `검색 결과` 페이지에 정상적으로 표시되는지 확인.
4.  `메뉴` 버튼을 눌러 카테고리를 선택하고, 해당 카테고리 상품 목록이 나타나는지 확인.
5.  상품 목록에서 특정 상품을 클릭하여 `상세 페이지`로 이동하는지 확인.

## 브라우저 호환성

### 지원 브라우저
- ✅ Chrome 90+ (권장)
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### 핵심 기능 호환성
- ✅ CSS Grid & Flexbox
- ✅ ES6+ JavaScript
- ✅ jQuery 3.7.1
- ✅ LocalStorage / SessionStorage

<div align="center">

**Uniqlo Clone 프로젝트를 통해 웹 프론트엔드의 동적 기능 구현을 경험해보세요.**

🔗 **[웹사이트 체험하기](https://project-sewon-park.vercel.app/)**

</div>
