<script setup>
//import { RouterLink, RouterView } from "vue-router";

const guns = [
  {
    id: "A0001",
    type: "PS",
    name: "Glock 17",
    price: 1500,
    img: "https://cdn.britannica.com/96/176196-050-EFC5E6A6/Glock-pistol.jpg",
  },
  {
    id: "A0002",
    type: "RF",
    name: "AR-15",
    price: 5500,
    img: "https://machinegunamericaorlando.com/wp-content/uploads/2023/05/ks1.jpg",
  },
  {
    id: "A0003",
    type: "ARF",
    name: "AK-47",
    price: 4000,
    img: "https://upload.wikimedia.org/wikipedia/commons/2/20/Ak74l.png",
  },
  {
    id: "A0004",
    type: "SNP",
    name: "M40",
    price: 8000,
    img: "https://www.kui.com.tw/data/product/6027_2.jpeg",
  },
  {
    id: "A0005",
    type: "SMG",
    name: "Kriss-Vector",
    price: 3500,
    img: "https://cdn11.bigcommerce.com/s-nf2wyptn54/images/stencil/1280x1280/products/2653/4002/kv_smg_6_5in_30rd_A__95380.1708453344.jpg?c=2",
  },
  {
    id: "A000",
    type: "SG",
    name: "Shotgun",
    price: 3300,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmqoHJDdhLipxtIkxHdAPPJDhxsggW56bpcg&s",
  },
];
</script>

<template>
  <div class="layout">
    <div>this is a test component</div>
    <div class="item-layout">
      <div v-for="gun in guns" class="item-box">
        <div class="inner-item-box">
          <router-link :to="'/' + gun.id" class="link">
            <img :src="gun.img" alt="product-img" />
          </router-link>
          <div class="description">
            <div>type : {{ gun.type }}</div>
            <div>name : {{ gun.name }}</div>
            <div>price : {{ gun.price }}</div>
          </div>
        </div>
      </div>
      <!-- <router-link v-for="number in numbers" :to="'/' + number">
          <div class="box"></div>
        </router-link> -->
    </div>
  </div>
</template>

<style scoped>
img {
  width: 100%; /* 讓圖片寬度佔滿容器 */
  height: 100%; /* 讓圖片高度佔滿容器 */
  object-fit: contain; /* 保持圖片比例，並且裁剪部分內容以填滿容器 */
}
.out-box {
  width: 100%;
  height: 100%;
}

.inner-box {
  width: calc(100-10px);
  height: calc(100-10px);
}

.item-layout {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
  gap: 10px;
}

.item-box {
  width: 150px;
  height: 200px;
  border: 1px solid black;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.inner-item-box {
  width: calc(100% - 10px);
  height: calc(100% - 10px);
}

.link {
  padding: 0;
  margin: 0;
  display: block;
  background-color: transparent;
  width: 100%;
  height: 50%;
}

.description {
  width: 100%;
  height: 50%;
}

.layout {
  min-height: 100vh;
  align-items: center;
  margin: 10px;
}
</style>
