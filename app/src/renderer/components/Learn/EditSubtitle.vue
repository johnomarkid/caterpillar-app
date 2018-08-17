<style>

</style>

<template>
  <div class="card-alert">
		<div class="header-alert">
			<p class="txt-instructions">Sometimes the text from subtitle files don't perfectly match what is said in the video. That's OK! Edit the line here.</p>
		</div>
    <div class="row-gray">
      <textarea class="textarea" v-on:input="setText">{{subtitle.text}}</textarea>
    </div>
		<div class="row row-wide">
			<button class="btn btn-primary btn-gray" v-on:click="cancelEdit">Cancel</button>
      <button class="btn btn-primary btn-blue" v-on:click="doneEdit">Done</button>
		</div>
  </div>
</template>

<script>
	import { mapActions, mapMutations } from 'vuex'

  export default {
		props: ['subtitle', 'skill'],
		name: 'EditSubtitle',
    data() {
      return {
        updatedText: null,
      }
    },
		methods: {
			...mapActions([
				'editSubtitle',
			]),
      ...mapMutations([
        'updateSkill',
      ]),
      setText(e) {
        e.preventDefault();
        this.updatedText = e.target.value;
      },
      cancelEdit() {
        this.skill.isEditing = false;
        this.updateSkill(this.skill);
      },
      doneEdit() {
        this.skill.isEditing = false;
        this.updateSkill(this.skill);
        this.subtitle.text = this.updatedText;
        this.editSubtitle(this.subtitle);
      },
		}
  };
</script>
