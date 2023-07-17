<script setup lang="ts">
import { IPlayerApp, ITextUnit, Player } from "textalive-app-api";
import SvgIcon from "@jamescoyle/vue-icon";
import {
  mdiPlayCircleOutline,
  mdiPauseCircleOutline,
  mdiStopCircleOutline,
} from "@mdi/js";

// ローディング
const isLoading = ref<boolean>(true);

// アイコンを設定
const playIcon = mdiPlayCircleOutline;
const pauseIcon = mdiPauseCircleOutline;
const stopIcon = mdiStopCircleOutline;

// 歌詞
const lyricText = ref<string>();

// ウミの生き物
const seaCreatures = [
  "clown-fish",
  "dolphin-A",
  "dolphin-B",
  "jellyfish",
  "octopus",
  "penguin",
  "polar-bear",
  "stingray",
];

// ウミの生き物の画像のパス
const seaCreaturePath = ref<string>("");

// ウミの生き物の向き
const seaCreatureDirection = ref<string>("");

// 写真たての素材
const materials = ref<string[]>([]);

// 写真たての素材選択欄表示フラグ
const isDisplaySelectMaterial = ref<boolean>(true);

// フレーズが変更されたタイミングでアニメーションを付与するため、変更を検知するフラグ
const isPhraseChange = ref<boolean>(true);

// アニメーションNo
const lyricAnimationNumber = ref<number>(1);

// 現在の状態（再生・停止）
const currentStatus = ref<string>("play");

// 停止ボタンが押されたかの判定
const isStop = ref<boolean>(false);

// TextAlive Player を初期化
const player = new Player({
  // トークンは https://developer.textalive.jp/profile で取得したものを使う
  app: { token: "D8R61uhhXo2p6NNJ" },
});

// 再生ボタンの機能
const play = () => {
  player.requestPlay();
};

// 一時停止ボタンの機能
const pause = () => {
  player.requestPause();
};

// 停止ボタン
const stop = () => {
  if (player) {
    player.requestStop();

    // 再生を停止したら画面表示をリセットする
    resetLyricText();
  }
  isStop.value = true;
};

// APIの準備ができたら呼ばれる
const onAppReady = (app: IPlayerApp) => {
  if (!app.songUrl) {
    // ネオンライトの海を往く / Ponchi♪ feat. 初音ミク
    player.createFromSongUrl("https://piapro.jp/t/fyxI/20230203003935", {
      video: {
        // 音楽地図訂正履歴: https://songle.jp/songs/2427951/history
        beatId: 4267373,
        chordId: 2405138,
        repetitiveSegmentId: 2475664,
        // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/piapro.jp%2Ft%2FfyxI%2F20230203003935
        lyricId: 56096,
        lyricDiffId: 9639,
      },
    });
  }
};

// 楽再生コントロールができるようになったら呼ばれる
const onTimerReady = () => {
  // isLoadingを解除
  isLoading.value = false;
  // フレーズ単位で歌詞を取得する
  let phrase = player.video.firstPhrase;
  while (phrase && phrase.next) {
    phrase.animate = animatePhrase;
    phrase = phrase.next;
  }
};

// 楽曲の再生が始まったら呼ばれる
const onPlay = () => {
  if (isStop.value) {
    resetLyricText();
    isStop.value = false;
  }
  currentStatus.value = "pause";
};

// 楽曲の再生が止まったら呼ばれる
const onPause = () => {
  currentStatus.value = "play";
};

// 歌詞をリセットする
const resetLyricText = () => {
  lyricText.value = "";
};

