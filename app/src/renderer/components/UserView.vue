<style>

</style>

<template>
    <div class="page">
        <div class="card card-small">
            <h2>Your Account</h2>
            <br>
            <div class="cell">
                <p class="txt--l"><b>User:</b> {{ userEmail }}</p>
            </div><br></br>
            <button class="btn btn-primary btn-100" @click="signout">Sign Out</button>
        </div>



        <br><br>
        <div class="card-light">
      		<p>Not sure where to start?</p><br>
      		<a target="_blank" href="http://caterpillar.helpscoutdocs.com/article/30-getting-started"><button class="btn btn-primary btn-round btn-green">View introduction tutorial</button></a>
      	</div>

    </div>
</template>

<script>
    const {shell} = require('electron')
    import { mapActions } from 'vuex'
    import firebaseInstance from '../firebase';
    const firebase = firebaseInstance.firebase;

    export default {
        name: 'UserView',
        computed: {
            userEmail() {
                return firebase.auth().currentUser.email
            },
            showPremiumUpgrade() {
                return this.$store.state.ui.isPremiumBlockModal
            },
        },
        methods: {
            ...mapActions([
                'upgradeClicked',
            ]),
            signout() {
                firebase.auth().signOut();
            },
        },
    };
</script>
