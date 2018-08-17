<style>
  @import url(https://fonts.googleapis.com/css?family=Lato:300);
  @import url(https://fonts.googleapis.com/css?family=Quicksand:400,500,700);
  @import url(https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,700,800);

  :root{
    --blue: #368BFF;
    --darkblue: #166589;
    --lightblue: #36C1FF;
    --paleblue: #EAF3FF;
    --red: #FF5D4A;
    --magenta: #c4069e;
    --green: #05D329;
    --dark: #31393F;
    --darkest: #131314;
    --mediumgray: #B8C9D1;
    --lightgray: #E8EDF0;
    --palegray: #EAF0F4;
  }

  * {
    margin: 0;
    padding: 0;
  }

  html,
  body { height: 100%; }

  body {
    align-items: center;
    background: var(--palegray);
    background-position: center;
    display: flex;
    font-family: 'Quicksand', sans-serif;
    justify-content: center;
    text-align: center;
    font-size: 14px;
    color: var(--dark);
  }

	ul {
		list-style-type: none;
	}

  a{
    text-decoration: none;
    cursor: pointer;
  }

  /*-------Fonts-------*/

  h2{
    padding: 2%;
    font-size: 3em;
    font-weight: 800;
    font-family: 'Open Sans';
    color: var(--mediumgray);
  }

  .txt-cardHeader{
    font-size: 2em;
    padding-right: 10px;
  }

  .txt-subtitle{
    font-size: 1.4em;
    font-style: italic;
    padding-top: .5em;
    padding-bottom: .5em;
  }

  .txt--l{
    font-size: 1.4em;
    padding-top: .5em;
    padding-bottom: .5em;
  }

  .txt-answer{
    font-size: 1.1em;
    padding-top: .5em;
  }

  .txt-instructions{
    font-family: 'Open Sans', sans-serif;
    font-weight: 200;
    letter-spacing: .5px;
    text-align: left;
    color: var(--palegray);
  }

  .txt-blue{
    color: var(--blue);
  }

  .txt-lightblue{
    color: var(--lightblue);
  }

  .txt--left{
    text-align: left;
    white-space: nowrap;
  }

  .txt--bold{
    font-weight: 500;
    letter-spacing: 1.5px;
  }

  .txt-thinGray{
    font-size: 3em;
    font-weight: 100;
    color: var(--mediumgray);
    margin-top: 200px;
  }

  .txt-gray{
    color: var(--mediumgray);
  }

  .txt-white{
    color: white;
  }

  /*-------Layout/body-------*/

  .page{
    padding-left: 5%;
    padding-right: 5%;
  }

  .spaceBetween{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .row-gray{
    background: var(--palegray);
    margin-bottom: 15px;
  }

  .row{
    display: flex;
  }

  .row-wide{
    justify-content: space-between;
    align-items: center;
    padding-right: 1em;
    padding-left: 1em;
  }

  .row-center{
    justify-content: center;
    align-items: center;
  }

  .row-right{
    justify-content: flex-end;
  }

  .row-left{
    justify-content: flex-start;
  }

  .cell{
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .well--s{
    padding: 8px;
  }

  /*-------Buttons-------*/

  .btn{
    border-style: none;
    font-family: 'Quicksand', sans-serif;
    font-weight: 500;
    font-size: .85em;
    border-radius: 3px;
    min-width: 70px;
    cursor: pointer;
    white-space: nowrap;
    outline: 0;
    transition: .2s ease;
    box-shadow: 0 5px 15px rgba(0,0,0,.07);
    letter-spacing: 1.2px;
  }

  .btn:hover{
    box-shadow: 0 15px 35px rgba(50,50,93,.1);
    opacity: 0.9;
  }

  .btn-nav{
    padding: 9px;
    margin: 8px auto;
    background: var(--palegray);
    color: var(--dark);
    width: 80px;
  }

  .btn-nav:hover{
    background: var(--dark);
    opacity: 1;
    color: white;
  }

  .btn-nav-active {
    background: var(--dark);
    opacity: 1;
    color: white;
  }

  .btn-nav:active, .btn-red:active, .btn-green:active, .btn-primary:active{
    opacity: 0.8;
  }

  .btn-primary {
    padding: 10px;
    color: white;
    background: var(--blue);
		position: relative;
		overflow: hidden;
  }

  .btn-primary input {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0.001;
	}

  .btn-invert{
    border: 1px solid var(--blue);
    color: var(--blue);
    background: transparent;
  }

  .btn-white{
    border: 1px solid white;
    color: 1px solid white;
    background: transparent;
  }

  .btn-round{
    border-radius: 20px;
    padding-left: 15px;
    padding-right: 15px;
  }

  .btn-wide{
    width: 150px;
  }

  .btn-short{
    padding: 5px;
  }

  .btn-margin{
    margin-right: 5px;
    margin-left: 5px;
  }

  .btn-lightblue{
    background-color: var(--lightblue);
  }

  .btn-gray{
    background-color: var(--mediumgray);
    color: var(--dark);
  }

  .btn-right{
    justify-content: flex-end;
  }

  .btn-red{
    background: var(--red);
  }

  .btn-green{
    background-color: #05D329;
  }

  .btn-magenta{
    background: var(--magenta);
  }

  .btn-hollow{
    border: 1px solid white;
    background-color: transparent;
    padding: 2px;
    font-size: 1.3em;
  }

  .btn-hollow:hover{
    border: 1px solid var(--lightblue);
    color: var(--lightblue);
  }

  .img-icon{
    width: 22px;
    height: 22px;
    margin-right: 10px;
  }

  /*-------Cards-------*/

  .card{
    background: #FAFAFA;
    box-shadow: 0 5px 15px rgba(0,0,0,.07);
    border: 1px solid var(--paleblue);
    border-radius: 3px;
    padding: 20px;
    min-height: 20px;
    min-width: 400px;
  }

  .card-learn {
  	width: 550px;
  	padding: 0;
  	padding-bottom: 13px;
  	margin: 0 auto;
  	margin-top: 20px;
  }

  .card-alert{
    padding-bottom: 0px;
  }

  .card-upload{
    max-height: 20px;
  }

  .card-light{
    border: 1px solid var(--mediumgray);
    width: 300px;
    margin: 0 auto;
    padding: 10px;
    border-radius: 4px;
  }

  .header-grade{
    background: var(--dark);
    border-radius: 3px 3px 0px 0px;
    padding: 10px;
    padding-left: 20px;
    margin-bottom: 13px;
    display: flex;
    flex-direction: column;
    text-align: left;
    color: white;
  }

  .header-learn{
    background: var(--dark);
    border-radius: 3px 3px 0px 0px;
    padding: 10px;
    display: flex;
    align-items: center;
    text-align: left;
    color: white;
  }

  .header-alert{
    background: var(--dark);
    border-radius: 3px 3px 0px 0px;
    padding: 10px;
    padding-left: 20px;
    padding-right: 20px;
    flex-direction: column;
    color: white;
  }

  /*-------Input-------*/

  .input{
    font-family: 'Quicksand', sans-serif;
    font-size: 1.2em;
    border-radius: 3px;
    font-weight: 500;
    letter-spacing: .2px;
    border-style: none;
    border: 1px solid var(--mediumgray);
    padding: 1%;
  }

  .textarea{
    resize: none;
    border: 1px solid #E4E4E4;
    font-family: 'Open Sans', sans-serif;
    font-size: 1.5em;
    margin: 10px;
    padding: 5px;
    width: 510px;
    height: 65px;
  }

	#root {
		height: 100%;
		width: 100%;
		display: flex;
	}

	#nav {
		width: 100px;
    background-color: var(--mediumgray);
	}

	#base-app {
		height: 100%;
		width: 100%;
    overflow: hidden;
	}
</style>

<template>
  <div id="root">
		<div id="nav">
			<ul>
        <li><button class="btn btn-nav" v-bind:class="[currentRoute == 'learn' ? 'btn-nav-active' : '']"
            v-on:click="updateRoute('learn')"><img src="./imgs/icn-learn.png"><br>Learn</button></li>
				<li><button class="btn btn-nav" v-bind:class="[currentRoute == 'library' ? 'btn-nav-active' : '']"
            v-on:click="updateRoute('library')"><img src="./imgs/icn-library.png"><br>Library</button></li>
				<li><button class="btn btn-nav" v-bind:class="[currentRoute == 'upload' ? 'btn-nav-active' : '']"
            v-on:click="updateRoute('upload')"><img src="./imgs/icn-upload.png"><br>Upload</button></li>
				<li><button class="btn btn-nav" v-bind:class="[currentRoute == 'discover' ? 'btn-nav-active' : '']"
            v-on:click="updateRoute('discover')"><img src="./imgs/icn-discover.png"><br>Discover</button></li>
				<li><button class="btn btn-nav" v-bind:class="[currentRoute == 'user' ? 'btn-nav-active' : '']"
            v-on:click="updateRoute('user')"><img src="./imgs/icn-user.png"><br>User</button></li>
			</ul>
		</div>
		<div id="base-app">

      <div v-if="!isPremium" class="row row-center well--s" style="background-color:var(--magenta);">
        <p class="txt-white">Upgrade to the full version to unlock all features, receive all future updates, and remove this banner</p>&nbsp&nbsp
        <button class="btn btn-primary btn-white btn-short" @click="upgradeClicked">Upgrade</button>
      </div>

			<component v-bind:is="currentRoute">
			</component>
		</div>
  </div>

</template>

<script>
  import Learn from './components/LearnView';
  import Library from './components/LibraryView';
  import Upload from './components/UploadView';
  import LoadingView from './components/LoadingView';
	import LoginView from './components/LoginView';
  import DiscoverView from './components/DiscoverView';
  import UserView from './components/UserView';
	import { mapGetters, mapMutations, mapActions } from 'vuex';

  export default {
    components: {
      loading: LoadingView,
      learn: Learn,
      library: Library,
      upload: Upload,
			login: LoginView,
      discover: DiscoverView,
      user: UserView,
    },
    computed: {
      currentRoute() {
        return this.$store.state.route
      },
      isPremium() {
        return this.$store.state.isPremium
      }
    },
    methods: {
      ...mapMutations([
        'updateRoute'
      ]),
      ...mapActions([
        'upgradeClicked'
      ])
    },
  };

</script>
