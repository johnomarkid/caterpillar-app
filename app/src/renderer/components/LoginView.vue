<style>

.input-margin{
  padding: 10px;
  width: 250px;
}

.card-small{
  width: 100px;
  margin: 0 auto;
  margin-top: 80px;
}

.btn-100{
  width: 270px;
}

</style>

<template>
  <div class="page">
    <loading-view v-if="isLoading"></loading-view>

    <div class="card card-small">
      <h2 v-if="isRegistering">Create Account</h2>
      <h2 v-else>Sign In</h2>
      <br>

      <div class="cell" v-if="isRegistering">
        <div>
          <input v-model="email" class="input input-margin" placeholder="Email"></input>
          <br><br>
          <input v-model="password" class="input input-margin" type="password" placeholder="Password"></input>
          <br><br>
          <button class="btn btn-primary btn-100" v-on:click="registerUser">Create Account</button>
          <br><br>
          <a @click="isRegistering = false">Cancel</a>
        </div>
      </div>

      <div class="cell" v-else>
        <div>
          <input v-model="email" class="input input-margin" placeholder="Email"></input>
          <br><br>
          <input v-model="password" class="input input-margin" type="password" placeholder="Password"></input>
          <br><br>
          <button class="btn btn-primary btn-100" v-on:click="loginUser">Sign In</button>
          <br><br>
          <!-- JOHN: this is the forgot password link -->
          <a href="#" @click="resetPasswordClicked">Forgot password?</a>
          <br><br>
          <div class="row row-center">
            <p>No account yet?</p>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
            <button class="btn btn-primary btn-invert" @click="isRegistering = true">Create Account</button>
          </div>
      </div>
    </div>
  </div>

    <div v-if="error">
      <br>
      <p style="width:400px; margin: 0 auto; color:red; border: 1px dashed red; border-radius: 3px; padding: 10px;">{{ error }}</p>
    </div>

  </div>
</div>
</template>

<script>
  const {shell} = require('electron')
  import { mapActions } from 'vuex'
  import firebaseInstance from '../firebase';
  const firebase = firebaseInstance.firebase;
  import LoadingView from './LoadingView'

  export default {
    name: 'LoginView',
    components: {
      LoadingView,
    },
    data() {
      return {
        email: null,
        password: null,
        error: null,
        isLoading: false,
        isRegistering: false,
      }
    },
    methods: {
      ...mapActions([
        'fetchActiveState'
      ]),
      resetPasswordClicked() {
        shell.openExternal('https://caterpillarapp.tv/password-reset')
      },
      registerUser() {
        this.$data.isLoading = true;
        const email = this.$data.email;
        const password = this.$data.password;
        if (!email || !password) {
          this.$data.error = "The email and password fields cannot be empty."
          this.$data.isLoading = false;
          return
        }

        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((user) => {
            return user.sendEmailVerification()
          })
          .then((res) => {
            var data = JSON.stringify([
              {
                "email": email
              },
            ]);
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function () {
              if (this.readyState === this.DONE) {
                console.log(this.responseText);
              }
            });

            xhr.open("POST", "https://api.sendgrid.com/v3/contactdb/recipients");
            xhr.setRequestHeader("authorization", "Bearer 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");
            xhr.setRequestHeader("content-type", "application/json");
            xhr.send(data);
            
            this.$store.dispatch('fetchActiveState')
          })
          .catch((err) => {
            this.$data.error = err.message
            console.log('ERROR - register: ', err)
            this.$data.isLoading = false;
          })
      },
      loginUser() {
        this.$data.isLoading = true;
        const email = this.$data.email;
        const password = this.$data.password;
        if (!email || !password) {
          console.log('show that they need these fields')
          this.$data.error = "The email and password fields cannot be empty."
          this.$data.isLoading = false;
          return
        }

        //this.$store.commit('updateRoute', 'loading');
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then(() => {
            this.$store.dispatch('fetchActiveState')
          })
          .catch((err) => {
            //this.$store.commit('updateRoute', 'login');
            firebase.auth().signOut();
            this.$data.error = err.message;
            console.log('ERROR - login: ', err);
            this.$data.isLoading = false;
          })
      },
    },
  };
</script>
