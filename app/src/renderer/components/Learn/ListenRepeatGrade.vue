<style>

</style>

<template>
  <div id="card-grade">

		<div class="header-grade">
      <div class="row row-wide row-right">
        <a target="_blank" href="http://caterpillar.helpscoutdocs.com/article/30-getting-started#grade"><img class="img-icon" src="./../../imgs/info.svg" /></a>
        <button id="button-repeat" class="btn btn-primary btn-hollow" v-on:click="replayVideo">⟲</button>
        <button id="button-delete" class="btn btn-primary btn-gray btn-margin" v-on:click="isDeletingSkill(skill)">Delete</button>
			  <button id="button-edit" class="btn btn-primary btn-edit" v-on:click="isEditingSkill">Edit</button>
    </div>

    <div id="sub-translate">
      <h3 class="txt-lightblue">Correct Answer</h3>
      <subtitle-view v-bind:subtitle="subtitle.text"></subtitle-view>
    </div>

  </div>

		<grade-buttons v-bind:skill="skill"></grade-buttons>

  </div>
</template>

<script>
	import { mapMutations, mapActions } from 'vuex'
	import GradeButtons from './GradeButtons'
  import SubtitleView from './SubtitleView'

  export default {
		props: ['skill', 'subtitle'],

		components: {
			GradeButtons,
      SubtitleView,
		},
		methods: {
			...mapMutations([
        'isDeletingSkill',
        'updateSkill',
			]),
      ...mapActions([
        'replayVideo',
      ]),
      isEditingSkill() {
        this.skill.isEditing = true;
        this.updateSkill(this.skill);
      }
		},
  };
</script>
