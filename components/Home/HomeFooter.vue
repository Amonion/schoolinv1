<template>
  <div>
    <div id="footer" class="footer">
      <div class="ome-container">
        <div class="footer-flex">
          <div class="footer-left">
            <NuxtLink to="/" class="footer-brand w-inline-block"
              ><img
                src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658cde154205f28754dc5034_scoolin-loo.png"
                loading="lazy"
                width="130"
                alt=""
                class="nav-loo"
            /></NuxtLink>
            <div class="ot-blo-content">
              Welcome to Schoolin Prime, where education meets convenience.
              We're dedicated to revolutionizing the student experience by
              providing a seamless platform for accessing educational content
              and managing finances from anywhere, anytime.
            </div>
            <div class="footer-socials">
              <NuxtLink to="/" class="footer-link-icon w-inline-block"
                ><img
                  src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658b1b2f6d85e331b3ebcceb_twitter-x%201.svg"
                  loading="lazy"
                  alt=""
                  class="footer-icon"
              /></NuxtLink>
              <NuxtLink to="/" class="footer-link-icon w-inline-block"
                ><img
                  src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658b1b2f2688f23f725951b3_facebook%201.svg"
                  loading="lazy"
                  alt=""
                  class="footer-icon"
              /></NuxtLink>
              <NuxtLink to="/" class="footer-link-icon w-inline-block"
                ><img
                  src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658b1b2f4260ea19dd11d33d_instagram%201.svg"
                  loading="lazy"
                  alt=""
                  class="footer-icon"
              /></NuxtLink>
              <NuxtLink to="/" class="footer-link-icon w-inline-block"
                ><img
                  src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658b1b2f8b1487c1da429eaa_youtube%201.svg"
                  loading="lazy"
                  alt=""
                  class="footer-icon"
              /></NuxtLink>
            </div>
          </div>
          <div class="w-layout-grid footer-rit">
            <div
              id="w-node-_0d7b883e-aa39-e460-99c8-75668922fb83-8922fb72"
              class="footer-roup-links"
            >
              <NuxtLink to="/" class="section-eadin _2 color"
                >About Scoolin</NuxtLink
              ><NuxtLink to="/" class="footer-links">Home</NuxtLink
              ><NuxtLink to="/services" class="footer-links">Services</NuxtLink
              ><NuxtLink to="/faq" class="footer-links">Faq</NuxtLink
              ><NuxtLink to="/contact" class="footer-links">Contacts</NuxtLink
              ><NuxtLink to="/terms" class="footer-links"
                >Privacy Policy</NuxtLink
              >
            </div>
            <div
              id="w-node-_0d7b883e-aa39-e460-99c8-75668922fb90-8922fb72"
              class="footer-roup-links"
            >
              <NuxtLink to="/" class="section-eadin _2 color">Academic</NuxtLink
              ><NuxtLink to="/dashboard" class="footer-links"
                >Tutorials</NuxtLink
              ><NuxtLink to="/dashboard" class="footer-links"
                >Past Questions</NuxtLink
              ><NuxtLink to="/dashboard" class="footer-links"
                >Competitions</NuxtLink
              ><NuxtLink to="/dashboard" class="footer-links"
                >Projects</NuxtLink
              >
            </div>
            <div
              id="w-node-_0d7b883e-aa39-e460-99c8-75668922fb9b-8922fb72"
              class="footer-roup-links"
            >
              <NuxtLink to="/" class="section-eadin _2 color"
                >Utilities</NuxtLink
              ><NuxtLink to="/dashboard" class="footer-links">Story ub</NuxtLink
              ><NuxtLink to="/dashboard" class="footer-links"
                >CV enerator</NuxtLink
              ><NuxtLink to="/dashboard" class="footer-links"
                >CPA Calculator</NuxtLink
              ><NuxtLink to="/dashboard" class="footer-links">Jobs</NuxtLink
              ><NuxtLink to="/dashboard" class="footer-links"
                >Scolarsips</NuxtLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footex text-block-3">
      <div class="text-block-3">
        Copyright ⓒ All Rights Reserved. {{ company.companyName }}
        {{ new Date().getFullYear() }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    company() {
      return this.$store.state.company;
    },
  },
};
</script>

<style></style>
