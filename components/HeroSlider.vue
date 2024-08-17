<template>
  <section id="ero-slide" class="home-slide">
    <div
      data-delay="5000"
      data-animation="fade"
      class="home-slider w-slider"
      data-autoplay="true"
      data-easing="ease-out"
      data-hide-arrows="false"
      data-disable-swipe="false"
      data-autoplay-limit="500"
      data-nav-spacing="3"
      data-duration="1000"
      data-infinite="true"
    >
      <div class="w-slider-mask">
        <div class="home-swap w-slide">
          <div class="contain">
            <div class="home-slide-content">
              <div class="home-text-texter">
                <div class="home-sub-text">WELCOME TO AGRITURE FARM</div>
                <img
                  src="https://assets-global.website-files.com/656a90c4e57ba7b7685c4581/656ae7bad54edc5c99b6cd93_banner-1-shape-1.png"
                  loading="lazy"
                  alt=""
                  class="top-sign"
                />
              </div>
              <div class="home-head-header">
                <h1 class="home-head">Agriculture<br />&amp; Eco Farming</h1>
              </div>
              <div class="home-text-texter">
                <div class="home-sub-text">
                  <strong class="bold-text-4"
                    >to cause something new, or many new things, to grow or
                    start suddenly</strong
                  >
                  The new economic freedom has spawned
                </div>
              </div>
              <div class="home-butt">
                <h1 class="home-butt-head">Discover More</h1>
              </div>
            </div>
          </div>
        </div>
        <div class="home-swap2 w-slide">
          <div class="contain">
            <div class="home-slide-content">
              <div class="home-text-texter">
                <div class="home-sub-text">WELCOME TO AGRITURE FARM</div>
              </div>
              <img
                src="https://assets-global.website-files.com/656a90c4e57ba7b7685c4581/656ae7bad54edc5c99b6cd93_banner-1-shape-1.png"
                loading="lazy"
                alt=""
                class="top-sign"
              />
              <div class="home-head-header">
                <h1 class="home-head">Agriculture<br />&amp; Eco Farming</h1>
              </div>
              <div class="home-text-texter">
                <div class="home-sub-text">
                  <strong
                    >to cause something new, or many new things, to grow or
                    start suddenly</strong
                  >
                  The new economic freedom has spawned
                </div>
              </div>
              <div class="home-butt">
                <h1 class="home-butt-head">Discover More</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="left-arrow w-slider-arrow-left">
        <div class="icon w-icon-slider-left"></div>
      </div>
      <div class="right-arrow w-slider-arrow-right">
        <div class="icon-2 w-icon-slider-right"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    loadScript() {
      if (!process.server) {
        let el1 = document.getElementById("script");

        if (el1 == null) {
          const script = document.createElement("script");

          script.type = "text/javascript";

          script.src = "/script/home.js";

          script.id = "script";
          const app = document.querySelector("#ero-slide");
          if (app) {
            app.appendChild(script);
          } else {
            console.error("Could not find app node to append script element");
          }
        }
      }
    },
  },

  mounted() {
    this.loadScript();
  },
};
</script>

<style></style>