// フレーズ単位で表示歌詞を更新する
const animatePhrase = (now: number, unit: ITextUnit) => {
  // フレーズを更新
  if (unit.contains(now)) {
    if (lyricText.value !== unit.text) {
      // phraseChangeフラグをtrueに変更
      isPhraseChange.value = true;
      // フレーズを取得
      lyricText.value = unit.text;
      // 歌詞アニメーションをランダムに決定
      lyricAnimationNumber.value =
        unit.text === "揺らいだ感情" ? 5 : Math.floor(Math.random() * 4 + 1);
      // ウミの生物をランダムに決定
      seaCreatureDirection.value =
        lyricAnimationNumber.value < 3 || lyricAnimationNumber.value > 4
          ? "right"
          : "left";
      seaCreaturePath.value =
        "/images/sea-creatures/" +
        seaCreatures[Math.floor(Math.random() * seaCreatures.length)] +
        "-" +
        seaCreatureDirection.value +
        ".png";
    } else {
      isPhraseChange.value = false;
    }
  }
};

// 各イベントを格納
player.addListener({
  onAppReady,
  onTimerReady,
  onPlay,
  onPause,
});

// 選択された素材を追加する
const addMaterial = (materialPath: string) => {
  materials.value.push(materialPath);
};

// １つ前の状態に戻す（素材を１つ削除する）
const reduceMaterial = () => {
  if (materials.value.length > 0) {
    materials.value.pop();
  }
};
</script>

<template>
  <div class="whole-screen">
    <Loading v-if="isLoading" />
    <!-- 再生コントロール -->
    <div class="control">
      <svg-icon
        v-if="currentStatus === 'play'"
        class="play-icon"
        type="mdi"
        :path="playIcon"
        size="60"
        @click="play"
      />
      <svg-icon
        v-if="currentStatus === 'pause'"
        class="pause-icon"
        type="mdi"
        :path="pauseIcon"
        size="60"
        @click="pause"
      />
      <svg-icon
        class="stop-icon"
        type="mdi"
        :path="stopIcon"
        size="60"
        @click="stop"
      />
    </div>

    <!-- 写真たて -->
    <div class="picture-flame">
      <div
        v-for="(material, index) in materials"
        :key="index"
        v-drag
        class="picture-frame-material"
      >
        <img class="picture-frame-material-image" :src="material" />
      </div>

      <!-- 写真内 -->
      <div class="picture">
        <!-- 歌詞 / Lyrics text -->
        <div
          class="lyrics"
          :class="
            !isPhraseChange
              ? `change-phrase-animation-${lyricAnimationNumber}`
              : ''
          "
        >
          <div class="lyric-text">{{ lyricText }}</div>
          <div>
            <img class="sea-creature" :src="seaCreaturePath" />
          </div>
        </div>

        <!-- ミク&ボート -->
        <div class="wave-animation">
          <img class="miku" src="/images/miku.png" />
          <img class="wood-boat" src="/images/sea-components/wood-boat.png" />
        </div>

        <!-- 空 -->
        <div class="sky-area">
          <Sky />
        </div>

        <!-- 海 -->
        <div class="waves-area">
          <Waves />
        </div>
      </div>
    </div>

    <!-- 写真たて素材選択エリア -->
    <div class="select-material">
      <SelectMaterial
        v-if="isDisplaySelectMaterial"
        @set-material="addMaterial"
        @back-state="reduceMaterial"
        @hide-select="isDisplaySelectMaterial = false"
      />
      <div
        v-if="!isDisplaySelectMaterial"
        class="show-select-button"
        @click="isDisplaySelectMaterial = true"
      >
        <span class="show-select-button-text">飾りつける</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.whole-screen {
  height: 100%;
  min-height: 840px;
}

.picture-flame {
  position: relative;
  top: 60px;
  z-index: 200;
  width: 880px;
  min-height: 480px;
  margin: 0 auto;
  border: 40px solid $picture-frame-color;

  .picture-frame-material {
    position: absolute;
    z-index: 200;

    .picture-frame-material-image {
      width: 100px;
      max-height: 100px;
    }
  }

  .picture {
    position: relative;
    width: 800px;
    height: 480px;
    min-height: 480px;

    .miku {
      position: absolute;
      right: 100px;
      bottom: 98px;
      z-index: 20;
      width: 150px;
    }

    .wood-boat {
      position: absolute;
      right: 50px;
      bottom: -10px;
      z-index: 10;
      width: 250px;
    }

    .sky-area {
      height: 100%;
    }

    .waves-area {
      display: flex;
      align-items: flex-end;
    }
  }
}

