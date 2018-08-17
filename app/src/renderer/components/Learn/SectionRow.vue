<style>
.section-row {
  display: flex;
  height: 48px;
  font-size: 12px;
  cursor: pointer;
  background-color: white;
  border-radius: 4px;
  margin: 12px;
  transition: all 0.2s ease-in-out;
}

.progress{
  font-weight: bold;
  font-size: 1.2em;
  background-color: var(--palegray);
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px 0px 0px 4px;
}

.section-row:hover{
  height: 50px;
  margin: 8px;
  box-shadow: 0 15px 35px rgba(50,50,93,.1);
}

.section-title{
  font-weight: bold;
  text-align: left;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 1.2em;
}

.times{
  text-align: left;
  padding-left: 10px;
  font-weight: 500;
  color: #676767;
}

.active-section {
  background-color: var(--dark);
  color: white;
}

.active-section .progress {
	background-color: #20292C;
}

.active-section .times{
  color: white;
}

.active-section .section-title{
  color: var(--lightblue);
}

.repeatCount{
  font-size: .8em;
  font-weight: 600;
  color: var(--impossible);
  padding-left: 2px;
}

</style>

<template>
  <li class="section-row" v-bind:class="activeClass"
    v-on:click="updateActiveSection(section._id)">
		<div class="progress">
    <div>{{progress}}</div>
		<div class="repeatCount">{{repeatCount}}</div>
		</div>
    <div>
      <p class="section-title">Section {{section.index + 1}}</p>
      <p class="times">{{section.startTime}} - {{section.endTime}}</p>
    </div>
  </li>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'

	export default {
		name: 'SectionRow',
    props: ['section', 'activeVideo'],
		computed: {
			...mapGetters([
          'sectionProgress'
				]),
        activeClass() {
          return this.section._id == this.activeVideo.activeSection
            ? 'active-section'
            : ''
        },
			progress() {
				const total = this.section.skillIds.length;
        if(total == this.section.activeSkillIndex) {
          return `${this.section.activeSkillIndex} / ${total}`
        }
        const curr = this.section._id == this.activeVideo.activeSection
          ? this.section.activeSkillIndex + 1
          : this.section.activeSkillIndex;
				return `${curr} / ${total}`
			},
			repeatCount() {
				const count = this.section.repeatIds.length;
				if (count > 0) {
					return ` + ${count}`
				}
				else return null
			},
		},
		methods: {
			...mapActions([
				'updateActiveSection',
			]),
		}
	}

</script>
