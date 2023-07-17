<template>
  <div class="waves-background" />
  <svg
    class="waves"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 24 150 28"
    preserveAspectRatio="none"
    shape-rendering="auto"
  >
    <defs>
      <path
        id="gentle-wave"
        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
      />
    </defs>
    <g class="parallax">
      <use
        xlink:href="#gentle-wave"
        x="48"
        y="3"
        fill="#ffffff"
        fill-opacity="0.5"
      />
      <use
        xlink:href="#gentle-wave"
        x="48"
        y="5"
        fill="#ffffff"
        fill-opacity="0.3"
      />
    </g>
  </svg>
</template>

<style lang="scss" scoped>
.waves {
  position: absolute;
  z-index: 10;
  width: 800px;
  height: 20%;
}

.waves-background {
  position: absolute;
  z-index: 5;
  width: 800px;
  height: 20%;
  background-color: $sea-color;
}

.parallax {
  height: 100%;
}

/* WaveAnimation */
.parallax > use {
  animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}

.parallax > use:nth-child(1) {
  animation-duration: 7s;
  animation-delay: -2s;
}

.parallax > use:nth-child(2) {
  animation-duration: 10s;
  animation-delay: -3s;
}

.parallax > use:nth-child(3) {
  animation-duration: 13s;
  animation-delay: -4s;
}

.parallax > use:nth-child(4) {
  animation-duration: 20s;
  animation-delay: -5s;
}

@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }

  100% {
    transform: translate3d(85px, 0, 0);
  }
}

/* Shrinking for mobile */
@media (width <= 768px) {
  .waves {
    height: 40px;
    min-height: 40px;
  }
}
</style>
