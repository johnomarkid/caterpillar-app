<style>
.learn-nav{
	background-color: var(--dark);
	box-shadow: 0 5px 15px rgba(0,0,0,.07);
}

/*-----Progress Bar-----*/

.progressBar{
	width: 100%;
	height: 10px;
	background: #131314;
}

.progressBar-i{
	width: 60%;
	height: 10px;
	z-index: 1;
	background: linear-gradient(123deg, var(--blue), var(--lightblue), #7191FA, var(--blue));
	background-size: 300%;
	transition: all 3s ease;
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
  <div class="learn-nav">

    <!-- JOHN: this is the new row including the dailyGoal -->
    <div class="row row-wide">
    <h2 class="txt--left txt--nav">{{ activeVideo.videoTitle }}</h2>
      <div class="row-wide row-right">
        <p class="txt-dailyGoal">Daily Goal</p>
        <p class="txt-dailyGoal txt-percentage">67%</h2>
      </div>
    </div>

    <!--  JOHN: this is the progress bar -->
    <div class="progressBar"><div class="progressBar-i"></div></div>
  </div>
</template>

<script>
	import { mapGetters } from 'vuex'

  export default {
    name: 'DailyGoal',
		methods: {
			...mapGetters([

			]),

		}
  };
</script>
