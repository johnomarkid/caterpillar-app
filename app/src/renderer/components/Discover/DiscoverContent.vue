<style>
  .content-title{
    font-size: 1em;
    color: var(--dark);
    text-align: left;
  }

  .card-discover{
    width: 100px;
    min-width: 220px;
    min-height: 300px;
    padding: 0;
    margin: 10px;
  }

  .temp{
    background-size: cover;
    height: 130px;
    display: flex;
    border-radius: 3px 3px 0px 0px;
  }

  .align-vertical{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 120px;
  }

  .btn-med{
    min-width: 90px;
  }

  .row-dark{
    background-color: var(--darkest);
    opacity: .8;
    color: white;
    bottom: 0;
  }

</style>

<template>
  <div class="card card-discover">
    <div class="temp" v-bind:style="{ backgroundImage: 'url(' + content.thumbnail + ')' }">
    </div>

    <div class="row-gray row-dark">
      <p>{{ content.language }}</p>
    </div>

    <div class="row-wide align-vertical">
      <div>
        <h2 class="content-title">{{ content.title }}</h2>
      </div>
      <div>
        <a v-bind:href="content.video" download><button class="btn btn-primary btn-lightblue btn-med">↓ Video</button></a>
        <a v-bind:href="content.subtitle" download><button class="btn btn-primary btn-gray">↓ Subtitle</button></a>
      </div>
    </div>

  </div>
</template>

<script>

  export default {
    created() { console.log('item: ', this.content.thumbnail) },
    name: 'DiscoverContent',
    props: ['content'],
  };

</script>
