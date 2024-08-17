export const state = () => ({
  countries: [
    { country: "Afghanistan", flagUrl: "https://flagcdn.com/af.svg" },
    { country: "Albania", flagUrl: "https://flagcdn.com/al.svg" },
    { country: "Algeria", flagUrl: "https://flagcdn.com/dz.svg" },
    { country: "Argentina", flagUrl: "https://flagcdn.com/ar.svg" },
    { country: "Australia", flagUrl: "https://flagcdn.com/au.svg" },
    { country: "Austria", flagUrl: "https://flagcdn.com/at.svg" },
    { country: "Belgium", flagUrl: "https://flagcdn.com/be.svg" },
    { country: "Brazil", flagUrl: "https://flagcdn.com/br.svg" },
    { country: "Canada", flagUrl: "https://flagcdn.com/ca.svg" },
    { country: "Chile", flagUrl: "https://flagcdn.com/cl.svg" },
    { country: "China", flagUrl: "https://flagcdn.com/cn.svg" },
    { country: "Colombia", flagUrl: "https://flagcdn.com/co.svg" },
    { country: "Croatia", flagUrl: "https://flagcdn.com/hr.svg" },
    { country: "Cuba", flagUrl: "https://flagcdn.com/cu.svg" },
    { country: "Czech Republic", flagUrl: "https://flagcdn.com/cz.svg" },
    { country: "Denmark", flagUrl: "https://flagcdn.com/dk.svg" },
    { country: "Egypt", flagUrl: "https://flagcdn.com/eg.svg" },
    { country: "Finland", flagUrl: "https://flagcdn.com/fi.svg" },
    { country: "France", flagUrl: "https://flagcdn.com/fr.svg" },
    { country: "Germany", flagUrl: "https://flagcdn.com/de.svg" },
    { country: "Greece", flagUrl: "https://flagcdn.com/gr.svg" },
    { country: "Hungary", flagUrl: "https://flagcdn.com/hu.svg" },
    { country: "India", flagUrl: "https://flagcdn.com/in.svg" },
    { country: "Indonesia", flagUrl: "https://flagcdn.com/id.svg" },
    { country: "Iran", flagUrl: "https://flagcdn.com/ir.svg" },
    { country: "Iraq", flagUrl: "https://flagcdn.com/iq.svg" },
    { country: "Ireland", flagUrl: "https://flagcdn.com/ie.svg" },
    { country: "Israel", flagUrl: "https://flagcdn.com/il.svg" },
    { country: "Italy", flagUrl: "https://flagcdn.com/it.svg" },
    { country: "Japan", flagUrl: "https://flagcdn.com/jp.svg" },
    { country: "Mexico", flagUrl: "https://flagcdn.com/mx.svg" },
    { country: "Netherlands", flagUrl: "https://flagcdn.com/nl.svg" },
    { country: "New Zealand", flagUrl: "https://flagcdn.com/nz.svg" },
    { country: "Norway", flagUrl: "https://flagcdn.com/no.svg" },
  ],
  sourceOfIncome: ["Freelancer", "Technician", "Salary", "Pension", "Others"],

  gender: [
    { name: "Male", active: false },
    { name: "Female", active: false },
    { name: "Others", active: false },
  ],

  maritalStatus: [
    { name: "Single", active: false },
    { name: "Maried", active: false },
  ],
});

export const getters = {};

export const mutations = {
  TOGGLE_ADMIN_NAV(state) {
    state.navState = !state.navState;
  },
};

export const actions = {};
