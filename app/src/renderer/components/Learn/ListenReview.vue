<style>

.btn-slow{
  background: var(--lightblue);
  box-shadow: 0 4px 0 0 #2483AE;
}

.btn-replay{
  box-shadow: 0 4px 0 0 #1E5196;
}

</style>

<template>
  <div id="card-listen">
		<div class="header-learn">
			<h3 class="txt-cardHeader">Listen</h3>
			<p class="txt-instructions">Listen carefully. Can you understand what is being said? Replay as many times as you’d like, then press Continue.</p>
      <a target="_blank" href="http://caterpillar.helpscoutdocs.com/article/30-getting-started#listen"><img class="img-icon" src="./../../imgs/info.svg" /></a>
    </div>
		<div class="row-gray">
			<button id="btn-slow" class="btn btn-primary btn-big btn-slow" v-on:click="slowReplay">Slow ⟲</button>
			<button id="btn-replay" class="btn btn-primary btn-big btn-replay" v-on:click="replayVideo">Replay ⟲</button>
		</div>
		<div class="row row-wide">
			<button id="btn-delete" class="btn btn-primary btn-gray" v-on:click="isDeletingSkill(skill)">Delete</button>
			<button id="btn-continueListen" class="btn btn-primary btn-wide" v-on:click="didReview">Continue</button>
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
        'slowReplay',
      ]),
		}
  };
</script>
