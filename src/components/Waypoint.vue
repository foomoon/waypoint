
<template>
  <div>
    <v-card 
      id="wpt-tooltip" 
      role="tooltip" 
      width="400" 
      class="mx-auto mt-5 elevation-20 wpt-tooltip v-fade"
      v-show="show">
      <!-- tooltip arrow -->
      <div id="arrow" data-popper-arrow></div>
      <!-- tooltip title -->
      <v-card-title v-html="wpTooltipTitle"></v-card-title>
      <!-- tooltip text -->
      <v-card-text v-html="wpTooltipText"></v-card-text>

      <v-card-text>
        <v-alert
          v-model="alert"
          border="left"
          close-text="Close Alert"
          color="deep-purple accent-4"
          dark
          dismissible
          transition="scale-transition"
          v-html="alertText"
          class="overflow-y-auto"
          style="max-height: 200px; font-size: 8px; line-height: 10px"
        ></v-alert>
      </v-card-text>

      
      
      <v-divider></v-divider>
      <!-- tooltip navigation controls -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn 
          v-show="currentStep > 0"
          color="info" 
          @click="prev()">
          prev
        </v-btn>
        <v-btn 
          v-show="currentStep < steps.length-1"
          color="info" 
          @click="next()">
          next
        </v-btn>
        <v-btn 
        v-show="!(steps[boundedStep].modal || false)"
        color="error" 
        @click="quit()">
        quit
        </v-btn>
      </v-card-actions>
      
    </v-card>

    <div 
      id="tourOverlay" 
      class="wpt-highlight wp-hidden"
      v-html="wpHighlightText">
    </div>
  </div>

</template>

