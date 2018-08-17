<style>

</style>

<template>
	<ul>
		<section-row id="section-list" v-for="section in sections" v-bind:section="section" :active-video="activeVideo">
		</section-row>
	</ul>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'
  import SectionRow from './SectionRow'

	export default {
		name: 'SectionNav',
    components: {
      SectionRow,
    },
		computed: {
			...mapGetters([
				'activeVideo',
				'sections',
				]),
		},
		methods: {
			...mapActions([

			]),
		}
	}

</script>
