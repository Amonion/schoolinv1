<template>
  <div class="dashprime-main-display">
    <div class="dash-paytitle confirm">Settings</div>
    <div class="dash-profile-nav">
      <div
        class="dash-profile-navitems"
        :class="{ active: modal == 'Bio' }"
        @click="setModal('Bio')"
      >
        Bio
      </div>
      <div
        class="dash-profile-navitems"
        :class="{ active: modal == 'School' }"
        @click="setModal('School')"
      >
        School
      </div>
      <div
        class="dash-profile-navitems"
        :class="{ active: modal == 'Contact' }"
        @click="setModal('Contact')"
      >
        Contact
      </div>

      <div
        class="dash-profile-navitems"
        :class="{ active: modal == 'Result' }"
        @click="setModal('Result')"
      >
        Result
      </div>
      <div
        class="dash-profile-navitems"
        :class="{ active: modal == 'Media' }"
        @click="setModal('Media')"
      >
        Visibility
      </div>
    </div>

    <dashboard-bio-settings v-if="modal == 'Bio'" />
    <dashboard-school-settings v-if="modal == 'School'" />
    <dashboard-contact-settings v-if="modal == 'Contact'" />
    <dashboard-result-settings v-if="modal == 'Result'" />
    <dashboard-media-settings v-if="modal == 'Media'" />

    <div class="dash-profile-location self">
      <div class="w-layout-grid">
        <div id="w-node-eb5c6656-00fd-f2ab-ee83-12f0665f8861-427cc6e7">
          <div
            id="w-node-eb5c6656-00fd-f2ab-ee83-12f0665f8862-427cc6e7"
            class="dash-profile-label"
          >
            First Name
          </div>
          <input
            class="dash-profile-input w-input"
            maxlength="256"
            name="field-5"
            data-name="Field 5"
            placeholder="Example Text"
            type="text"
            id="field-5"
            required=""
          />
        </div>
        <div id="w-node-eb5c6656-00fd-f2ab-ee83-12f0665f8865-427cc6e7">
          <div
            id="w-node-eb5c6656-00fd-f2ab-ee83-12f0665f8866-427cc6e7"
            class="dash-profile-label"
          >
            Middle Name
          </div>
          <input
            class="dash-profile-input w-input"
            maxlength="256"
            name="field-5"
            data-name="Field 5"
            placeholder="Example Text"
            type="text"
            id="field-5"
            required=""
          />
        </div>
        <div id="w-node-eb5c6656-00fd-f2ab-ee83-12f0665f8869-427cc6e7">
          <div
            id="w-node-eb5c6656-00fd-f2ab-ee83-12f0665f886a-427cc6e7"
            class="dash-profile-label"
          >
            Last Name
          </div>
          <input
            class="dash-profile-input w-input"
            maxlength="256"
            name="field-5"
            data-name="Field 5"
            placeholder="Example Text"
            type="text"
            id="field-5"
            required=""
          />
        </div>
        <div id="w-node-eb5c6656-00fd-f2ab-ee83-12f0665f886d-427cc6e7">
          <div
            id="w-node-eb5c6656-00fd-f2ab-ee83-12f0665f886e-427cc6e7"
            class="dash-profile-label"
          >
            Username
          </div>
          <input
            class="dash-profile-input w-input"
            maxlength="256"
            name="field-5"
            data-name="Field 5"
            placeholder="Example Text"
            type="text"
            id="field-5"
            required=""
          />
        </div>
        <div id="w-node-eb5c6656-00fd-f2ab-ee83-12f0665f8871-427cc6e7">
          <div
            id="w-node-eb5c6656-00fd-f2ab-ee83-12f0665f8872-427cc6e7"
            class="dash-profile-label"
          >
            Display Name
          </div>
          <input
            class="dash-profile-input w-input"
            maxlength="256"
            name="field-5"
            data-name="Field 5"
            placeholder="Example Text"
            type="text"
            id="field-5"
            required=""
          />
        </div>
        <div id="w-node-eb5c6656-00fd-f2ab-ee83-12f0665f8875-427cc6e7">
          <div
            id="w-node-eb5c6656-00fd-f2ab-ee83-12f0665f8876-427cc6e7"
            class="dash-profile-label"
          >
            DOB
          </div>
          <input
            class="dash-profile-input w-input"
            maxlength="256"
            name="field-5"
            data-name="Field 5"
            placeholder="Example Text"
            type="text"
            id="field-5"
            required=""
          />
        </div>
      </div>
      <textarea
        placeholder="Describe yourself"
        maxlength="5000"
        id="field-6"
        name="field-6"
        data-name="Field 6"
        class="dash-profile-input area w-input"
      ></textarea>
    </div>
  </div>
</template>

<script>
import DashboardBioSettings from "../../components/Dashboard/DashboardBioSettings.vue";
import DashboardContactSettings from "../../components/Dashboard/DashboardContactSettings.vue";
import DashboardMediaSettings from "../../components/Dashboard/DashboardMediaSettings.vue";
import DashboardSchoolSettings from "../../components/Dashboard/DashboardSchoolSettings.vue";
export default {
  components: {
    DashboardBioSettings,
    DashboardContactSettings,
    DashboardSchoolSettings,
    DashboardMediaSettings,
  },
  layout: "dashboard",
  data() {
    return {
      modal: "Bio",
    };
  },
  methods: {
    setModal(modal) {
      this.modal = modal;
    },
  },
};
</script>

<style></style>