<script>
  import { createPopper } from '@popperjs/core/';

  // import { createPopper } from '@popperjs/core/lib/popper-lite.js';
  // import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow.js';
  // import flip from '@popperjs/core/lib/modifiers/flip.js';

  export default {
    name: 'Waypoint',
    data: () => ({
      steps: steps,
      currentStep: -1,
      tooltip: null,
      show: false,
      alert: false,
      alertText: "",
    }),
    watch: {
      currentStep: {
        handler: function() {
          // hide a tooltip before moving next
          this.show = false
          // since tooltip has a css fade-out transition for 300ms, wait until it's gone
          // before updating the tooltip appearance 
          setTimeout(function(){
            this.tour();
          }.bind(this), 300);
        },
        // deep: true
      }
    },
    computed: {
      theme: function() {
        return this.$vuetify.theme.isDark ? "Light" : "Dark"
      },
      wpTooltipText: function() {
        const tip = steps[this.boundedStep].tooltip || {}
        return tip.content || "Default Text"
      },
      wpTooltipTitle: function() {
        const tip = steps[this.boundedStep].tooltip || {}
        return tip.title || "Default Title"
      },
      wpHighlightText: function() {
        return steps[this.boundedStep].content || ""
      },
      boundedStep: function() {
        let s = this.currentStep
        s = s > -1 ? s : 0
        s = s < steps.length ? s : 0
        return s
      }
    },
    
    methods: {
    
      toggleTheme: function() {
        this.$vuetify.theme.isDark = !this.$vuetify.theme.isDark
      },

      highlight: function(target) {
        let tourOverlay = document.querySelector("#tourOverlay")

        let rect = target.getBoundingClientRect()
        let scrollTop = window.pageYOffset

        let pad = 4 // px
        tourOverlay.style.cssText += "; top: " + (scrollTop + rect.top - pad) + "px; left: " + (rect.left - pad) + "px; width: " + (rect.width + 2 * pad) + "px; height: " + (rect.height + 2 * pad) + "px"

        tourOverlay.focus()

      },
      
      tourInSession: function() {
        return this.currentStep >= 0 && this.currentStep < this.steps.length
      },

      next: function() {
        this.currentStep++
      },

      prev: function() {
        this.currentStep--
      },

      quit: function() {
        // Allow quit if not modal or if is last step
        if (!(this.steps[this.boundedStep].modal || false) || this.currentStep == this.steps.length-1) {
          this.currentStep = -1
        }
      },

      tour: function(start) {

        if (start === 'start') {
          this.currentStep = 0
        }

        const tourOverlay = document.querySelector(".wpt-highlight")

        if (this.currentStep >= 0 && this.currentStep <= this.steps.length - 1) {

          let target = document.querySelector(this.steps[this.currentStep].target)
          
          tourOverlay.classList.remove("wpt-hidden")
          
          //this.show = false

          this.$vuetify.goTo(target, {
            duration: 500,
            offset: 10,
            easing: 'easeInOutCubic',
          })

          this.highlight(target)

          // evaluate onStepChange event handler
          let onStepChange = this.steps[this.currentStep].handler
          if (typeof(onStepChange) === 'function') {
            onStepChange = onStepChange.bind(this)
            onStepChange()
          }

        } else {
          tourOverlay.classList.add("wpt-hidden")
          this.show = false
        }

      }
    },

    mounted() {
      window.addEventListener('hashchange', onHashChange.bind(this))
      window.addEventListener("mouseup", onClick.bind(this))
      window.addEventListener("keydown", onKeyDown.bind(this))
      window.addEventListener("resize", onResize.bind(this))

      const overlay = document.querySelector('.wpt-highlight');
      const tooltip = document.querySelector('.wpt-tooltip');
      
      // Necessary to attache overlay to root for positioning
      document.body.appendChild(overlay)

      this.tooltip = createPopper(overlay, tooltip, {
        //modifiers: [preventOverflow, flip],
      });
      
      overlay.addEventListener(getTransitionEndEventName(), onTooltipFinishMoving.bind(this), {once: true});
      
      this.tour('start')
    }
  }



  // handle routing
  function onHashChange() {
    let route = window.location.hash.replace(/#\/?/, '')
    const isRoute = (element) => element.target === route
    let currentStepSelected = this.steps.findIndex(isRoute)

    if (currentStepSelected >= 0) {
      this.currentStep = currentStepSelected
    }
    
    window.location.hash = ''
  }

  function onKeyDown(e) {

    e = e || window.event;
    // Arrow or escape wil tour is in session
    if (this.tourInSession()) {
      console.warn('Propegation of some keys prevented while waypoint is active')
      switch (e.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault()
        this.prev()
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault()
        this.next()
        break;
      case 'Escape':
        e.preventDefault()
        this.quit()
        break;
      default:
      }
    }
    
  }

  function onClick(e) {
    // Click outside while tour is in session
    let tooltip = e.target.closest(".wpt-tooltip")
    let target = e.target.closest(".wpt-highlight")
    if (!tooltip && !target && this.tourInSession) {
      this.quit()
    }
  }

  function onResize() {
    // Make sure highlight stays with target if it changes
    if (this.tourInSession) {
      this.tour()
    }
  }

  function onTooltipFinishMoving(e) {
  
    // Fire after tooltip has stopped moving
    setTimeout(function() {
      console.log(e.propertyName)
      // Cancel tooltip if not defined in props
      if (this.currentStep >=0 && typeof(this.steps[this.currentStep].tooltip) !== 'undefined') {
        this.show = true
        this.tooltip.update()
      }
      e.target.addEventListener(getTransitionEndEventName(), onTooltipFinishMoving.bind(this), {once: true})
    }.bind(this), 500)

  }

  function getTransitionEndEventName() {
    var transitions = {
        "transition"      : "transitionend",
        "OTransition"     : "oTransitionEnd",
        "MozTransition"   : "transitionend",
        "WebkitTransition": "webkitTransitionEnd"
    }
    let bodyStyle = document.body.style;
    for(let transition in transitions) {
        if(bodyStyle[transition] != undefined) {
            return transitions[transition];
        } 
    }
  }



  var steps = [
    {
      target: "#step1",
      tooltip: {
        title: "Welcome to Waypoint!",
        content: "This is an early development <b>tour</b> component for <a href='https://vuejs.org'>Vue.js</a> and themed with <a href='https://vuetifyjs.com/en/'>Vuetify.js</a>. Waypoint is designed to be beautiful, performant, lightweight and declarative.  It should be flexible enough to cover a wide variety of needs.",
      },
      modal: true,
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
        content: "Waypoint has a custom event hook.  It was used to trigger the theme change two steps ago.  The event hook is bound to the app instance which is very convenient when you need to call <b><i>this</i></b>."
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


<style >
  /* this is the magic sauce */
  .wpt-highlight {
    position: absolute;
    border: 1px solid rgb(255, 255, 255, 1);
    z-index: 10001;
    padding: 10px;
    box-shadow:
      0 0 3px 6px rgb(255, 255, 255, 0.2),
      0 0 0 99999px rgba(0, 0, 0, 0.6);
    border-radius: 4px;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    transition:
      top 0.3s, 
      left 0.3s, 
      width 0.3s, 
      height 0.3s;
  }

  .wpt-hidden {
    visibility: hidden;
    pointer-events: none;
  }

  .wpt-tooltip {
    z-index: 10003;
    /* margin: 15px !important; */
  }

  .wpt-tooltip[data-popper-reference-hidden] {
    visibility: hidden;
    pointer-events: none;
  }


  /* popper.js arrow */
  div[data-popper-arrow],
  div[data-popper-arrow]::before {
    position: absolute;
    width: 8px;
    height: 8px;
    /* z-index: 10002; */
    background: inherit;
    
  }

  div[data-popper-arrow]::before {
    content: '';
    transform: rotate(45deg);
    /* box-shadow: 0 0 1px 1px rgb(0, 0, 255); */
  }

  .wpt-tooltip[data-popper-placement^='top'] > div[data-popper-arrow] {
    bottom: -4px;
  /*   box-shadow: 0 0 1px 1px rgb(0, 0, 255);
    */}

  .wpt-tooltip[data-popper-placement^='bottom'] > div[data-popper-arrow] {
    top: -4px;
  }

  .wpt-tooltip[data-popper-placement^='left'] > div[data-popper-arrow] {
    right: -4px;
  }

  .wpt-tooltip[data-popper-placement^='right'] > div[data-popper-arrow] {
    left: -4px;
  }


  /* fix for transition so popper.js renders correctly */
  .v-fade {
    display: inherit !important; /* override v-show display: none */
    transition: opacity 0.3s;
  }

  .v-fade[style*="display: none;"] {
    opacity: 0;
    pointer-events: none; /* disable user interaction */
    user-select: none; /* disable user selection */
  }

  

</style>