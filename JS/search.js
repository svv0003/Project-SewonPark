$(function () {
  // 페이지 제품 수 30개 제한
  const ITEMS_PER_PAGE = 30;

  // JSON 데이터 가져오기
  let products = [];
  $.ajax({
    url: "../JSON/product.json",
    dataType: "json",
    // 데이터 로딩 성공 시 배열 저장, 페이지 렌더링
    success: function (data) {
      products = data;
      renderPage();
    },
    error: function (xhr, status, error) {
      $("#product-list").html("<p>상품 데이터를 불러오지 못했습니다.</p>");
      renderPage();
    },
  });

  // URL 파라미터 가져오기
  function renderPage() {
    // 현재 페이지의 URL의 쿼리 문자열을 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("query");
    const genderAge = urlParams.get("genderAge");
    const category = urlParams.get("category");
    const page = parseInt(urlParams.get("page") || "1", 10);

    // 화면에 보여질 제품 변수
    let filteredProducts = products;

    // 검색 결과를 출력하는 경우
    if (query) {
      filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    }
      // 카테고리 선택 결과를 출력하는 경우
      else if (genderAge || category) {
      filteredProducts = products.filter((product) => {
        let match = true;

        // 제품 객체의 속성과 URL 쿼리 파리미터 값 비교하기
        if (genderAge)
          match = match && product.genderAge.toLowerCase() === genderAge.toLowerCase();
        if (category)
          match = match && product.category.toLowerCase() === category.toLowerCase();

        // 조건에 해당하는 제품 필터링
        return match;
      });
    }


    // 제품을 30개씩 나눠서 페이지에 표시하기
    function pageReset() {
      const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
      const firstIndex = (page - 1) * ITEMS_PER_PAGE;
      const lastIndex = firstIndex + ITEMS_PER_PAGE;
      const productsPerPages = filteredProducts.slice(firstIndex, lastIndex);

      const product_list = $("#product-list");
      product_list.empty();
      if (productsPerPages.length > 0) {
        productsPerPages.forEach((product) => {
          product_list.append(
            `
            <div class="product-item" onclick="goToDetail('${product.referenceNumber}')" >
              <img src="${product.image}" alt="${product.title}">
              <p style="font-size:0.6rem">브랜드: ${product.brand}</p>
              <h3>${product.title}</h3>
              <p>가격: ${product.price.toLocaleString()}원</p>
            </div>
            `
          );
        });
      } else {
        product_list.html(`<p>검색 결과가 없습니다.</p>`);
      }

      // 현재 페이지 표시하기
      $("#page-info").text(`${page} / ${totalPages} 페이지`);
      // 첫 페이지에서 이전 버튼 비활성화하기
      $("#prev-page").prop("disabled", page === 1);
      // 마지막 페이지에서 다음 페이비 비활성화라기
      $("#next-page").prop("disabled", page >= totalPages);
    }

    // 페이지 렌더링
    pageReset();

    // 페이지네이션
    // URL 쿼리 파라미터를 수정하고, 바뀐 URL로 이동하기
    $("#prev-page").click(function () {
      if (page > 1) {
        // 현재 페이지
        const newUrl = new URL(window.location);
        newUrl.searchParams.set("page", page - 1);
        window.location.href = newUrl;
      } 
      // else {
      //  $("#prev-page").attr("disabled");
      //  alert("첫 번째 페이지입니다.");
      // }
    });
    
    $("#next-page").click(function () {
      if (page < totalPages){
      const newUrl = new URL(window.location);
      newUrl.searchParams.set("page", page + 1);
      window.location.href = newUrl;
      }
      // else {
      //  $("#next-page").attr("disabled");
      //  alert("마지막 페이지입니다.");
      // }
    });
  }
});

function goToDetail(referenceNumber){
  window.location.href = `detail.html?referenceNumber=${encodeURIComponent(referenceNumber)}`;
}