<style>
#learn-container {
	display: flex;
}

#learn-stage {
	min-width: 500px;
	width: 100%;
	background: var(--lightgray);
}

#section-nav {
	width: 357px;
	background: var(--mediumgray);
	height: 100vh;
	overflow: scroll;
	overflow-x: hidden;
	position: relative;
	right: 0;
	box-shadow: 0 5px 15px rgba(0,0,0,.07);
}

.video-player{
	margin: 0px;
	padding: 0px;
	background-color: black;
}

#video-player{
	width: 100%;
	height: 50%;
	max-height: 340px;
}

#learn-nav{
	height: 50px;
}

.learn-nav{
	background-color: var(--dark);
	box-shadow: 0 5px 15px rgba(0,0,0,.07);
}

.txt--nav{
	font-size: 1.5em;
	font-weight: 400;
	letter-spacing: 1px;
	color: var(--palegray);
	text-overflow: ellipsis;
	white-space: nowrap;
	font-weight: 600;
}

/*-----Progress Bar-----*/

.progressBar{
	width: 100%;
	height: 10px;
	background: var(--darkest);
}

.progressBar-i{
	height: 10px;
	z-index: 1;
	background: linear-gradient(223deg, var(--blue), var(--lightblue), #7191FA, var(--blue));
	background-size: 300%;
	transition: all 1s ease-in-out;
	animation: color-gradient 10s ease-in-out infinite;
}

@keyframes color-gradient {
	0% {background-position: 0% 50%;}
 50% {background-position: 100% 50%;}
100% {background-position: 0% 50%;}
}

.txt-dailyGoal{
	font-family: 'Quicksand', sans-serif;
	font-size: .8em;
	color: white;
}

.txt-percentage{
	font-weight: 600;
	font-size: 1.7em;
}
</style>

<template>
  <div id="learn-container" v-if="activeVideo != null">
    <div id="learn-stage">

      <div class="learn-nav">

        <!-- JOHN: this is the new row including the dailyGoal -->
        <div class="row row-wide" id="learn-nav">

          <div class="row row-center">
						<a target="_blank" href="http://caterpillar.helpscoutdocs.com/article/30-getting-started/#learn-area"><img class="img-icon" src="./../imgs/info.svg" /></a>
						<h2 class="txt--left txt--nav">{{ activeVideo.videoTitle }}</h2>
					</div>
          <div class="row-wide row-right">
            <p class="txt-dailyGoal">Daily Goal</p>
            <p class="txt-dailyGoal txt-percentage">{{dailyGoal}}%</p>
          </div>
        </div>

				<!--  JOHN: this is the progress bar -->
				<div class="progressBar" id="progress-bar">
					<div class="progressBar-i" v-bind:style="{ width: dailyGoal + '%' }">
					</div>
				</div>

      </div>

      <finished-section v-if="!activeSkill"></finished-section>
      <div v-else>
        <div class="video-player">
          <video id="video-player" v-bind:src="videoClip" autoplay>
          </video>
        </div>
        <modal-container v-if="activeSkill.isDeleting">
          <h3 slot="header">Are you sure you want to delete this subtitle?</h3>
          <p slot="body">You will not be able to undo this action.</p>
          <div class="row row-wide" slot="footer">
            <button class="btn btn-primary btn-gray" v-on:click="dismissDelete">Cancel</button>
            <button class="btn btn-primary btn-red" v-on:click="deleteSkill(activeSkill)">Delete</button>
          </div>
        </modal-container>
        <modal-container v-if="showPremiumBlockModal">
          <img src="./../imgs/celebrate.svg">
          <h3 slot="header" style="color:var(--magenta)">You need a Premium Account to access further content !</h3>
<p slot="body">We hope you're enjoying Caterpillar! <br><br> If you'd like to continue learning, please upgrade to a Premium Account for
  <b>$99</b>. This <b>one time payment</b> means <b>all future updates are free.</b></p>
<div class="row row-wide" slot="footer">
  <button class="btn btn-primary btn-gray" v-on:click="dismissBlockModal">Cancel</button>
  <button class="btn btn-primary btn-magenta" @click="upgradeClicked">Upgrade Now</button>
</div>
</modal-container>
<div class="card card-learn">
  <new-section-card v-if="activeSection.isStarted === false" v-bind:section="activeSection">
  </new-section-card>
  <component v-else v-bind:is="activeCard" v-bind:skill="activeSkill" v-bind:subtitle="activeSubtitle"></component>
</div>
</div>
</div>
<section-nav id="section-nav"></section-nav>
</div>


<div v-else>
	<img src="../imgs/no-video.svg" style="width:150px; margin-top:100px;"><br /><br />
	<p>No videos added yet.</p><br>
	<button class="btn btn-primary" @click="updateRoute('upload')">Upload a video</button>
	<br><br><br>

	<div class="card-light">
		<p>Not sure where to start?</p><br>
		<a target="_blank" href="http://caterpillar.helpscoutdocs.com/article/30-getting-started"><button class="btn btn-primary btn-round btn-green">View introduction tutorial</button></a>
	</div>
	</div>
</div>

</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import { hhmmssToSeconds } from '../utils/dateHelper'
  import SectionNav from './Learn/SectionNav'
  import ListenReview from './Learn/ListenReview'
  import ListenRepeatGrade from './Learn/ListenRepeatGrade'
  import WriteReview from './Learn/WriteReview'
  import WriteGrade from './Learn/WriteGrade'
  import RepeatReview from './Learn/RepeatReview'
  import NewSectionCard from './Learn/NewSectionCard'
  import EditSubtitle from './Learn/EditSubtitle'
  import ModalContainer from './ModalContainer'
  import FinishedSection from './Learn/FinishedSection'

  export default {
    components: {
      SectionNav,
      listenReview: ListenReview,
      listenRepeatGrade: ListenRepeatGrade,
      writeReview: WriteReview,
      writeGrade: WriteGrade,
      repeatReview: RepeatReview,
      editSubtitle: EditSubtitle,
      NewSectionCard,
      ModalContainer,
      FinishedSection,
    },
    computed: {
      ...mapGetters([
        'activeVideo',
      ]),
      showPremiumBlockModal() {
        return this.$store.state.ui.isPremiumBlockModal
      },
      videoClip() {
        const vid = this.activeVideo;
        let pst = null;
        let pet = null;
        if (!this.activeSection.isStarted) {
          pst = this.activeSection.startTime;
          pet = this.activeSection.endTime;
        }
        else {
          pst = this.activeSubtitle.startTime;
          pet = this.activeSubtitle.endTime;
        }
        const st = hhmmssToSeconds(pst) - 1;
        const et = hhmmssToSeconds(pet) + 1;
        return `file://${vid.videoSrc}#t=${st},${et}`
      },
      dailyGoal() {
        const completed = this.$store.getters.completedHistory[this.activeVideo._id];
        if (!completed) return 0
        return Math.floor((completed.length / 120) * 100) // TODO make daily goal dynamically set by user
      },
      activeSection() {
        return this.$store.state.sections.byId[this.activeVideo.activeSection]
      },
      activeSkill() {
        const skillIds = this.activeSection.skillIds;
        const index = this.activeSection.activeSkillIndex;
        if (index >= skillIds.length) {
          console.log('no skill')
          return null;
        }
        else {
          const unseenSkillId = skillIds[index];
          return this.$store.state.skills.byId[unseenSkillId]
        }
      },
      activeSubtitle() {
        return this.$store.state.subtitles.byId[this.activeSkill.subtitle]
      },
      activeCard() {
        if (this.activeSkill.isEditing) {
          return 'editSubtitle'
        }
        else if (this.activeSection.isGrading) {
          const phase = this.activeSkill.phase;
          if (phase == 'write') return 'writeGrade'
          else return 'listenRepeatGrade'
        }
        else {
          const phase = this.activeSkill.phase;
          return `${phase}Review`
        }
      },
    },
    methods: {
      ...mapActions([
        'deleteSkill',
        'upgradeClicked',
      ]),
      ...mapMutations([
        'updateSkill',
        'updateRoute',
      ]),
      dismissBlockModal() {
        this.$store.commit('togglePremiumBlockModal')
      },
      dismissDelete() {
        this.activeSkill.isDeleting = false;
        this.updateSkill(this.activeSkill);
      },
    }
  };
</script>
