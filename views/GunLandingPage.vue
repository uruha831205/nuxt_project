<script setup></script>

<template>
  <main class="landingPage-layout">
    <router-link class="box airsoft-gun" to="/airsoft">
      <div class="pic airsoft-pic">
        <div class="description">
          <div class="title">生存遊戲</div>
          <div class="context">有價值的假日黃金戰士</div>
        </div>
      </div>
    </router-link>

    <!-- <router-link class="box any" to="/any" @mouseenter="setBoxZindex('any')">
      <div class="pic any-pic">
        <div class="description">
          <div class="title">隨意逛逛</div>
          <div class="context">沒事，我自己逛逛就好</div>
        </div>
      </div>
    </router-link> -->

    <router-link class="box real-gun" to="/real">
      <div class="pic real-pic">
        <div class="description">
          <div class="title">真實槍枝</div>
          <div class="context">生命財產誠可貴，保重</div>
        </div>
      </div>
    </router-link>
  </main>
</template>

<style scoped>
.landingPage-layout {
  display: flex;
  height: 100vh;
  position: relative;
  overflow: hidden;
  gap: 25px;
  padding: 15px;
  background-color: gray;
}

@media screen and (max-width: 900px) {
  .landingPage-layout {
    flex-direction: column;
    font-size: 10px;
  }
}

.landingPage-layout:hover .pic:not(:hover) {
  filter: blur(2px);
  opacity: 0.2;
}

.box {
  flex: 1;
  height: 100%;
  transition: all 0.3s ease;
  background-color: black;
  transition: 0.45s;
  border-radius: 30px;
  overflow: hidden;
}

.pic {
  /*filter: drop-shadow(0 0 50px rgba(0, 0, 0, 0.5));*/
  box-shadow: inset 0px 0px 100px black;
  position: relative;
  transition: 0.45s;
}

.box:hover {
  box-shadow: inset 0 0 30px rgba(255, 255, 255, 0.5),
    0 0 30px rgba(255, 255, 255, 0.7);
  flex: 2;
}

.box:hover .pic {
  scale: 1.1;
}

.description {
  position: absolute;
  bottom: 10%;
  text-shadow: 2px 2px 10px black;
  font-weight: bold;
  font-size: 4em;
  opacity: 0;
}

.airsoft-pic {
  width: 100%;
  height: 100%;
  background: url("@/assets/img/bb_bullet.jpg");
  background-size: cover;
}

.any-pic {
  width: 100%;
  height: 100%;
  background: url("@/assets/img/dog.png");
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: center;
}

.real-pic {
  width: 100%;
  height: 100%;
  background: url("@/assets/img/real_bullet.jpeg");
  background-position: right;
  background-size: cover;
  z-index: 1;
}

.airsoft-pic .description {
  text-align: left;
  color: yellow;
  left: 10%;
}

.any-pic .description {
  text-align: center;
  color: white;
}

.real-pic .description {
  text-align: right;
  color: red;
  right: 10%;
}

:is(.airsoft-gun:hover, .real-gun:hover, .any:hover) .description {
  transition: 0.5s;
  transition-delay: 100ms;
  opacity: 1;
}
</style>
