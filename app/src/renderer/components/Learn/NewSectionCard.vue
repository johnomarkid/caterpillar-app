<style>

</style>

<template>
	<div id="card-newSection" class="card-alert">
		<div class="header-alert">
			<h1 class="txt-cardHeader txt-white">Welcome to Section {{section.index + 1}}</h1><br>
			<p class="txt-instructions">Watch the entire section above. We'll take you through each line, and you'll be able to understand and reproduce everything
				said in the video.</p>
		</div>
		<div>
			<button id="btn-restart" class="btn btn-primary btn-big" @click="replayVideo">Restart ►</button>
			<button id="btn-skip" class="btn btn-primary btn-big btn-gray" v-on:click="sectionStarted(section._id)">Skip >></button>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'

	export default {
		props: ['section'],
		name: 'NewSectionCard',
		methods: {
			...mapActions([
				'sectionStarted',
				'replayVideo'
			]),
		}
	};
</script>
