$(function () {
  // JSON 데이터 가져오기
  let products = [];
  $.ajax({
    url: "../json/product.json",
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
      const initialColor = product.color[0];
      $("#product-image").html(`<img src="${product.image[initialColor]}" alt="${product.title} ${initialColor}">`);
      $("#product-title").text(product.title);
      $("#product-brand").html(`${product.brand}`);
      $("#product-price").html(`${product.price.toLocaleString()}원`);
      $("#product-category").html(`${product.category}`);
      $("#product-lineup").html(`${product.lineup}`);
      $("#product-genderAge").html(`${product.genderAge}`);
      $("#product-referenceNumber").html(`${product.referenceNumber}`);
      $("#product-description").html(`${product.description || "설명 없음"}`);
      $("#product-registerDate").html(`${product.registerDate}`);

      const colorOption = {
        "00 WHITE": "#FFFFFF",
        "01 OFF WHITE": "#F5F5F5",
        "03 GRAY": "#bfbfbfff",
        "04 GRAY": "#8d8d8dff",
        "07 GRAY": "#707070ff",
        "08 DARK GRAY": "#474747ff",
        "09 BLACK": "#000000",
        "10 PINK": "#ffc8f2ff",
        "11 PINK": "#fab0e9ff",
        "12 PINK": "#ffa2e9ff",
        "19 WINE": "#8d2733ff",
        "30 NATURAL": "#ffffd8ff",
        "31 BEIGE": "#e5e5adff",
        "32 BEIGE": "#d3d38fff",
        "34 BROWN": "#af8254ff",
        "35 BROWN": "#9f7042ff",
        "36 BROWN": "#926131ff",
        "39 DARK BROWN": "#654321",
        "41 YELLOW": "#fff157ff",
        "46 YELLOW": "#fffb00ff",
        "56 OLIVE": "#8c8c00ff",
        "57 OLIVE": "#6d6d02ff",
        "58 DARK GREEN": "#025602ff",
        "60 LIGHT BLUE": "#dde7ffff",
        "61 BLUE": "#d8e2fcff",
        "62 BLUE": "#c5d5ffff",
        "63 BLUE": "#c3d4ffff",
        "64 BLUE": "#81a5ffff",
        "65 BLUE": "#335ecbff",
        "66 BLUE": "#2b50adff",
        "67 BLUE": "#1941a8ff",
        "68 BLUE": "#0a2b7eff",
        "69 NAVY": "#081c4eff",
        "72 PURPLE": "#a019f4ff",
        "79 DARK PURPLE": "#4b0082ff"
      };

      // 색상 버튼 생성
      const colorButtons = product.color.map(color => {
        const defaultColor = colorOption[color] || "#CCCCCC";
        // 해당 제품 색상을 가져와서 화면에 표현하기
        return `<div class="color-option" style="background-color: ${defaultColor};" data-color="${color}"></div>`;
      }).join('');
      $("#color-options").html(colorButtons);


      // 색상 버튼 클릭 시 해당 색상의 이미지로 변경하기
      $("#color-options .color-option").click(function () {
        $("#color-options .color-option").removeClass("selected");
        $(this).addClass("selected");
        const selectedColor = $(this).data("color");
        $("#selectedColor").text(selectedColor);
        $("#product-image img").attr("src", product.image[selectedColor]).attr("alt", `${product.title} - ${selectedColor}`);
      });


      // 사이즈 버튼 생성
      const sizeButtons = product.size.map(size => {
        return `<div class="size-option" data-size="${size}">${size}</div>`;
      }).join('');
      $("#size-options").html(sizeButtons);

      
      // 사이즈 버튼 클릭
      $("#size-options .size-option").click(function () {
        $("#size-options .size-option").removeClass("selected");
        $(this).addClass("selected");
        const selectedSize = $(this).data("size");
        $("#selectedSize").text(selectedSize);
      });

      // 수량 조절
      let count = 1;
      $("#decrease-btn").click(() => {
        if (count>1){
          --count;
          $("#quantity").html(count);
        }
      });
      $("#increase-btn").click(() => {
        ++count;
        $("#quantity").html(count);
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
