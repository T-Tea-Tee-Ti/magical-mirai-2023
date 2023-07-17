<script setup lang="ts">
import SvgIcon from "@jamescoyle/vue-icon";
import {
  mdiChevronRightCircleOutline,
  mdiChevronLeftCircleOutline,
} from "@mdi/js";

interface Emits {
  (e: "setMaterial", v: string): void;
  (e: "backState", v?: string): void;
  (e: "hideSelect", v?: string): void;
}

const emit = defineEmits<Emits>();

// アイコンを設定
const chevronRight = mdiChevronRightCircleOutline;
const chevronLeft = mdiChevronLeftCircleOutline;

// 写真たての素材
const pictureFrameMaterials = [
  "shell-1",
  "shell-2",
  "shell-3",
  "shell-4",
  "stone-1",
  "stone-2",
  "stone-3",
  "stone-4",
  "stone-5",
  "coral-1",
  "coral-2",
  "anchor",
  "sea-ball",
  "star-fish-1",
  "star-fish-2",
  "swim-ring",
];

// 写真たての素材のパス
const pictureFrameMaterialPath = ref<string>(
  "images/picture-frame-materials/" + pictureFrameMaterials[0] + ".png"
);

// 選択されている素材
const selectedMaterial = ref<number>(0);

const nextMaterial = () => {
  selectedMaterial.value =
    selectedMaterial.value === pictureFrameMaterials.length - 1
      ? (selectedMaterial.value = 0)
      : selectedMaterial.value + 1;
  pictureFrameMaterialPath.value =
    "images/picture-frame-materials/" +
    pictureFrameMaterials[selectedMaterial.value] +
    ".png";
};

const backMaterial = () => {
  selectedMaterial.value =
    selectedMaterial.value === 0
      ? (selectedMaterial.value = pictureFrameMaterials.length - 1)
      : selectedMaterial.value - 1;
  pictureFrameMaterialPath.value =
    "images/picture-frame-materials/" +
    pictureFrameMaterials[selectedMaterial.value] +
    ".png";
};

// 素材をセットする
const setMaterial = () => {
  emit("setMaterial", pictureFrameMaterialPath.value);
};
// 1つ前の状態に戻す
const backState = () => {
  emit("backState");
};
// 素材選択欄を隠す
const hideSelect = () => {
  emit("hideSelect");
};
</script>

<template>
  <div class="select-area">
    <svg-icon
      class="chevron-icon"
      type="mdi"
      :path="chevronLeft"
      size="60"
      @click="backMaterial"
    />
    <img class="wood-frame" src="images/sea-components/wood-frame.png" />
    <img class="material" :src="pictureFrameMaterialPath" />
    <svg-icon
      class="chevron-icon"
      type="mdi"
      :path="chevronRight"
      size="60"
      @click="nextMaterial"
    />
  </div>
  <div class="button-area">
    <div class="button" @click="setMaterial">
      <span class="button-text">追加する</span>
    </div>
    <div class="button" @click="backState">
      <span class="button-text">1つ前に戻す</span>
    </div>
    <div class="button" @click="hideSelect">
      <span class="button-text">閉じる</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.select-area {
  display: flex;
  align-items: center;
  justify-content: center;

  .material {
    position: absolute;
    right: 0;
    left: 0;
    width: 100px;
    max-height: 100px;
    margin: 0 auto;
  }

  .wood-frame {
    width: 200px;
  }

  .chevron-icon {
    color: $brown-color;
    cursor: pointer;
  }
}

.button-area {
  display: flex;
  gap: 8px;
  max-width: 500px;
  margin: 0 auto;

  .button {
    width: 200px;
    height: 40px;
    margin: 0 auto;
    margin-top: 8px;
    text-align: center;
    cursor: pointer;
    background-color: $brown-color;
    border-radius: 6px;

    .button-text {
      font-size: 24px;
      color: $white-color;
    }
  }
}
</style>
