<style>
  .list-library li{
    padding: 5px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #EAF0F4;
    font-weight: 500;
  }

  .list-library li:last-child { border-bottom: none; }

  .list-library li:hover{
    background-color: #EAF3FF;
  }
</style>

<template>
  <div class="page">
    <div class="row row-wide">
		<h2 class="txt--left">Library</h2>
    <a target="_blank" href="http://caterpillar.helpscoutdocs.com/article/30-getting-started#library"><img class="img-icon" src="./../imgs/info.svg" /></a>
  </div>
    <div class="card">
		<ul class="list-library">
			<li class="spaceBetween" v-for="video in videos">
				{{ video.videoTitle }}
        <div>
				<button class="btn btn-primary btn-lightblue" v-if="activeVideo._id != video._id"
					v-on:click="updateActiveVideo(video._id)">Make Active</button>
          <button class="btn btn-primary btn-red" v-on:click="deleteVideo(video._id)">Delete</button>
        </div>
			</li>

      <li v-if="!isVideos" class="spaceBetween">
        <i>It doesn't look like you've added any videos yet.</i>
        <div>
          <button @click="updateRoute('upload')" class="btn btn-primary">Upload a video</button>
        </div>
			</li>

		</ul>
  </div>
</div>
</template>

<script>
	import { mapGetters, mapActions, mapMutations } from 'vuex'

  export default {
		computed: {
			...mapGetters([
				'videos',
				'activeVideo',
			]),
      isVideos() {
        return this.videos.length == 0
               ? false : true
      },
		},
		methods: {
			...mapActions([
				'updateActiveVideo',
        'deleteVideo',
			]),
      ...mapMutations([
        'updateRoute',
      ])
		},
  };
</script>
