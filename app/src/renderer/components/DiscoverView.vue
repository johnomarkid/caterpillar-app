<style>
.discover-container {
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  width: 100%;
  overflow-x: hidden;
  height: 530px;
  border: 1px solid var(--mediumgray);
  border-radius: 4px;
}
</style>

<template>
    <div class="page">
      <div class="row row-wide">
        <h2 class="txt--left">Suggested Videos</h2>
        <a target="_blank" href="http://caterpillar.helpscoutdocs.com/article/8-where-do-i-get-video-files"><img class="img-icon" src="./../imgs/info.svg" /></a>
      </div>

            <div class="discover-container">
                <template v-for="item in suggestedContent">
                    <discover-content v-if="item != null" v-bind:content="item"></discover-content>
                </template>
            </div>

    </div>
</template>

<script>
    import DiscoverContent from './Discover/DiscoverContent';
    import DiscoverFirebaseInstance from '../firebaseDiscover';
    const firebase = DiscoverFirebaseInstance.firebase;

    export default {
        components: {
            DiscoverContent,
        },
        data() {
            return {
                suggestedContent: null,
            }
        },
        created() {
            this.fetchContent()
        },
        methods: {
            fetchContent() {
                firebase.database().ref().once('value')
                    .then((snapshot) => {
                        this.$data.suggestedContent = snapshot.val();
                    })
                    .catch((err) => {
                        console.log('error: ', err)
                    })
            }
        }
    };

</script>
