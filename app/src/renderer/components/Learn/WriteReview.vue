<style>

</style>

<template>
  <div id="card-write">
		<div class="header-learn">
			<h3 class="txt-cardHeader">Write</h3>
			<p class="txt-instructions">Write what you hear on a piece of paper or type it here. Then, submit to check your answer.</p>
      <a target="_blank" href="http://caterpillar.helpscoutdocs.com/article/30-getting-started#write"><img class="img-icon" src="./../../imgs/info.svg" /></a>
    </div>
		<div class="row-gray">
      <textarea id="textarea" class="textarea" v-on:input="setText"></textarea>
		</div>
		<div class="row row-wide">
			<button class="btn btn-primary btn-gray" v-on:click="isDeletingSkill(skill)">Delete</button>
      <div>
			<button class="btn btn-primary btn-lightblue" v-on:click="replayVideo">Replay</button>
			<button id="btn-continueWrite" class="btn btn-primary btn-wide" v-on:click="didReview">Continue</button>
    </div>
		</div>
  </div>
</template>

<script>
	import { mapActions, mapMutations } from 'vuex'

  export default {
		props: ['skill'],
		methods: {
			...mapMutations([
				'didReview',
        'isDeletingSkill',
			]),
      ...mapActions([
        'replayVideo',
      ]),
      setText(e) {
        e.preventDefault();
        this.skill.writeReviewText = e.target.value;
      },
		}
  };
</script>
