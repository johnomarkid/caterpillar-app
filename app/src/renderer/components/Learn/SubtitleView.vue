<style>
.sub-word:hover {
    background-color: blue;
}
.sub-word::selection {
    background-color: blue;
}

.translate-body {
    color: var(--dark);
    font-family: 'Quicksand', sans-serif;
    font-size: 1em;
}

.translate-header {
    color: var(--dark);
}

</style>

<template>
    <div>
        <modal-container v-if="isTranslating">
            <div class="row" slot="header">
                <h3 class="translate-header">Translate to: &nbsp;</h3>
                <div class="txt-gray">
                    <select class="styled-select" v-on:click="findSupportedLanguages" v-on:change="changeTargetLanguage">
                        <option v-bind:value="targetLanguage.language">{{ targetLanguage.name }}</option>
                        <option v-for="lang in availableLanguages"
                        v-bind:value="lang.language"
                        >{{ lang.name }}</option>
                    </select>
                </div>
            </div>

            <div slot="body" class="translate-body">
                <h3 class="txt-lightblue">Selected:</h3>
                  <h3 class="txt-subtitle">" {{ phrase }}"</h3><br>
                <h3 class="txt-lightblue">Result:</h3>
                  <h1>{{ translatedText }}</h1><br>
            </div>

            <div class="row row-center" slot="footer">
                <button class="btn btn-primary btn-gray btn-wide" v-on:click="cancelTranslate">Done</button>
            </div>
        </modal-container>
        <p class="txt-subtitle" v-on:mouseup="textSelected">
            <span v-on:click="spanSelected" class="sub-word" v-for="word in words">
                  {{ word }} </span>
        </p>
    </div>
</template>

<script>

    import ModalContainer from '../ModalContainer'

    export default {
        props: ['subtitle'],
        components: {
            ModalContainer
        },
        data() {
            return {
                isTranslating: false,
                phrase: null,
                translatedText: null,
                targetLanguage: {
                    language: 'en',
                    name: 'English'
                },
                availableLanguages: [{
                    language: 'en',
                    name: 'English'
                }]
            }
        },
        computed: {
            words() {
                return this.subtitle.split(' ')
            },
        },
        methods: {
            translate() {
                const apikey = 'AIzaSyAu7Ar8wsI4-0iUKPbpaV8Fa5IShjOxwGc'
                const url = 'https://translation.googleapis.com/language/translate/v2'
                const params = {
                    key: apikey,
                    target: this.$data.targetLanguage.language,
                    q: this.$data.phrase
                }
                this.$http.get(url, { params: params }).then(response => {
                    // get body data
                    this.$data.translatedText = response.body.data.translations[0].translatedText;

                }, response => {
                    // error callback
                    console.log('ERR: ', response)
                });
            },
            textSelected() {
                const text = window.getSelection().toString();
                if (text.length > 0) {
                    this.$data.phrase = text;
                    this.$data.isTranslating = true;
                    this.translate();
                }
            },
            spanSelected(event) {
                this.$data.phrase = event.target.outerText;
                this.$data.isTranslating = true;
                this.translate();
            },
            cancelTranslate() {
                this.$data.isTranslating = false;
                this.$data.phrase = null;
                this.$data.translatedText = null;
            },
            findSupportedLanguages() {
                // detect lang
                // find supported
                const url = 'https://translation.googleapis.com/language/translate/v2/detect'
                const apikey = 'AIzaSyAu7Ar8wsI4-0iUKPbpaV8Fa5IShjOxwGc'
                this.$http.get(url, {
                    params: {
                        key: apikey,
                        q: this.$data.phrase
                    }
                })
                    .then(response => {
                        const detectedLang = response.body.data.detections[0][0].language
                        const surl = 'https://translation.googleapis.com/language/translate/v2/languages'
                        const params = {
                            key: apikey,
                            target: detectedLang
                        }
                        this.$http.get(surl, { params: params }).then(response => {

                            // get body data
                            this.$data.availableLanguages = response.body.data.languages

                        }, response => {
                            // error callback
                            console.log('ERR: ', response)
                        });

                    }, response => {
                        // error callback
                        console.log('ERR: ', response)
                    });
            },
            changeTargetLanguage(e) {
                const lang = e.target.value;
                const name = e.target.childNodes[e.target.selectedIndex + 1].innerText;
                this.$data.targetLanguage.language = lang;
                this.$data.targetLanguage.name = name;
                this.translate();

            }
        }
    };
</script>
