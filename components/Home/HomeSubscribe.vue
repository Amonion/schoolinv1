<template>
  <div class="subscribe-form w-form">
    <div>
      <label for="name" class="subscribe-label"
        >Subscribe for Newsletters and Job Infos</label
      >
      <div class="subscribe-older">
        <input
          class="subscribe-input w-input"
          maxlength="256"
          v-model="email"
          placeholder="Enter Your Email"
        />
        <div v-if="onRequest" class="ome-btn w-button">
          <img
            src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/65a8bd35f885fb184f5da056_loader-line-icon%201.svg"
            loading="lazy"
            alt=""
            class="btn-icon spinning-icon spinner"
          />
          <span>Processing</span>
        </div>

        <input
          v-else
          type="submit"
          class="ome-btn w-button"
          value="Subscribe"
          @click="subscribe"
        />
      </div>
      <div
        v-if="showResponse"
        class="response-text"
        :class="{ error: isError }"
      >
        {{ response }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      onRequest: false,

      isError: false,
      response: "",
      showResponse: false,
    };
  },

  methods: {
    checkErrorInputs(input, data) {
      if (input == "email") {
        if (data == "" || !data || !/^\S+@\S+\.\S+$/.test(data)) {
          this.isError = true;
          this.callResponse("Please enter a valid email", true);
          return true;
        } else {
          this.isError = false;
          return false;
        }
      }
    },

    callResponse(msg, state) {
      this.response = msg;
      this.isError = state;
      this.showResponse = true;
      this.onRequest = false;
      setTimeout(() => {
        this.showResponse = false;
      }, 6000);
    },

    clearInput() {
      this.email = "";
    },

    setArray() {
      this.checkArray = [{ name: "email", data: this.email }];
    },

    async subscribe() {
      this.setArray();
      for (let i = 0; i < this.checkArray.length; i++) {
        const el = this.checkArray[i];
        const result = this.checkErrorInputs(el.name, el.data);
        if (result) {
          break;
        }
      }

      if (this.isError) {
        return;
      }

      this.onRequest = true;
      const form = {
        email: this.email,
        time: new Date().getTime(),
      };
      const payload = {
        form,
        url: "/emails/subscribe",
      };
      const result = await this.$store.dispatch("makePOST", payload);
      if (!result.response) {
        this.callResponse(result.data.message, false);
        this.clearInput();
      } else {
        this.callResponse(result.response.data.message, true);
      }
    },
  },
};
</script>

<style></style>
