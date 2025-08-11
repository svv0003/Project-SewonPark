$(function () {
  // JSON 데이터 가져오기
  let products = [];
  $.ajax({
    url: "../JSON/product.json",
    dataType: "json",
    success: function (data) {
      products = data;
      renderDetail();
    },
    error: function (xhr, status, error) {
      $("#product-detail").html("<p>상품 데이터를 불러오지 못했습니다.</p>");
    },
  });

  // 제품 상세 정보 표시하기
  function renderDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const referenceNumber = urlParams.get("referenceNumber");

    // referenceNumber로 제품 찾기
    const product = products.find((p) => p.referenceNumber === referenceNumber);

    if (product) {
      $("#product-detail").html(
        `
        <div class="product-detail">
          <img src="${product.image}" alt="${product.title}" class="product-image">
          <h2>${product.title}</h2>
          <p><strong>브랜드:</strong> ${product.brand}</p>
          <p><strong>가격:</strong> ${product.price.toLocaleString()}원</p>
          <p><strong>카테고리:</strong> ${product.category}</p>
          <p><strong>라인업:</strong> ${product.lineup}</p>
          <p><strong>성별/연령:</strong> ${product.genderAge}</p>
          <p><strong>사이즈:</strong> ${product.size.join(", ")}</p>
          <p><strong>색상:</strong> ${product.color.join(", ")}</p>
          <p><strong>설명:</strong> ${product.description || "설명 없음"}</p>
          <p><strong>등록일:</strong> ${product.registerDate}</p>
        </div>
        `
      );
    } else {
      $("#product-detail").html("<p>해당 제품을 찾을 수 없습니다.</p>");
    }
  }
});