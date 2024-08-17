<template>
  <div>
    <div class="dashprime-main-display">
      <div class="dash-profile-bg">
        <div class="display-cover">
          <label for="display" class="label-input">
            <span
              class="material-symbols-outlined"
              style="color: aliceblue; margin-right: 10px"
            >
              add_a_photo
            </span>
            <input
              @change="setImage"
              type="file"
              class="hide"
              id="display"
              accept="image/*"
            />
          </label>
        </div>
        <img
          src="`${FILE_URL}/${user.image}`"
          loading="lazy"
          sizes="(max-width: 479px) 88vw, (max-width: 767px) 91vw, (max-width: 1279px) 69vw, 811.1111450195312px"
          :srcset="`
            ${FILE_URL}/${user.image}   500w,
            ${FILE_URL}/${user.image}   800w,
            ${FILE_URL}/${user.image} 1080w,
            ${FILE_URL}/${user.image}        1300w`"
          alt=""
          class="responsive-img"
        />
      </div>

      <div class="dash-profile-location self">
        <div class="w-layout-grid">
          <div id="w-node-a95025d1-2a79-d8fd-0269-e9be5a0d5968-427cc6e7">
            <div
              id="w-node-a95025d1-2a79-d8fd-0269-e9be5a0d5969-427cc6e7"
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
          <div id="w-node-a95025d1-2a79-d8fd-0269-e9be5a0d596c-427cc6e7">
            <div
              id="w-node-a95025d1-2a79-d8fd-0269-e9be5a0d596d-427cc6e7"
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
          <div id="w-node-a95025d1-2a79-d8fd-0269-e9be5a0d5970-427cc6e7">
            <div
              id="w-node-a95025d1-2a79-d8fd-0269-e9be5a0d5971-427cc6e7"
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
          <div id="w-node-a95025d1-2a79-d8fd-0269-e9be5a0d5974-427cc6e7">
            <div
              id="w-node-a95025d1-2a79-d8fd-0269-e9be5a0d5975-427cc6e7"
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
          <div id="w-node-a95025d1-2a79-d8fd-0269-e9be5a0d5978-427cc6e7">
            <div
              id="w-node-a95025d1-2a79-d8fd-0269-e9be5a0d5979-427cc6e7"
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
          <div id="w-node-a95025d1-2a79-d8fd-0269-e9be5a0d597c-427cc6e7">
            <div
              id="w-node-a95025d1-2a79-d8fd-0269-e9be5a0d597d-427cc6e7"
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
      <div class="dash-profile-pix">
        <div class="dash-personal">
          <div class="dash-profile-img">
            <div class="display-cover">
              <label for="picture" class="label-input abs">
                <span
                  class="material-symbols-outlined"
                  style="color: aliceblue"
                >
                  add_a_photo
                </span>
                <input
                  @change="setPicture"
                  type="file"
                  class="hide"
                  id="picture"
                  accept="image/*"
                />
              </label>
            </div>
            <img
              v-if="user.picture"
              :src="`${FILE_URL}/${user.picture}`"
              loading="lazy"
              sizes="(max-width: 479px) 55.55555725097656px, 75.55555725097656px"
              :srcset="`
                ${FILE_URL}/${user.picture}  500w,
                ${FILE_URL}/${user.picture}  800w,
                ${FILE_URL}/${user.picture}       1000w`"
              alt=""
              class="responsive-img"
            />
            <span
              v-else
              class="material-symbols-outlined"
              style="color: aliceblue; font-size: 60px"
            >
              account_circle
            </span>
          </div>
          <div class="dash-name-holder">
            <div class="dash-username" style="margin-top: -5px">
              You're not Verified
              <nuxt-link to="/dashboard/verification" class="veri"
                >verification</nuxt-link
              >
            </div>
            <div class="dash-verify-name">
              <div v-if="user.lastName" class="dash-profile-name">
                {{ user.firstName }} {{ user.middleName }} {{ user.lastName }}
              </div>
              <div v-else class="dash-profile-name">
                <nuxt-link to="/dashboard/settings" class="dash-profile-school"
                  >Set Your Name</nuxt-link
                >
              </div>
              <img
                v-if="user.verification == 100"
                src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65b10fd5fcadbe2eb4df5065_PatchCheckFill.svg"
                loading="lazy"
                alt=""
                class="dash-verify-icon"
              />
              <div v-else class="dash-profile-name verify">
                {{ user.verification }}%
              </div>
            </div>

            <div class="dash-username">@{{ user.username }}</div>
            <!-- <div>Kenny Handsom</div> -->
          </div>
        </div>
        <div class="dash-profile-acad">
          <div v-if="user.department" class="dash-profile-name dept">
            {{ user.department }}
          </div>
          <div v-else class="dash-profile-name">
            <nuxt-link to="/dashboard/settings">Set Department</nuxt-link>
          </div>
          <div class="dash-school-level">
            <div class="dash-username level">
              <span v-if="user.level">200L</span>
              <nuxt-link to="/dashboard/settings">Set your level</nuxt-link>
            </div>

            <nuxt-link
              v-if="user.school"
              :to="`/dashboard/school-details/?username=${user.school}`"
              class="dash-profile-school"
              >IMSU</nuxt-link
            >
            <nuxt-link
              v-else
              to="/dashboard/settings"
              class="dash-profile-school"
              >Set Your Name</nuxt-link
            >
          </div>
          <div>
            <span v-if="user.country">{{ user.country }} </span>
            <nuxt-link v-else to="/dashboard/settings">Set country</nuxt-link>

            <span v-if="user.state">{{ user.state }} </span>
            <nuxt-link v-else to="/dashboard/settings">Set state</nuxt-link>
          </div>
        </div>
      </div>
      <div class="dash-profile-nav">
        <div class="dash-profile-navitems active">Bio</div>
        <div class="dash-profile-navitems">Media</div>
        <div class="dash-profile-navitems">Result</div>
      </div>
      <div class="dashmain-news-details profile class">
        <div class="dash-profile-birth">
          <div>Joined 13th Mar, 2024</div>
          <div class="dash-request-btn birth">4 Months ago</div>
        </div>
        <div>
          <div>Born on</div>
          <div class="dash-request-btn birth">08 Jun</div>
        </div>
      </div>
      <div class="dashmain-news-details profile class">
        <div class="dash-request-btn profileclass">CGPA 4.8</div>
        <div class="dash-request-btn profileclass">First Class</div>
      </div>
      <div class="dashmain-news-details profile class">
        <div class="dash-request-btn birth">Access Bank</div>
        <div class="dash-request-btn birth">0031015456</div>
      </div>
      <div class="dash-profile-resultmain">
        <div class="dashboard-slider-headline prof">My Result</div>
        <div class="dash-profile-resulthead">
          <div class="dash-profile-resulttop">
            <div class="dash-result-top gp">GP 4.3</div>
            <div class="dash-result-top">8 Courses</div>
            <div class="dash-result-top">28 Units</div>
          </div>
          <div class="dash-custom-select">
            <div class="dash-custom-selecthead">
              <div>2022/2023</div>
              <img
                src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65b11d8f17e8b72dc91d4584_CaretDownFill.svg"
                loading="lazy"
                alt=""
                class="dash-select-icon"
              />
            </div>
            <div class="dash-custom-drop">
              <div class="dash-custom-selecthead drop">
                <div>2022/2023</div>
              </div>
              <div class="dash-custom-selecthead drop">
                <div>2022/2023</div>
              </div>
              <div class="dash-custom-selecthead drop">
                <div>2022/2023</div>
              </div>
            </div>
          </div>
        </div>
        <div class="table_scroll">
          <div class="dash-profile-result">
            <div class="dash-profile-resultth">
              <div class="dash-result-sn">S/N</div>
              <div class="dash-result-course">Course</div>
              <div class="dash-result-norm">Unit</div>
              <div class="dash-result-norm">Grade</div>
              <div class="dash-result-norm">Point</div>
              <div class="dash-result-norm">C. Point</div>
            </div>
            <div class="dash-profile-resultbd">
              <div class="dash-result-sn">1</div>
              <div class="dash-result-course">Chemistry 101 <br />CHEM 101</div>
              <div class="dash-result-norm">4</div>
              <input
                class="dash-result-course input w-input"
                maxlength="256"
                name="field-4"
                data-name="Field 4"
                placeholder="A"
                type="text"
                id="field-4"
                required=""
              />
              <div class="dash-result-norm">1</div>
              <div class="dash-result-norm">4</div>
            </div>
            <div class="dash-profile-resultbd even">
              <div class="dash-result-sn">2</div>
              <div class="dash-result-course">Chemistry 101 <br />CHEM 101</div>
              <div class="dash-result-norm">4</div>
              <input
                class="dash-result-course input w-input"
                maxlength="256"
                name="field-4"
                data-name="Field 4"
                placeholder="B"
                type="text"
                id="field-4"
                required=""
              />
              <div class="dash-result-norm">2</div>
              <div class="dash-result-norm">8</div>
            </div>
            <div class="dash-profile-resultbd">
              <div class="dash-result-sn">2</div>
              <div class="dash-result-course">Chemistry 101 <br />CHEM 101</div>
              <div class="dash-result-norm">5</div>
              <input
                class="dash-result-course input w-input"
                maxlength="256"
                name="field-4"
                data-name="Field 4"
                placeholder="Example Text"
                type="text"
                id="field-4"
                required=""
              />
              <div class="dash-result-norm">1</div>
              <div class="dash-result-norm">5</div>
            </div>
            <div class="dash-profile-resultbd even">
              <div class="dash-result-sn">2</div>
              <div class="dash-result-course">Chemistry 101 <br />CHEM 101</div>
              <div class="dash-result-norm">3</div>
              <input
                class="dash-result-course input w-input"
                maxlength="256"
                name="field-4"
                data-name="Field 4"
                placeholder="Example Text"
                type="text"
                id="field-4"
                required=""
              />
              <div class="dash-result-norm">1</div>
              <div class="dash-result-norm">1</div>
            </div>
            <div class="dash-profile-resultbd">
              <div class="dash-result-sn">2</div>
              <div class="dash-result-course">Chemistry 101 <br />CHEM 101</div>
              <div class="dash-result-norm">3</div>
              <input
                class="dash-result-course input w-input"
                maxlength="256"
                name="field-4"
                data-name="Field 4"
                placeholder="Example Text"
                type="text"
                id="field-4"
                required=""
              />
              <div class="dash-result-norm">1</div>
              <div class="dash-result-norm">1</div>
            </div>
            <div class="dash-profile-resultbd total">
              <div class="dash-result-sn">2</div>
              <div class="dash-result-course">Total</div>
              <div class="dash-result-norm">56</div>
              <div class="dash-result-norm">GP 3.5</div>
              <div class="dash-result-norm">1</div>
              <div class="dash-result-norm side">
                <div class="dash-numerator">67</div>
                <div class="dash-denom">23</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="dashmain-news-details profile">
        <div class="dash-profile-social">
          <div class="dash-scial-pill">
            <div class="dash-social-num">122</div>
            <div>Followers</div>
          </div>
          <div class="dash-scial-pill">
            <div class="dash-social-num">122</div>
            <div>Followers</div>
          </div>
        </div>
        <div class="dash-profile-requestt">
          <div class="dash-request-btn profile">Send Request</div>
          <div class="dash-request-btn profile">Follow</div>
        </div>
      </div>
      <div class="dashmain-news-details prof">
        <div class="dashmain-news-left">
          <div>
            <div class="dashmain-news-headline">
              He is also a friend to<br />‍<span class="dashmain-news-name"
                >School, John, Kenny, Amara, etc</span
              >
            </div>
          </div>
        </div>
        <div class="dashmain-news-friends prof">
          <div class="dashboard-person-postimg abs third">
            <img
              src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face.jpg"
              loading="lazy"
              sizes="100vw"
              srcset="
                https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face-p-500.jpg  500w,
                https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face-p-800.jpg  800w,
                https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face.jpg       1000w
              "
              alt=""
              class="responsive-img"
            />
          </div>
          <div class="dashboard-person-postimg abs second">
            <img
              src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face.jpg"
              loading="lazy"
              sizes="100vw"
              srcset="
                https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face-p-500.jpg  500w,
                https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face-p-800.jpg  800w,
                https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face.jpg       1000w
              "
              alt=""
              class="responsive-img"
            />
          </div>
          <div class="dashboard-person-postimg abs">
            <img
              src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65aba88aa6bef4b457f6a9b2_graduate.jpg"
              loading="lazy"
              sizes="100vw"
              srcset="
                https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65aba88aa6bef4b457f6a9b2_graduate-p-500.jpg 500w,
                https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65aba88aa6bef4b457f6a9b2_graduate.jpg       612w
              "
              alt=""
              class="responsive-img"
            />
          </div>
        </div>
      </div>
      <div class="dashmain-more-news desc">
        <div class="dashboard-slider-headline prof">My Info...</div>
        <div class="dash-profile-desc">
          This is some text inside of a div block. This is some text inside of a
          div block. This is some text inside of a div block. This is some text
          inside of a div block. This is some text inside of a div block. This
          is some text inside of a div block. This is some text inside of a div
          block. This is some text inside of a div block.This is some text
          inside of a div block. This is some text inside of a div block. This
          is some text inside of a div block. This is some text inside of a div
          block.This is some text inside of a div block. This is some text
          inside of a div block. This is some text inside of a div block. This
          is some text inside of a div block.This is some text inside of a div
          block. This is some text inside of a div block. This is some text
          inside of a div block. This is some text inside of a div block.This is
          some text inside of a div block. This is some text inside of a div
          block. This is some text inside of a div block. This is some text
          inside of a div block.
        </div>
      </div>
      <div class="dash-profile-location">
        <div class="dashboard-slider-headline prof">My Info...</div>
        <div class="w-layout-grid profile-grid">
          <div id="w-node-a95025d1-2a79-d8fd-0269-e9be5a0d5a61-427cc6e7">
            <div
              id="w-node-a95025d1-2a79-d8fd-0269-e9be5a0d5a62-427cc6e7"
              class="dash-profile-label"
            >
              Country of Residence
            </div>
            <div class="dash-custom-select">
              <div class="dash-custom-selecthead location">
                <div class="dash-select-headtext">Nigeria</div>
                <img
                  src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65b11d8f17e8b72dc91d4584_CaretDownFill.svg"
                  loading="lazy"
                  alt=""
                  class="dash-select-icon"
                />
              </div>
              <div class="dash-custom-drop">
                <div class="dash-custom-selecthead drop">
                  <div>2022/2023</div>
                </div>
                <div class="dash-custom-selecthead drop">
                  <div>2022/2023</div>
                </div>
                <div class="dash-custom-selecthead drop">
                  <div>2022/2023</div>
                </div>
              </div>
            </div>
          </div>
          <div id="w-node-a95025d1-2a79-d8fd-0269-e9be5a0d5a73-427cc6e7">
            <div
              id="w-node-a95025d1-2a79-d8fd-0269-e9be5a0d5a74-427cc6e7"
              class="dash-profile-label"
            >
              Country of Residence
            </div>
            <div class="dash-custom-select">
              <div class="dash-custom-selecthead location">
                <div class="dash-select-headtext">Nigeria</div>
                <img
                  src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65b11d8f17e8b72dc91d4584_CaretDownFill.svg"
                  loading="lazy"
                  alt=""
                  class="dash-select-icon"
                />
              </div>
              <div class="dash-custom-drop">
                <div class="dash-custom-selecthead drop">
                  <div>2022/2023</div>
                </div>
                <div class="dash-custom-selecthead drop">
                  <div>2022/2023</div>
                </div>
                <div class="dash-custom-selecthead drop">
                  <div>2022/2023</div>
                </div>
              </div>
            </div>
          </div>
          <div id="w-node-a95025d1-2a79-d8fd-0269-e9be5a0d5a85-427cc6e7">
            <div
              id="w-node-a95025d1-2a79-d8fd-0269-e9be5a0d5a86-427cc6e7"
              class="dash-profile-label"
            >
              Country of Residence
            </div>
            <div class="dash-custom-select">
              <div class="dash-custom-selecthead location">
                <img
                  src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65adcbcdd6e8611d02fd2423_loader-line-icon%201.svg"
                  loading="lazy"
                  alt=""
                  class="dash-select-spinner"
                />
                <div class="dash-select-headtext">Loading...</div>
                <div class="dash-select-headtext">Nigeria</div>
                <img
                  src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65b11d8f17e8b72dc91d4584_CaretDownFill.svg"
                  loading="lazy"
                  alt=""
                  class="dash-select-icon"
                />
              </div>
              <div class="dash-custom-drop">
                <div class="dash-custom-selecthead drop">
                  <div>2022/2023</div>
                </div>
                <div class="dash-custom-selecthead drop">
                  <div>2022/2023</div>
                </div>
                <div class="dash-custom-selecthead drop">
                  <div>2022/2023</div>
                </div>
              </div>
            </div>
          </div>
          <div id="w-node-a95025d1-2a79-d8fd-0269-e9be5a0d5a9a-427cc6e7">
            <div
              id="w-node-a95025d1-2a79-d8fd-0269-e9be5a0d5a9b-427cc6e7"
              class="dash-profile-label"
            >
              Village of Residence
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
      </div>
      <div class="dash-profile-location">
        <div class="dashboard-slider-headline prof">My Info...</div>
        <div class="w-layout-grid profile-grid">
          <div id="w-node-a95025d1-2a79-d8fd-0269-e9be5a0d5aa2-427cc6e7">
            <div
              id="w-node-a95025d1-2a79-d8fd-0269-e9be5a0d5aa3-427cc6e7"
              class="dash-profile-label"
            >
              Country of Residence
            </div>
            <div class="dash-custom-select">
              <div class="dash-custom-selecthead location">
                <img
                  src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65adcbcdd6e8611d02fd2423_loader-line-icon%201.svg"
                  loading="lazy"
                  alt=""
                  class="dash-select-spinner"
                />
                <div class="dash-select-headtext">Loading...</div>
                <div class="dash-select-headtext">Nigeria</div>
                <img
                  src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65b11d8f17e8b72dc91d4584_CaretDownFill.svg"
                  loading="lazy"
                  alt=""
                  class="dash-select-icon"
                />
              </div>
              <div class="dash-custom-drop">
                <div class="dash-custom-selecthead drop">
                  <div>2022/2023</div>
                </div>
                <div class="dash-custom-selecthead drop">
                  <div>2022/2023</div>
                </div>
                <div class="dash-custom-selecthead drop">
                  <div>2022/2023</div>
                </div>
              </div>
            </div>
          </div>
          <div id="w-node-a95025d1-2a79-d8fd-0269-e9be5a0d5ab7-427cc6e7">
            <div
              id="w-node-a95025d1-2a79-d8fd-0269-e9be5a0d5ab8-427cc6e7"
              class="dash-profile-label"
            >
              Country of Residence
            </div>
            <div class="dash-custom-select">
              <div class="dash-custom-selecthead location">
                <img
                  src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65adcbcdd6e8611d02fd2423_loader-line-icon%201.svg"
                  loading="lazy"
                  alt=""
                  class="dash-select-spinner"
                />
                <div class="dash-select-headtext">Loading...</div>
                <div class="dash-select-headtext">Nigeria</div>
                <img
                  src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65b11d8f17e8b72dc91d4584_CaretDownFill.svg"
                  loading="lazy"
                  alt=""
                  class="dash-select-icon"
                />
              </div>
              <div class="dash-custom-drop">
                <div class="dash-custom-selecthead drop">
                  <div>2022/2023</div>
                </div>
                <div class="dash-custom-selecthead drop">
                  <div>2022/2023</div>
                </div>
                <div class="dash-custom-selecthead drop">
                  <div>2022/2023</div>
                </div>
              </div>
            </div>
          </div>
          <div id="w-node-a95025d1-2a79-d8fd-0269-e9be5a0d5acc-427cc6e7">
            <div
              id="w-node-a95025d1-2a79-d8fd-0269-e9be5a0d5acd-427cc6e7"
              class="dash-profile-label"
            >
              Country of Residence
            </div>
            <div class="dash-custom-select">
              <div class="dash-custom-selecthead location">
                <img
                  src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65adcbcdd6e8611d02fd2423_loader-line-icon%201.svg"
                  loading="lazy"
                  alt=""
                  class="dash-select-spinner"
                />
                <div class="dash-select-headtext">Loading...</div>
                <div class="dash-select-headtext">Nigeria</div>
                <img
                  src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65b11d8f17e8b72dc91d4584_CaretDownFill.svg"
                  loading="lazy"
                  alt=""
                  class="dash-select-icon"
                />
              </div>
              <div class="dash-custom-drop">
                <div class="dash-custom-selecthead drop">
                  <div>2022/2023</div>
                </div>
                <div class="dash-custom-selecthead drop">
                  <div>2022/2023</div>
                </div>
                <div class="dash-custom-selecthead drop">
                  <div>2022/2023</div>
                </div>
              </div>
            </div>
          </div>
          <div id="w-node-a95025d1-2a79-d8fd-0269-e9be5a0d5ae1-427cc6e7">
            <div
              id="w-node-a95025d1-2a79-d8fd-0269-e9be5a0d5ae2-427cc6e7"
              class="dash-profile-label"
            >
              Village of Residence
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "dashboard",
  data() {
    return {
      image: "",
    };
  },
  methods: {
    goSettings() {
      this.$router.push("/dashboard/settings");
    },
    async setPicture(e) {
      const form = new FormData();
      form.append("picture", e.target.files[0]);

      const payload = {
        form: form,
        url: `/users/update-user/?id=${this.user.id}`,
      };

      const result = await this.$store.dispatch("dashboard/makePOST", payload);
      if (!result.response) {
        console.log(result, result.response);
        this.$store.commit("setUser", result.data.data);
      }
    },

    async setImage(e) {
      const form = new FormData();
      form.append("image", e.target.files[0]);

      const payload = {
        form: form,
        url: `/users/update-user/?id=${this.user.id}`,
      };

      const result = await this.$store.dispatch("dashboard/makePOST", payload);
      if (!result.response) {
        this.$store.commit("setUser", result.data.data);
      }
    },
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },

    FILE_URL() {
      return this.$store.state.dashboard.fileURL;
    },
  },
};
</script>

<style></style>