.control {
  position: absolute;
  right: 0;
  z-index: 10;
  display: flex;
  gap: 8px;
  color: $sea-color;

  .play-icon,
  .pause-icon,
  .stop-icon,
  .info-icon {
    cursor: pointer;
  }
}

.select-material {
  margin-top: calc(60px + 12px);

  .show-select-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 40px;
    margin: 0 auto;
    margin-top: calc(72px + 48px);
    cursor: pointer;
    background-color: $brown-color;
    border-radius: 6px;

    .show-select-button-text {
      font-size: 24px;
      color: $white-color;
    }
  }
}

.lyrics {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  display: table;
  font-size: 24px;
  font-weight: bold;
  color: $white-color;
  text-align: center;
  user-select: none;
}

.change-phrase-animation-1 {
  animation: jump-lyric-1 3s;
}

.change-phrase-animation-2 {
  animation: jump-lyric-2 3s;
}

.change-phrase-animation-3 {
  animation: jump-lyric-3 3s;
}

.change-phrase-animation-4 {
  animation: jump-lyric-4 3s;
}

.change-phrase-animation-5 {
  animation: jump-lyric-1 1.5s;
}

.wave-animation {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 30;
  width: 250px;
  height: 300px;
  animation: wave 3s infinite;
}

.sea-creature {
  max-height: 50px;
}

@keyframes jump-lyric-1 {
  0% {
    transform: translate(0, -50px);
  }

  5% {
    transform: translate(21px, -96px);
  }

  10% {
    transform: translate(42px, -137px);
  }

  15% {
    transform: translate(61px, -167px);
  }

  20% {
    transform: translate(80px, -193px);
  }

  25% {
    transform: translate(97px, -213px);
  }

  30% {
    transform: translate(114px, -228px);
  }

  35% {
    transform: translate(129px, -238px);
  }

  40% {
    transform: translate(144px, -245px);
  }

  45% {
    transform: translate(157px, -248px);
  }

  50% {
    transform: translate(170px, -250px);
  }

  55% {
    transform: translate(183px, -248px);
  }

  60% {
    transform: translate(196px, -245px);
  }

  65% {
    transform: translate(211px, -238px);
  }

  70% {
    transform: translate(226px, -228px);
  }

  75% {
    transform: translate(243px, -213px);
  }

  80% {
    transform: translate(260px, -193px);
  }

  85% {
    transform: translate(279px, -167px);
  }

  90% {
    transform: translate(298px, -137px);
  }

  95% {
    transform: translate(319px, -96px);
  }

  100% {
    transform: translate(340px, -50px);
  }
}

@keyframes jump-lyric-2 {
  0% {
    transform: translate(150px, -50px);
  }

  5% {
    transform: translate(157px, -115px);
  }

  10% {
    transform: translate(163px, -163px);
  }

  15% {
    transform: translate(169px, -204px);
  }

  20% {
    transform: translate(175px, -237px);
  }

  25% {
    transform: translate(180px, -260px);
  }

  30% {
    transform: translate(185px, -277px);
  }

  35% {
    transform: translate(189px, -288px);
  }

  40% {
    transform: translate(193px, -295px);
  }

  45% {
    transform: translate(197px, -299px);
  }

  50% {
    transform: translate(200px, -300px);
  }

  55% {
    transform: translate(203px, -299px);
  }

  60% {
    transform: translate(207px, -295px);
  }

  65% {
    transform: translate(211px, -288px);
  }

  70% {
    transform: translate(215px, -277px);
  }

  75% {
    transform: translate(220px, -260px);
  }

  80% {
    transform: translate(225px, -237px);
  }

  85% {
    transform: translate(231px, -204px);
  }

  90% {
    transform: translate(237px, -163px);
  }

  95% {
    transform: translate(243px, -115px);
  }

  100% {
    transform: translate(250px, -50px);
  }
}

