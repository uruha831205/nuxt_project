<script setup>
import { ref, watch } from "vue";

const Props = defineProps(["titleItem", "selectItems"]);

const checkedItems = defineModel();
const selectAll = ref(false);
const dropdownState = ref(false);
const select_items_CSS = ref(null);

const toggleDropdown = () => {
  dropdownState.value = !dropdownState.value;
};

watch(dropdownState, () => {
  if (dropdownState.value) {
    select_items_CSS.value.style.maxHeight = `${select_items_CSS.value.scrollHeight}px`;
  } else {
    select_items_CSS.value.style.maxHeight = 0;
  }
});

watch(selectAll, () => {
  if (selectAll.value) {
    checkedItems.value = Props.selectItems.value.map((item) => item.name);
    dropdownState.value = selectAll.value;
  } else if (
    !(
      checkedItems.value.length > 0 &&
      checkedItems.value.length < Props.selectItems.value.length
    )
  ) {
    checkedItems.value = [];
  }
});

watch(checkedItems, () => {
  if (checkedItems.value.length == Props.selectItems.value.length) {
    selectAll.value = true;
  } else if (checkedItems.value.length < Props.selectItems.value.length) {
    selectAll.value = false;
    if (checkedItems.value.length == 0) {
      dropdownState.value = false;
    }
  }
});
</script>
<template>
  <div class="select-name" @click="toggleDropdown()">
    <div>
      <input
        class="me-1"
        style="cursor: pointer"
        type="checkbox"
        v-model="selectAll"
      />
      <label style="cursor: pointer">{{ Props.titleItem }}</label>
    </div>
    <div class="select-bar-icon" :class="{ show: dropdownState }">
      <!-- <i v-if="dropdownState" class="bi bi-caret-up-fill select-bar-icon"></i> -->
      <i class="bi bi-caret-down-fill"></i>
    </div>
  </div>
  <ul ref="select_items_CSS" class="select-items">
    <li v-for="item in Props.selectItems.value">
      <input
        class="me-1"
        type="checkbox"
        :id="item.name"
        :value="item.name"
        v-model="checkedItems"
      />
      <label :for="item.name">{{ item.name }}</label>
    </li>
  </ul>
</template>
<style>
.select-name {
  padding: 0 1rem;
  margin-bottom: 0.2rem;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  justify-content: space-between;
  user-select: none;
}

.select-items {
  max-height: 0px;
  transition: 0.2s ease;
  transform-origin: top;
  overflow: hidden;
  list-style-type: none;
  margin: 0 5px;
}

.select-bar-icon {
  transition: 0.5s;
  transform: rotate(0deg);
}

.select-bar-icon.show {
  transform: rotate(180deg);
}
</style>
