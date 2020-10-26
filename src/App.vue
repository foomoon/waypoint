<template>
  <v-app>
    <!-- app bar -->
      <v-app-bar app color="primary" dark ref="appBar">
        <div class="d-flex align-center">
            <v-icon 
              color="blue lighten-2" 
              large class="wp-slant">
              mdi-map-marker-outline
            </v-icon> 
            <v-icon 
              color="blue lighten-3" 
              large 
              class="wpt-shift wpt-slant">
              mdi-map-marker-outline
            </v-icon>
            <h2 
              color="blue lighten-2" 
              class="font-italic font-weight-light">
              Waypoint
            </h2>
        </div>
        
        <v-spacer></v-spacer>

        <v-btn href="#/#step1" text>
          <span class="mr-2">Start Tour</span>
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
      </v-app-bar>

    <v-main>
 
      <Skeleton/>
      <Waypoint id="wpt-component" :steps="steps" :stepNum="num" @next="exampleHook"></Waypoint>

    </v-main>
  </v-app>
</template>

<script>

import Skeleton from './components/Skeleton';
import Waypoint from './components/Waypoint';

export default {
  name: 'App',

  components: {
    Skeleton,
    Waypoint,
  },

  data: () => ({
    steps: steps,
    num: -1
  }),

  methods: {
    exampleHook: function(wpt) {
      console.log(wpt.stepCount + " is current step count")
    }
  },

  mounted() {
    window.addEventListener('hashchange', onHashChange.bind(this))
    this.num = 0
  }
};


  // handle routing
  function onHashChange() {
    console.log(this.num)
    let route = window.location.hash.replace(/#\/?/, '')
    const isRoute = (element) => element.target === route
    let stepCountSelected = this.steps.findIndex(isRoute)

    if (stepCountSelected >= 0) {
      this.num = stepCountSelected
    }

    //window.location.hash = ''
  }

  var steps = [
    {
      target: "#step1",
      tooltip: {
        title: "Welcome to Waypoint!",
        content: "This is an early development <b>tour</b> component for <a href='https://vuejs.org'>Vue.js</a> and themed with <a href='https://vuetifyjs.com/en/'>Vuetify.js</a>. Waypoint is designed to be beautiful, performant, lightweight and declarative.  It should be flexible enough to cover a wide variety of needs.",
      },
      modal: false,
    },
    
    {
      target: "#step2",
      tooltip: {
        title: "Arrowed",
        content: "Navigation can be acheived through the buttons below, as you have no doubt already determined.  Did you know you can alternatively use your arrow keys?",
      },
      modal: true,
    },
    
    {
      target: "#step3",
      tooltip: {
        title: "Target Acquired",
        content: "This tooltip takes advantage of the popular 'popper.js' library for positioning and can be easily be customized in an html template. Targets are defined using html selector syntax",
      },
      modal: true,
    },
    
    {
      target: "#step0",
      content: "You can also asign content to the highlighted target if you prefer. (Right arrow for 'Next')",
      modal: true,
    },
    
    {
      target: ".v-skeleton-loader__table-tfoot",
      tooltip: {
        title: "Works with Themes",
        content: "Yep, Waypoint looks great in both light and dark themes!"
      },
      modal: true,
      handler: function () {
        this.toggleTheme()
      }
    },
    
    {
      target: ".v-skeleton-loader__avatar",
      tooltip: {
        title: "Supports HTML",
        content: "<img src='https://upload.wikimedia.org/wikipedia/en/8/89/GordonShumway.png'  style='display: block; margin-left: auto; margin-right: auto; width: 70%; box-shadow:0 0 3px 3px rgb(255, 255, 255, 0.2)' /img><br>A keen eye may have noticed tooltips support HTML, but did you know they also support life on other planets? "
      },
      modal: true,
    },
    
    {
      target: ".v-skeleton-loader__list-item-avatar",
      tooltip: {
        title: "Events",
        content: "Waypoint has a custom event hook.  It was used to trigger the theme change two steps ago.  The event hook is bound to the Waypoint component instance which is very convenient when you need to call Waypoint's <b><i>this</i></b> object."
      },
      modal: true,
      handler: function () {
        this.alert = false
      }
    }, 
    
    {
      target: ".v-skeleton-loader__button",
      tooltip: {
        title: "Steps",
        content: "So how do you steer this thing?  A javascript object defines each of the steps in Waypoint.  Here is the beautiful mess used to script this tour:"
      },
      modal: true,
      handler: function () {
        alert("A Waypoint custom event hook triggered this alert")
        this.alertText = "<pre> " + JSON.stringify(this.steps, null, ' ') + "</pre>"
        this.alert = true
      }
    }, 
    
    {
      target: "#step1",
      tooltip: {
        title: "Modal",
        content: "All of the previous steps were set to 'modal' which has prevented you from exiting Waypoint.  You could click the 'quit' button now or press the 'escape' key to exit. But you know you want to find out more..."
      },
      handler: function () {
        this.alert = false
      }
    },
    {
      target: "#step4",
      tooltip: {
        title: "Routes",
        content: "You can programatically start/end waypoint but you can also use simple html href links that point to a target and Waypoint knows what to do!"
      }
    },
    {
    target: "#step5",
    tooltip: {
     title: "Impressed Yet?",
     content: "This was all acheived with less than 200 lines of javascript and just a few lines of html.  Sure there are dependencies and others have implimented similar libraries, but this one is mine and I happen to think it's easier to use and looks better than anything else out there"
    }
  },
]

</script>

<style>
  .wpt-slant {
    transform: rotate(5deg);
  }
  .wpt-shift {
    margin-left: -25px !important;
  }
</style>
