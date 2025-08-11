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
    // 
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("query");
    const genderAge = urlParams.get("genderAge");
    const category = urlParams.get("category");
    const page = parseInt(urlParams.get("page") || "1", 10);

}});
