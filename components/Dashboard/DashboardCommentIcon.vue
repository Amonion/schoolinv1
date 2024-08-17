<template>
  <div @click="toggleInput" class="dash-comment-section sticky">
    <div class="dash-make-comment">
      <img
        src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65adc6fda9335d1c7329dea6_feather-icon%201%20(1).svg"
        loading="lazy"
        alt=""
        class="dash-make-commenticon"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  methods: {
    toggleInput() {
      const payload = {
        type: this.type,
        id: this.id,
      };
      this.$store.commit("dashboard/toggleInput", payload);
    },
  },
};
</script>

<style></style>
