<style>
  .txt-fileName{
    font-family: 'Lato', sans-serif;
    font-size: .8em;
    font-weight: 600;
    letter-spacing: .2px;
    background-color: var(--dark);
    color: white;
    border-radius: 3px;
    padding: 5px 2px 5px 2px;
    margin-left: 20px;
    max-width: 550px;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
  }
</style>

<template id="page-upload">
  <div class="page">
    <div class="row row-wide">
    <h2 class="txt--left">Upload</h2>
    <a target="_blank" href="http://caterpillar.helpscoutdocs.com/article/30-getting-started#upload"><img class="img-icon" src="./../imgs/info.svg" /></a>
    </div>

    <div class="card-light">
      <p>Not sure how to import videos?</p><br>
      <a target="_blank" href="http://caterpillar.helpscoutdocs.com/article/7-how-do-i-add-films-subtitles-to-caterpillar"><button class="btn btn-primary btn-round btn-green">Learn how to import videos</button></a>
    </div><br><br>

    <div class="card card-upload spaceBetween" id="step1">
      <div class="spaceBetween">
        <label class="txt--bold" for="vidUpload">Video File <i>(.mp4 only)</i> </label>
        <div class="txt-fileName" v-if="videoSrc">{{videoSrc}}</div>
      </div>
      <button class="btn btn-primary btn-gray">
      <input class="txt--fileName" id="vidUpload" name="videoSrc" type="file" v-on:change="setPath">
		  <span>Choose File</span>
		</button>

    </div>

    </br>

    <div class="card card-upload spaceBetween" id="step2">
      <div class="spaceBetween">
        <label class="txt--bold" for="subUpload">Subtitle File <i>(.srt only)</i> </label>
        <div class="txt-fileName" v-if="subtitleSrc">{{subtitleSrc}}</div>
      </div>
      <button class="btn btn-primary btn-gray">
      <input id="subUpload" name="subtitleSrc" type="file" v-on:change="setPath">
      <span>Choose File</span>
    </button>

    </div>

    <modal-container v-if="fieldsError">
      <h3 slot="header">Whoops!</h3>
      <p slot="body">It seems like you forgot to choose a valid file or select a title.</p>
      <div slot="footer">
        <button class="btn btn-primary btn-red" v-on:click="dismissErrorModal">Dismiss</button>
      </div>
    </modal-container>

    <loading-view v-if="isLoadingView"></loading-view>

    </br>

    <div class="card card-upload spaceBetween" id="step3">
      <label class="txt--bold" for="vidTitle">Video Title </label>
      <input class="input" id="vidTitle" type="text" v-model="videoTitle">
    </div>
    </br>

    <div class="spaceBetween row-right">
      <div>
        <button class="btn btn-primary btn-gray" v-on:click="cancel">Cancel</button>
        <button class="btn btn-primary btn-lightblue" v-on:click="upload" id="step4">Save to Library</button>
      </div>
    </div>

    <!--<button class="btn btn-primary btn-green" v-on:click="deleteDB">TEMP: delete db</button>-->
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import ModalContainer from './ModalContainer'
  import LoadingView from './LoadingView'
  import firebaseInstance from '../firebase';
  const firebase = firebaseInstance.firebase;

  export default {
    components: {
      ModalContainer,
      LoadingView,
    },
    data() {
      return {
        videoSrc: null,
        subtitleSrc: null,
        videoTitle: '',
        fieldsError: false,
      };
    },
    computed: {
      ...mapGetters([
        'isLoadingView',
      ])
    },

    methods: {
      ...mapActions([
        'deleteDB',
      ]),
      setPath(e) {
        e.preventDefault();
        const field = e.path[0].name;
        const path = e.path[0].files[0].path;
        this.$data[field] = path;
      },
      upload() {
        if (this.videoSrc && this.subtitleSrc && this.videoTitle.length > 0) {
          this.$store.dispatch('uploadVideo', {
            videoSrc: this.$data.videoSrc,
            subtitleSrc: this.$data.subtitleSrc,
            videoTitle: this.$data.videoTitle,
          })
        }
        else {
          this.fieldsError = true;
        }
      },
      cancel() {
        this.videoSrc = null;
        this.subtitleSrc = null;
        this.videoTitle = '';
      },
      dismissErrorModal() {
        this.fieldsError = false;
      },
    },
  };
</script>
