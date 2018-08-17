<style>

.btn-big{
  border-radius: 3px;
  font-size: 1.5em;
  padding: .7em;
  padding-right: 2em;
  padding-left: 2em;
  margin: .9em;
}

.btn-record{
  background: var(--red);
  box-shadow: 0 4px 0 0 #BA1604;
  width: 180px;
}

.btn-play{
  background: var(--lightblue);
  box-shadow: 0 4px 0 0 #2483AE;
}

.pulse {
  animation: pulsate 1s ease-out;
  animation-iteration-count: infinite;
}

@keyframes pulsate {
    0% {opacity: 0.8; background-color: #ED2710}
    50% {opacity: 1.0; background-color: var(--red)}
    100% {opacity: 1.0; background-color: #ED2710}
}

</style>

<template>
  <div id="card-repeat">
		<div class="header-learn">
			<h3 class="txt--left txt-cardHeader">Repeat</h3>
			<p class="txt-instructions">Try repeating the line until you feel comfortable with it. Record yourself and listen.</p>
      <a target="_blank" href="http://caterpillar.helpscoutdocs.com/article/30-getting-started#repeat"><img class="img-icon" src="./../../imgs/info.svg" /></a>
		</div>
		<div class="row-gray">
			<audio id="audioplayer"></audio>
      <button id="btn-record" v-bind:class="['btn', 'btn-primary', 'btn-big', 'btn-record', isRecording ? 'pulse' : '']"
        v-on:click="recordAudio">{{ recordText }}</button>
			<button id="btn-play" class="btn btn-primary btn-big btn-play" v-on:click="playAudio">Play</button>
      <div v-bind:style="{ display: waveVisibility }" id="waveform"></div>
		</div>
		<div class="row row-wide">
			<button class="btn btn-primary btn-gray" v-on:click="isDeletingSkill(skill)">Delete</button>
      <div>
			<button id="btn-replaySmall" class="btn btn-primary btn-lightblue" v-on:click="replayVideo">Replay</button>
			<button id="btn-continueRepeat" class="btn btn-primary btn-wide" v-on:click="didReview">Continue</button>
    </div>
		</div>
  </div>
</template>

<script>
	import { mapActions, mapMutations } from 'vuex'

  export default {
		props: ['skill'],
    mounted() {

    },
    data() {
      return {
        isRecording: false,
				mediaRecorder: null,
        chunks: [],
      }
    },
    computed: {
      waveVisibility() {
        if(this.$data.isRecording) return 'visible'
        else return 'hidden'
      },
      recordClass() {
        if (this.$data.isRecording) {
          return 'btn btn-primary btn-big btn-record pulse'
        }
        else return 'btn btn-primary btn-big btn-record'
      },
      recordText() {
        if (this.$data.isRecording) {
          return 'STOP'
        }
        else return 'Record'
      }
    },
		methods: {
			...mapMutations([
				'didReview',
        'isDeletingSkill',
			]),
      ...mapActions([
        'replayVideo',
      ]),
      recordAudio() {
        if (this.$data.isRecording) {
          this.$data.isRecording = false;
					const mr = this.$data.mediaRecorder;
					mr.stop();
					mr.stream.getTracks()[0].stop();
        }
        else {
					this.$data.chunks = null;
					this.$data.chunks = [];
          this.$data.isRecording = true;
					this.initRecorder();
        }
      },
      playAudio() {
        if(this.$data.isRecording) {
          this.recordAudio();
        }
        const blob = new Blob(this.$data.chunks)
        const url = window.URL.createObjectURL(blob);
				const audio = document.getElementById('audioplayer')
				audio.src = url;
				audio.play();
      },
			initRecorder() {
				navigator.mediaDevices.getUserMedia({audio: true})
				.then((stream) => {
					var mediaRecorder = new MediaRecorder(stream);
					this.$data.mediaRecorder = mediaRecorder;
					mediaRecorder.ondataavailable = (e) => {
						this.$data.chunks.push(e.data);
					}
					mediaRecorder.start();
				})
			},
		}
  };
</script>
