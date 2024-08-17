<template>
  <div id="chat"></div>
</template>

<script>
export default {
  methods: {
    loadScript() {
      if (!process.server) {
        let el = document.getElementById("script");

        if (el != undefined) {
          document.body.removeChild(el);
        }

        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "/script/smartSupport.js";
        script.async = true;
        script.id = "script";
        const app = document.querySelector("#chat");
        if (app) {
          app.appendChild(script);
        } else {
          console.error("Could not find app node to append script element");
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