@keyframes jump-lyric-3 {
  0% {
    transform: translate(450px, 0);
  }

  5% {
    transform: translate(438px, -79px);
  }

  10% {
    transform: translate(425px, -153px);
  }

  15% {
    transform: translate(414px, -206px);
  }

  20% {
    transform: translate(403px, -251px);
  }

  25% {
    transform: translate(393px, -285px);
  }

  30% {
    transform: translate(383px, -311px);
  }

  35% {
    transform: translate(374px, -329px);
  }

  40% {
    transform: translate(365px, -342px);
  }

  45% {
    transform: translate(358px, -347px);
  }

  50% {
    transform: translate(350px, -350px);
  }

  55% {
    transform: translate(342px, -347px);
  }

  60% {
    transform: translate(335px, -342px);
  }

  65% {
    transform: translate(326px, -329px);
  }

  70% {
    transform: translate(317px, -311px);
  }

  75% {
    transform: translate(307px, -285px);
  }

  80% {
    transform: translate(297px, -251px);
  }

  85% {
    transform: translate(286px, -206px);
  }

  90% {
    transform: translate(275px, -153px);
  }

  95% {
    transform: translate(263px, -79px);
  }

  100% {
    transform: translate(250px, 0);
  }
}

@keyframes jump-lyric-4 {
  0% {
    transform: translate(250px, -50px);
  }

  5% {
    transform: translate(243px, -115px);
  }

  10% {
    transform: translate(237px, -163px);
  }

  15% {
    transform: translate(231px, -204px);
  }

  20% {
    transform: translate(225px, -237px);
  }

  25% {
    transform: translate(220px, -260px);
  }

  30% {
    transform: translate(215px, -277px);
  }

  35% {
    transform: translate(211px, -288px);
  }

  40% {
    transform: translate(207px, -295px);
  }

  45% {
    transform: translate(203px, -299px);
  }

  50% {
    transform: translate(200px, -300px);
  }

  55% {
    transform: translate(197px, -299px);
  }

  60% {
    transform: translate(193px, -295px);
  }

  65% {
    transform: translate(189px, -288px);
  }

  70% {
    transform: translate(185px, -277px);
  }

  75% {
    transform: translate(180px, -260px);
  }

  80% {
    transform: translate(175px, -237px);
  }

  85% {
    transform: translate(169px, -204px);
  }

  90% {
    transform: translate(163px, -163px);
  }

  95% {
    transform: translate(157px, -115px);
  }

  100% {
    transform: translate(150px, -50px);
  }
}

@keyframes wave {
  0% {
    transform: translateY(0) rotate(0deg);
  }

  5% {
    transform: translateY(-1px) rotate(1deg);
  }

  10% {
    transform: translateY(-2px) rotate(2deg);
  }

  15% {
    transform: translateY(-3px) rotate(3deg);
  }

  20% {
    transform: translateY(-4px) rotate(4deg);
  }

  25% {
    transform: translateY(-5px) rotate(5deg);
  }

  30% {
    transform: translateY(-6px) rotate(4deg);
  }

  35% {
    transform: translateY(-7px) rotate(3deg);
  }

  40% {
    transform: translateY(-8px) rotate(2deg);
  }

  45% {
    transform: translateY(-9px) rotate(1deg);
  }

  50% {
    transform: translateY(-10px) rotate(0deg);
  }

  55% {
    transform: translateY(-9px) rotate(-1deg);
  }

  60% {
    transform: translateY(-8px) rotate(-2deg);
  }

  65% {
    transform: translateY(-7px) rotate(-3deg);
  }

  70% {
    transform: translateY(-6px) rotate(-4deg);
  }

  75% {
    transform: translateY(-5px) rotate(-5deg);
  }

  80% {
    transform: translateY(-4px) rotate(-4deg);
  }

  85% {
    transform: translateY(-3px) rotate(-3deg);
  }

  90% {
    transform: translateY(-2px) rotate(-2deg);
  }

  95% {
    transform: translateY(-1px) rotate(-1deg);
  }

  100% {
    transform: translateY(0) rotate(0deg);
  }
}
</style>
