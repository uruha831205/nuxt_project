export default {
  routes: (_routes) => [
    {
      path: "/",
      name: "root",
      component: () => import("../views/GunLandingPage.vue"),
    },
    {
      path: "/:message",
      name: "main",
      component: () => import("../views/MainProductsPage.vue"),
      beforeEnter: (to, from, next) => {
        const validMessages = ["airsoft", "real"];
        if (validMessages.includes(to.params.message)) {
          next();
        } else {
          next({ name: "404NotFound" });
        }
      },
      children: [
        {
          path: "/:message/",
          name: "default",
          component: () => import("../views/productpages/DefaultPage.vue"),
        },
        {
          path: "/:message/member",
          name: "member",
          component: () => import("../views/MemberPage.vue"),
        },
        {
          path: "/:message/insertdata",
          name: "insertdata",
          component: () => import("../views/InsertDataPage.vue"),
        },
        {
          path: "/:message/showDataPage",
          name: "showDataPage",
          component: () => import("../views/ShowDataPage.vue"),
        },
        {
          // path: "/:message/:product_id(A\\d+|R\\d+)",
          path: "/:message/:product_id",
          name: "product_page",
          component: () => import("../views/productpages/Product.vue"),
          // beforeEnter: (to, from, next) => {
          //   if (
          //     //若在生存遊戲頁面搜尋真實槍枝
          //     !(
          //       (to.params.message == "airsoft") &
          //       to.params.product_id.startsWith("R")
          //     ) &
          //     //若在真實槍枝頁面搜尋生存遊戲
          //     !(
          //       (to.params.message == "real") &
          //       to.params.product_id.startsWith("A")
          //     )
          //   ) {
          //     next();
          //   } else {
          //     next({ name: "404NotFound" });
          //   }
          // },
        },
        {
          path: "/:message/product",
          name: "search_product",
          component: () => import("../views/productpages/ShowProductPage.vue"),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "404NotFound",
      component: () => import("../views/404.vue"),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // 如果有保存的滾動位置，則恢復到之前保存的位置
      return savedPosition;
    } else {
      // 滾動到頁面頂部
      return { top: 0 };
    }
  },
};
