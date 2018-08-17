<style>

.txt-boldGray{
  font-family: 'Open Sans';
  font-weight: 900;
  font-size: 1.5em;
  color: var(--mediumgray);
}

.page-fill{
  width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5%;
}

.img-medium{
  width: 200px;
} 

.margin-bottom{
  margin-bottom: 50px;
}

</style>

<template>

<div class="page-fill">
    <img class="img-medium margin-bottom" src="./../../imgs/celebrate.svg">
    <p class="txt-boldGray">You've finished all the skills in this section for today. Move on to the next section, and check up here
    tomorrow to practice the skills you had trouble with.</p>
</div>

</template>

<script>
export default {
  name: 'FinishedSection',
}
</script>
