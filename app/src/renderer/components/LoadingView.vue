<style>
.loading-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: table;
    background-color: rgba(234,240,244,0.91);
  }

.circle{
  position:absolute;
  top:50%; left:50%;
  margin-top:-50px; margin-left:-100px;
  width: 200px; height: 100px;
  transform:translateZ(0);
}

.particle{
  background: #36C1FF;
  border-radius:5px; /* variante 100% o 5px */
  position:absolute;
  margin-left:90px; margin-top:40px;
  width: 20px; height: 20px;
  animation: rotar_n1 3s linear infinite;
}

.particle:nth-child(1){
  background: #36C1FF;
  box-shadow:0px -10px 80px #fff;
  border-radius:100%;
  animation-delay: 5ms;
}

.particle:nth-child(2){
  animation-delay: 50ms;
}

.particle:nth-child(3){
  animation-delay: 100ms;
}

.particle:nth-child(4){
  animation-delay: 150ms;
}

.particle:nth-child(5){
  animation-delay: 200ms;
}

.particle:nth-child(6){
  animation-delay: 250ms;
}

.particle:nth-child(7){
  animation-delay: 300ms;
}

.particle:nth-child(8){
  animation-delay: 350ms;
}

.particle:nth-child(9){
  animation-delay: 400ms;
}

.particle:nth-child(10){
  border-radius:100%;
  animation-delay: 450ms;
}

@keyframes rotar_n1{
  0%{
    transform-origin:50px; /* valor - */
  }
  50%{
    background: #368BFF;
    transform-origin:50px;
    transform:rotateZ(360deg);
  }
  51%{
    transform-origin:-30px;
  }
  100%{
    transform-origin:-30px; /* valor + */
  }
}

</style>

<template>

  <div class="loading-mask">
    <div>
    <!-- <h1 class="txt-thinGray">Welcome to Caterpillar...</h1> -->
    <div class="circle">
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
    </div>
  </div>
  </div>

</template>

<script>
export default {
  name: 'LoadingView'
}

</script>
