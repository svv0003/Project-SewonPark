$(function () {
  // JSON 데이터 가져오기
  let products = [];
  $.ajax({
    url: "../JSON/product.json",
    dataType: "json",
    success: function (data) {
      products = data;
      productDetail();
    },
  });

  // 제품 상세 정보 표시하기
  function productDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const referenceNumber = urlParams.get("referenceNumber");

    // referenceNumber로 제품 정보 가져오기
    const product = products.find((p) => p.referenceNumber === referenceNumber);

    if (product) {
      $("#product-image").html(`<img src="${product.image}" alt="${product.title}">`);
      $("#product-title").text(product.title);
      $("#product-brand").html(`${product.brand}`);
      $("#product-price").html(`${product.price.toLocaleString()}원`);
      $("#product-category").html(`${product.category}`);
      $("#product-lineup").html(`${product.lineup}`);
      $("#product-genderAge").html(`${product.genderAge}`);
      $("#product-referenceNumber").html(`${product.referenceNumber}`);
      $("#product-description").html(`${product.description || "설명 없음"}`);
      $("#product-registerDate").html(`${product.registerDate}`);

      // 수량 조절
      $("#decrease-btn").click(() => {
        let quantity = parseInt($("#quantity").val());
        if (quantity > 1) {
          $("#quantity").val(quantity - 1);
        }
      });

      $("#increase-btn").click(() => {
        let quantity = parseInt($("#quantity").val());
        $("#quantity").val(quantity + 1);
      });

      // 위시리스트 추가
      $("#product-wishList").click(()=>{
        $("#heart").toggleClass("add");
        if ($("#heart").hasClass("add")) {
          $("#heart").text("❤️");
        } else {
          $("#heart").text("🤍");
        }
      })

    } else {
      $("#product-detail").html("해당 제품을 찾을 수 없습니다.");
    }
  }
});


/*

색상 key의 value 개수만큼 각 value 색상을 바탕색으로 설정한 "색상 체크박스" 형태로 만들기
사이즈 key의 value 개수만큼 각 value 문자열을 삽입한 "사이즈 체크박스" 형태로 만들기
클릭한 색상, 사이즈 값을 주문 정보에 추가하기
*/