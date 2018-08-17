<style>

:root{
	--easiest: #84E914;
	--easy: #7DBF34;
	--medium: #FFC200;
	--challenging: #F6A623;
	--hard: #FF5D4A;
	--impossible: #CC3827;
}

.btn-easiest{
	border: 2px solid var(--easiest);
	background: white;
	color: var(--easiest);
}

.btn-easiest:hover{
	background-color: var(--easiest);
	color: white;
}

.btn-easy{
	border: 2px solid var(--easy);
	background: white;
	color: var(--easy);
}

.btn-easy:hover{
	background-color: var(--easy);
	color: white;
}

.btn-medium{
	border: 2px solid var(--medium);
	background: white;
	color: var(--medium);
}

.btn-medium:hover{
	background-color: var(--medium);
	color: white;
}

.btn-challenging{
	border: 2px solid var(--challenging);
	background: white;
	color: var(--challenging);
}

.btn-challenging:hover{
	background-color: var(--challenging);
	color: white;
}

.btn-hard{
	border: 2px solid var(--hard);
	background: white;
	color: var(--hard);
}

.btn-hard:hover{
	background-color: var(--hard);
	color: white;
}

.btn-impossible{
	border: 2px solid var(--impossible);
	background: white;
	color: var(--impossible);
}

.btn-impossible:hover{
	background-color: var(--impossible);
	color: white;
}

.img--s{
	max-width: 200px;
	justify-content: center;
}

</style>

<template>
	<div id="buttons-grade">
		<button class="btn btn-primary btn-easiest" v-on:click="grade(5)">Easiest</button>
		<button class="btn btn-primary btn-easy" v-on:click="grade(4)">Easy</button>
		<button class="btn btn-primary btn-medium" v-on:click="grade(3)">Medium</button>
		<button class="btn btn-primary btn-challenging" v-on:click="grade(2)">Challenging</button>
		<button class="btn btn-primary btn-hard" v-on:click="grade(1)">Hard</button>
		<button class="btn btn-primary btn-impossible" v-on:click="grade(0)">Impossible</button>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'

	export default {
		props: ['skill'],
		methods: {
			...mapActions([
				'gradeSkill'
			]),
			grade(n) {
				this.$store.dispatch('gradeSkill', {
					skillId: this.skill._id,
					grade: n,
				})
			}
		},
	};
</script>
