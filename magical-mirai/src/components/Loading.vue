<template>
  <div class="loading-background">
    <span class="loading-text">loading...</span>
  </div>
</template>

<style lang="scss" scoped>
.loading-background {
  position: absolute;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.6;

  .loading-text {
    font-size: 50px;
    color: $white-color;
  }
}
</style>
