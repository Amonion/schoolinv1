<template>
  <div class="comments w-form">
    <div class="comment-form">
      <div class="category-title comment">Make your comments</div>
      <div v-if="showCommentBox" class="comment-input-box active">
        <textarea
          placeholder="Enter your comment..."
          maxlength="5000"
          v-model="comment"
          class="comment-input w-input"
        ></textarea>
        <div class="ome-btn" @click="processData"><div>Send</div></div>
      </div>
      <div @click="showCommentBox = !showCommentBox" class="comment-btn">
        <img
          src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/65a9c0c462a23ba577710dac_feather-icon%201.svg"
          loading="lazy"
          alt=""
          class="comment-btn-icon"
        />
      </div>
      <div class="main-comment-flex">
        <div class="comment-dp">
          <img
            src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ac1b79146276e6d48834d_Stoicism-The-Life-Changing-Philosophy-Explained.webp"
            loading="lazy"
            sizes="(max-width: 479px) 40px, 60.000003814697266px"
            srcset="
              https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ac1b79146276e6d48834d_Stoicism-The-Life-Changing-Philosophy-Explained-p-500.webp   500w,
              https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ac1b79146276e6d48834d_Stoicism-The-Life-Changing-Philosophy-Explained-p-800.webp   800w,
              https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ac1b79146276e6d48834d_Stoicism-The-Life-Changing-Philosophy-Explained-p-1080.webp 1080w,
              https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ac1b79146276e6d48834d_Stoicism-The-Life-Changing-Philosophy-Explained.webp        1344w
            "
            alt=""
            class="cover-im"
          />
        </div>
        <div class="comment-details">
          <div class="comment-username">Kenny<br /></div>
          <div class="comment-text">
            This is some text inside of a div block. This is some text inside of
            a div block. This is some text inside of a div block. This is some
            text inside of a div block. This is some text inside of a div block.
            This is some text inside of a div block. This is some text inside of
            a div block. This is some text inside of a div block.
          </div>
          <div class="blog-details comment">
            <div class="blog-detail-flex com">
              <img
                src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/65a8fa5008c4f3a17a694017_Clock.svg"
                loading="lazy"
                alt=""
                class="blog-detail-icon sm"
              />
              <div>13 min</div>
            </div>
            <div class="blog-detail-flex com">
              <img
                src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/65a9c75bd81f9bd14fce0b9a_HandThumbsUp.svg"
                loading="lazy"
                alt=""
                class="blog-detail-icon sm"
              />
              <div>103</div>
            </div>
            <div class="blog-detail-flex com">
              <img
                src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/65a9c75ba09012a9e3fa75ed_Reply.svg"
                loading="lazy"
                alt=""
                class="blog-detail-icon"
              />
              <div>10K</div>
            </div>
          </div>
          <div class="main-comment-flex sub">
            <div class="comment-dp">
              <img
                src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ae1e3205fdc37455b4666_636642780883209575.jpg"
                loading="lazy"
                alt=""
                class="cover-im"
              />
            </div>
            <div>
              <div class="comment-username">
                John -&gt; <span class="reply-username">@Kenny</span><br />
              </div>
              <div class="comment-text">
                This is some text inside of a div block. This is some text
                inside of a div block. This is some text inside of a div block.
                This is some text inside of a div block. This is some text
                inside of a div block. This is some text inside of a div block.
                This is some text inside of a div block. This is some text
                inside of a div block.
              </div>
            </div>
          </div>
          <div class="main-comment-flex sub">
            <div class="comment-dp">
              <img
                src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ae1e3205fdc37455b4666_636642780883209575.jpg"
                loading="lazy"
                alt=""
                class="cover-im"
              />
            </div>
            <div>
              <div class="comment-username">
                John -&gt; <span class="reply-username">@Kenny</span><br />
              </div>
              <div class="comment-text">
                This is some text inside of a div block. This is some text
                inside of a div block. This is some text inside of a div block.
                This is some text inside of a div block. This is some text
                inside of a div block. This is some text inside of a div block.
                This is some text inside of a div block. This is some text
                inside of a div block.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-comment-flex">
        <div class="comment-dp">
          <img
            src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ac1b79146276e6d48834d_Stoicism-The-Life-Changing-Philosophy-Explained.webp"
            loading="lazy"
            sizes="(max-width: 479px) 40px, 60.000003814697266px"
            srcset="
              https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ac1b79146276e6d48834d_Stoicism-The-Life-Changing-Philosophy-Explained-p-500.webp   500w,
              https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ac1b79146276e6d48834d_Stoicism-The-Life-Changing-Philosophy-Explained-p-800.webp   800w,
              https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ac1b79146276e6d48834d_Stoicism-The-Life-Changing-Philosophy-Explained-p-1080.webp 1080w,
              https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ac1b79146276e6d48834d_Stoicism-The-Life-Changing-Philosophy-Explained.webp        1344w
            "
            alt=""
            class="cover-im"
          />
        </div>
        <div>
          <div class="comment-username">Kenny<br /></div>
          <div class="comment-text">
            This is some text inside of a div block. This is some text inside of
            a div block. This is some text inside of a div block. This is some
            text inside of a div block. This is some text inside of a div block.
            This is some text inside of a div block. This is some text inside of
            a div block. This is some text inside of a div block.
          </div>
          <div class="blog-details comment">
            <div class="blog-detail-flex">
              <img
                src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/65a8fa5008c4f3a17a694017_Clock.svg"
                loading="lazy"
                alt=""
                class="blog-detail-icon"
              />
              <div>13 min</div>
            </div>
            <div class="blog-detail-flex">
              <img
                src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/65a9c75bd81f9bd14fce0b9a_HandThumbsUp.svg"
                loading="lazy"
                alt=""
                class="blog-detail-icon"
              />
              <div>103</div>
            </div>
            <div class="blog-detail-flex">
              <img
                src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/65a9c75ba09012a9e3fa75ed_Reply.svg"
                loading="lazy"
                alt=""
                class="blog-detail-icon"
              />
              <div>10K</div>
            </div>
          </div>
          <div class="main-comment-flex sub">
            <div class="comment-dp">
              <img
                src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ae1e3205fdc37455b4666_636642780883209575.jpg"
                loading="lazy"
                alt=""
                class="cover-im"
              />
            </div>
            <div>
              <div class="comment-username">
                John -&gt; <span class="reply-username">@Kenny</span><br />
              </div>
              <div class="comment-text">
                This is some text inside of a div block. This is some text
                inside of a div block. This is some text inside of a div block.
                This is some text inside of a div block. This is some text
                inside of a div block. This is some text inside of a div block.
                This is some text inside of a div block. This is some text
                inside of a div block.
              </div>
              <div class="blog-details comment">
                <div class="blog-detail-flex">
                  <img
                    src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/65a8fa5008c4f3a17a694017_Clock.svg"
                    loading="lazy"
                    alt=""
                    class="blog-detail-icon"
                  />
                  <div>13 min</div>
                </div>
                <div class="blog-detail-flex">
                  <img
                    src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/65a9c75bd81f9bd14fce0b9a_HandThumbsUp.svg"
                    loading="lazy"
                    alt=""
                    class="blog-detail-icon like"
                  />
                  <div>103</div>
                </div>
                <div class="blog-detail-flex">
                  <img
                    src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/65a9c75ba09012a9e3fa75ed_Reply.svg"
                    loading="lazy"
                    alt=""
                    class="blog-detail-icon like"
                  />
                  <div>10K</div>
                </div>
              </div>
            </div>
          </div>
          <div class="main-comment-flex sub">
            <div class="comment-dp">
              <img
                src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ae1e3205fdc37455b4666_636642780883209575.jpg"
                loading="lazy"
                alt=""
                class="cover-im"
              />
            </div>
            <div>
              <div class="comment-username">
                John -&gt; <span class="reply-username">@Kenny</span><br />
              </div>
              <div class="comment-text">
                This is some text inside of a div block. This is some text
                inside of a div block. This is some text inside of a div block.
                This is some text inside of a div block. This is some text
                inside of a div block. This is some text inside of a div block.
                This is some text inside of a div block. This is some text
                inside of a div block.
              </div>
              <div class="blog-details comment">
                <div class="blog-detail-flex">
                  <img
                    src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/65a8fa5008c4f3a17a694017_Clock.svg"
                    loading="lazy"
                    alt=""
                    class="blog-detail-icon"
                  />
                  <div>13 min</div>
                </div>
                <div class="blog-detail-flex">
                  <img
                    src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/65a9c75bd81f9bd14fce0b9a_HandThumbsUp.svg"
                    loading="lazy"
                    alt=""
                    class="blog-detail-icon"
                  />
                  <div>103</div>
                </div>
                <div class="blog-detail-flex">
                  <img
                    src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/65a9c75ba09012a9e3fa75ed_Reply.svg"
                    loading="lazy"
                    alt=""
                    class="blog-detail-icon"
                  />
                  <div>10K</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="comment-username load">
        <span class="reply-username load">Load More</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showCommentBox: false,
      comment: "",
    };
  },

  methods: {
    processData() {
      if (!this.isAuthenticated) {
        this.$router.push("/login");
      }
    },
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

    blog() {
      return this.$store.state.blog;
    },
  },
};
</script>

<style></style>
