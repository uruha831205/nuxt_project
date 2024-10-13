import { defineStore } from "pinia";

export const gun_shop = defineStore("gun_shop", () => {
  const guns = shallowRef([
    { name: "突擊步槍" },
    { name: "步槍" },
    { name: "手槍" },
    { name: "狙擊步槍" },
    { name: "霰彈槍" },
  ]);

  const parts = shallowRef([
    { name: "槍管" },
    { name: "板機" },
    { name: "槍機" },
    { name: "火控" },
  ]);

  const components = shallowRef([
    { name: "握把" },
    { name: "手把" },
    { name: "搶托" },
    { name: "瞄準鏡" },
  ]);

  const equipments = shallowRef([
    {
      name: "背心",
    },
    {
      name: "手套",
    },
    {
      name: "腰封",
    },
    {
      name: "護膝",
    },
  ]);

  const airsoft_datas = shallowRef([
    {
      p_id: "A001",
      p_name: "HK-416",
      p_brand: "KWA",
      p_kind: "長槍短槍",
      p_son_kind: "突擊步槍",
      p_price: 5000,
      p_stock: 10,
      p_fornt: "300mm,360mm",
      p_color: ["black", "derest"],
      p_pic:
        "https://www.flytactical.com/wp-content/uploads/2015/12/2-5897X-VI.jpg",
      p_new: "2024/9/10",
    },
    {
      p_id: "A002",
      p_name: "鐵製板機",
      p_brand: "Slong",
      p_kind: "內部零件",
      p_son_kind: "板機",
      p_price: 800,
      p_stock: 50,
      p_fornt: "",
      p_color: "",
      p_pic:
        "https://fs1.shop123.com.tw/200520/upload/product/20052017473pic_outside_347053.jpg",
      p_new: "2024/9/10",
    },
    {
      p_id: "A003",
      p_name: "垂直握把",
      p_brand: "MVG",
      p_kind: "外部配件",
      p_son_kind: "握把",
      p_price: 350,
      p_stock: 20,
      p_fornt: "",
      p_color: ["black", "derest"],
      p_pic:
        "https://img.cloudimg.in/uploads/shops/11494/products/0f/0fb05caa5c19b620ccc935ad5fb6f3c6.jpg",
      p_new: "2024/9/10",
    },
    {
      p_id: "A004",
      p_name: "特勤專用背心",
      p_brand: "其他",
      p_kind: "人身裝備",
      p_son_kind: "背心",
      p_price: 2200,
      p_stock: 5,
      p_fornt: "",
      p_color: "",
      p_pic:
        "https://lh3.googleusercontent.com/proxy/iud5xxs7uaWTGvLd4wCooZcp2ozdgIl6AwmDtlIeie4wK96yZKRL_TdXYGsk9dQ7Jc1uAoW_VQp0mDjvsDEFhpwSj8LEAUCzK7BVnluM0LQ",
      p_new: "2024/9/10",
    },
    {
      p_id: "A005",
      p_name: "HK-416A5",
      p_brand: "KWA",
      p_kind: "長槍短槍",
      p_son_kind: "突擊步槍",
      p_price: 7000,
      p_stock: 10,
      p_fornt: "300mm,360mm",
      p_color: ["black", "derest"],
      p_pic:
        "https://www.flytactical.com/wp-content/uploads/2015/12/2-5897X-VI.jpg",
      p_new: "2024/9/10",
    },
    {
      p_id: "A006",
      p_name: "鐵製板機 V2",
      p_brand: "Slong",
      p_kind: "內部零件",
      p_son_kind: "板機",
      p_price: 850,
      p_stock: 50,
      p_fornt: "",
      p_color: "",
      p_pic:
        "https://fs1.shop123.com.tw/200520/upload/product/20052017473pic_outside_347053.jpg",
      p_new: "2024/9/10",
    },
    {
      p_id: "A007",
      p_name: "垂直握把 V2",
      p_brand: "MVG",
      p_kind: "外部配件",
      p_son_kind: "握把",
      p_price: 400,
      p_stock: 20,
      p_fornt: "",
      p_color: ["black", "derest"],
      p_pic:
        "https://img.cloudimg.in/uploads/shops/11494/products/0f/0fb05caa5c19b620ccc935ad5fb6f3c6.jpg",
      p_new: "2024/9/10",
    },
    {
      p_id: "A008",
      p_name: "特勤專用背心 V2",
      p_brand: "其他",
      p_kind: "人身裝備",
      p_son_kind: "背心",
      p_price: 2300,
      p_stock: 5,
      p_fornt: "",
      p_color: "",
      p_pic:
        "https://lh3.googleusercontent.com/proxy/iud5xxs7uaWTGvLd4wCooZcp2ozdgIl6AwmDtlIeie4wK96yZKRL_TdXYGsk9dQ7Jc1uAoW_VQp0mDjvsDEFhpwSj8LEAUCzK7BVnluM0LQ",
      p_new: "2024/9/10",
    },
  ]);

  const real_datas = shallowRef([
    {
      p_id: "001",
      p_name: "AK-47",
      p_brand: "Kalashnikov",
      p_kind: "長槍短槍",
      p_son_kind: "突擊步槍",
      p_price: 120000,
      p_stock: 3,
      p_fornt: "",
      p_color: "",
      p_pic: "https://cdn.britannica.com/70/123170-050-D7AAF458/AK-47.jpg",
      p_new: "2024/9/10",
      p_other_pics: [
        "https://cdn.britannica.com/70/123170-050-D7AAF458/AK-47.jpg",
        "https://cdn11.bigcommerce.com/s-wkf3yob290/images/stencil/1280x1280/products/1211/14494/NEDI_AK47_1__66854.1674565080.png?c=2",
        "https://www.jbmilitaryantiques.com.au/wp-content/uploads/2018/02/H20235-L280619616_original-scaled.jpg",
      ],
      p_describtion:
        "AK發射7.62×39公釐中間型威力槍彈，由容量為30發子彈的弧形彈匣供彈，其保險／射擊選擇桿的設計則參考自美國雷明頓8型半自動步槍，設置在機匣右側，可以選擇半自動或者全自動的發射方式，槍機拉柄位於機匣右側，為槍機座的一部份。AK的槍機動作可靠，即使在連續射擊時有灰塵等異物進入槍內，它的機械結構仍能保證繼續正常運作，並可以在沙漠、熱帶雨林、嚴寒等極度惡劣的環境下保持相當好的效能，而且它的結構簡單，易於分解、清潔和維修，操作簡便。",
    },
    {
      p_id: "002",
      p_name: "快速反應板機",
      p_brand: "SALVIMAR",
      p_kind: "內部零件",
      p_son_kind: "板機",
      p_price: 9000,
      p_stock: 10,
      p_fornt: "",
      p_color: "",
      p_pic: "https://cf.shopee.tw/file/cdfc5b403ba2ef0320ab780618aa3473",
      p_new: "2024/9/10",
      p_other_pics: [
        "https://cf.shopee.tw/file/cdfc5b403ba2ef0320ab780618aa3473",
        "https://www.aawee.fi/storage/product_images/2/GeisseleSuper3GUNAR-15laukaisukoneisto_854014005052_2390c0d7e8ac_4.webp",
        "https://sonsoflibertygw.com/wp-content/uploads/2024/06/L2S-White-1.jpg",
      ],
      p_describtion:
        "MEC Pro Trigger可以輕鬆實現更緊密的扳機拉力。直板扳機設計提供了短拉幾何形狀。",
    },
    {
      p_id: "003",
      p_name: "RA-TECH MOE 戰術握把",
      p_brand: "RA-TECH",
      p_kind: "外部配件",
      p_son_kind: "握把",
      p_price: 2250,
      p_stock: 10,
      p_fornt: "",
      p_color: "black,green",
      p_pic:
        "https://pts-steelshop.com.tw/cdn/shop/products/PT124450313-1.webp?v=1690344275&width=1000",
      p_new: "2024/9/01",
      p_other_pics: [
        "https://pts-steelshop.com.tw/cdn/shop/products/PT124450313-1.webp?v=1690344275&width=1000",
        "https://pts-steelshop.com.tw/cdn/shop/products/PT124450313.webp?v=1690344275&width=500",
      ],
      p_describtion:
        "PTS Enhanced Polymer M4 Grip - Compact (EPG-C) 是一款簡單但功能強大的 M4/M16 平台專用聚合物手槍握把。它具有人體工學設計的形狀和獨特的紋理，經過優化，即使在惡劣環境下也能提供強大且合適的握把力。此外，EPG-C 的握把角度比標準的 M4 握把更小，更適合現代卡賓槍戰鬥和近距離作戰姿勢。這種握把角度有助於減輕手腕的負擔，並有助於將手放在更接近扳機位置，以獲得更好的扳機控制。它能讓使用者在將槍托完全折疊或完全伸展的情況下同樣舒適地操作槍械。",
    },
    {
      p_id: "004",
      p_name: "5.11-TACTEC PLATE CARRIER 戰術背心",
      p_brand: "5.11",
      p_kind: "人身裝備",
      p_son_kind: "背心",
      p_price: 8500,
      p_stock: 5,
      p_fornt: "",
      p_color: "",
      p_pic:
        "https://shopstore-image.shopstore.tw/7656/product/7656_643a9aea42e06.jpeg",
      p_new: "2024/9/10",
      p_other_pics: [
        "https://shopstore-image.shopstore.tw/7656/product/7656_643a9aea42e06.jpeg",
        "https://storage.googleapis.com/shopstore-upload/7656/product/7656_643a9aebc61be.jpeg",
        "https://storage.googleapis.com/shopstore-upload/7656/product/7656_643a9aed3a232.jpeg",
        "https://storage.googleapis.com/shopstore-upload/7656/product/7656_643a9aee8d5f4.jpeg",
        "https://storage.googleapis.com/shopstore-upload/7656/product/7656_643a9ae8ebfd9.jpeg",
      ],
      p_describtion: `以靈活舒適做為出發點設計
         由500D尼龍材料製成，具有極佳耐磨性，服貼舒適的角度設計，使其既舒適又靈活，讓穿戴時彷彿與自身融為一體。
          Tactec戰術背心內部為考量使用舒適度，正反面皆有透氣網格襯墊，在雙肩更是特別加厚達到有效減壓效果。`,
    },
    {
      p_id: "005",
      p_name: "AK-47S ",
      p_brand: "Kalashnikov",
      p_kind: "長槍短槍",
      p_son_kind: "突擊步槍",
      p_price: 125000,
      p_stock: 3,
      p_fornt: "",
      p_color: "",
      // p_pic:
      //   "https://upload.wikimedia.org/wikipedia/commons/6/65/AK-47_type_II_noBG.png",
      p_pic: "https://cdn.britannica.com/70/123170-050-D7AAF458/AK-47.jpg",
      p_new: "2024/9/07",
      p_other_pics: [
        "https://cdn.britannica.com/70/123170-050-D7AAF458/AK-47.jpg",
        "https://cdn11.bigcommerce.com/s-wkf3yob290/images/stencil/1280x1280/products/1211/14494/NEDI_AK47_1__66854.1674565080.png?c=2",
        "https://www.jbmilitaryantiques.com.au/wp-content/uploads/2018/02/H20235-L280619616_original-scaled.jpg",
      ],
      p_describtion:
        "AK發射7.62×39公釐中間型威力槍彈，由容量為30發子彈的弧形彈匣供彈，其保險／射擊選擇桿的設計則參考自美國雷明頓8型半自動步槍，設置在機匣右側，可以選擇半自動或者全自動的發射方式，槍機拉柄位於機匣右側，為槍機座的一部份。AK的槍機動作可靠，即使在連續射擊時有灰塵等異物進入槍內，它的機械結構仍能保證繼續正常運作，並可以在沙漠、熱帶雨林、嚴寒等極度惡劣的環境下保持相當好的效能，而且它的結構簡單，易於分解、清潔和維修，操作簡便。",
    },
    {
      p_id: "006",
      p_name: "快速反應板機 V2",
      p_brand: "SALVIMAR",
      p_kind: "內部零件",
      p_son_kind: "板機",
      p_price: 9050,
      p_stock: 10,
      p_fornt: "",
      p_color: "",
      p_pic: "https://cf.shopee.tw/file/cdfc5b403ba2ef0320ab780618aa3473",
      p_new: "2024/9/10",
      p_other_pics: [
        "https://cf.shopee.tw/file/cdfc5b403ba2ef0320ab780618aa3473",
        "https://www.aawee.fi/storage/product_images/2/GeisseleSuper3GUNAR-15laukaisukoneisto_854014005052_2390c0d7e8ac_4.webp",
        "https://sonsoflibertygw.com/wp-content/uploads/2024/06/L2S-White-1.jpg",
      ],
      p_describtion:
        "MEC Pro Trigger可以輕鬆實現更緊密的扳機拉力。直板扳機設計提供了短拉幾何形狀。",
    },
    {
      p_id: "007",
      p_name: "RA-TECH MOE 戰術握把 V2",
      p_brand: "RA-TECH",
      p_kind: "外部配件",
      p_son_kind: "握把",
      p_price: 2300,
      p_stock: 10,
      p_fornt: "",
      p_color: "black,green",
      p_pic:
        "https://pts-steelshop.com.tw/cdn/shop/products/PT124450313-1.webp?v=1690344275&width=1000",
      p_new: "2024/9/08",
      p_other_pics: [
        "https://pts-steelshop.com.tw/cdn/shop/products/PT124450313-1.webp?v=1690344275&width=1000",
        "https://pts-steelshop.com.tw/cdn/shop/products/PT124450313.webp?v=1690344275&width=500",
      ],
      p_describtion:
        "PTS Enhanced Polymer M4 Grip - Compact (EPG-C) 是一款簡單但功能強大的 M4/M16 平台專用聚合物手槍握把。它具有人體工學設計的形狀和獨特的紋理，經過優化，即使在惡劣環境下也能提供強大且合適的握把力。此外，EPG-C 的握把角度比標準的 M4 握把更小，更適合現代卡賓槍戰鬥和近距離作戰姿勢。這種握把角度有助於減輕手腕的負擔，並有助於將手放在更接近扳機位置，以獲得更好的扳機控制。它能讓使用者在將槍托完全折疊或完全伸展的情況下同樣舒適地操作槍械。",
    },
    {
      p_id: "008",
      p_name: "5.11-TACTEC PLATE CARRIER 戰術背心 V2",
      p_brand: "5.11",
      p_kind: "人身裝備",
      p_son_kind: "背心",
      p_price: 8600,
      p_stock: 5,
      p_fornt: "",
      p_color: "",
      p_pic:
        "https://shopstore-image.shopstore.tw/7656/product/7656_643a9aea42e06.jpeg",
      p_new: "2024/9/01",
      p_other_pics: [
        "https://shopstore-image.shopstore.tw/7656/product/7656_643a9aea42e06.jpeg",
        "https://storage.googleapis.com/shopstore-upload/7656/product/7656_643a9aebc61be.jpeg",
        "https://storage.googleapis.com/shopstore-upload/7656/product/7656_643a9aed3a232.jpeg",
        "https://storage.googleapis.com/shopstore-upload/7656/product/7656_643a9aee8d5f4.jpeg",
        "https://storage.googleapis.com/shopstore-upload/7656/product/7656_643a9ae8ebfd9.jpeg",
      ],
      p_describtion: `以靈活舒適做為出發點設計
         由500D尼龍材料製成，具有極佳耐磨性，服貼舒適的角度設計，使其既舒適又靈活，讓穿戴時彷彿與自身融為一體。
          Tactec戰術背心內部為考量使用舒適度，正反面皆有透氣網格襯墊，在雙肩更是特別加厚達到有效減壓效果。`,
    },
  ]);

  //購物車內的商品
  //all_ShoppingCart_products 內的基礎變數: 型別 => { product: object, quantity: int }
  const all_ShoppingCart_products = shallowRef([]);

  //增加商品至購物車
  const add_products = (product) => {
    set_products(product);
    //all_ShoppingCart_products.value.push(product);
    triggerRef(all_ShoppingCart_products);
  };

  //判斷要加入的商品是否有在購物車內
  //True : 改數量就好
  //False : 加入一筆全新的商品資料
  const set_products = (join_product) => {
    const find_product = all_ShoppingCart_products.value.find(
      (product_in_cart) => product_in_cart.product.p_id === join_product.p_id
    );
    if (find_product === undefined) {
      all_ShoppingCart_products.value.push({
        product: join_product,
        quantity: 1,
      });
    } else {
      const index = all_ShoppingCart_products.value.findIndex(
        (item) => item.product.p_id === join_product.p_id
      );
      //限制增加最大數量 : 10
      if (all_ShoppingCart_products.value[index].quantity < 10) {
        all_ShoppingCart_products.value[index].quantity += 1;
      }
    }
  };

  //   // 從資料庫撈資料
  //   const get_kindName_fromDB = async () => {
  //     return await axios.get("api/get_kind_name");
  //   };

  //   const get_son_kindName_fromDB = async (kinds) => {
  //     const son_kind_array = ref([]);

  //     const promises = kinds.map(async (kind) => {
  //       const data = await axios.post("api/get_son_kind_name", { p_kind: kind });
  //       return data.data; // 返回每個請求的結果
  //     });

  //     // 等待所有請求完成後，再將結果放入 son_kind_array
  //     son_kind_array.value = await Promise.all(promises);
  //     return son_kind_array;
  //   };

  return {
    all_ShoppingCart_products,
    add_products,
    // get_kindName_fromDB,
    // get_son_kindName_fromDB,
    guns,
    parts,
    components,
    equipments,
    airsoft_datas,
    real_datas,
  };
});
