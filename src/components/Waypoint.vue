
<template>
  <div>
    <div>
      <v-card 
        id="wpt-tooltip"
        v-show="showTooltip"
        class="mx-auto mt-5 elevation-20 wpt-tooltip v-fade "
        style="margin-top:0px !important"
        width="400" >

        <!-- tooltip title -->
        <v-card-title v-html="wpTooltipTitle"></v-card-title>
        <!-- tooltip text -->
        <v-card-text v-html="wpTooltipText"></v-card-text>
        <!-- tooltip alert text -->
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
            v-show="stepCount > 0"
            color="info" 
            @click="prev()">
            prev
          </v-btn>
          <v-btn 
            v-show="stepCount < steps.length-1"
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
        <!-- tooltip arrow -->
        <div id="arrow" data-popper-arrow></div>
      </v-card>
    </div>

    <div 
      id="tourOverlay" 
      v-bind:style="{top: wptTop, left: wptLeft, width: wptWidth, height: wptHeight}"
      v-show="showHighlight"
      class="wpt-highlight "
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
    props: {
      steps: {
        default: function () {
          return [{target: 'body', tooltip: {title: 'Default', content:'Oops, you forgot to provide a valid steps property'}}]
        },
        type: Array
      }
    },
    data: () => ({
      step: {},
      stepCount: -1,
      tooltip: null,
      showTooltip: false,
      showHighlight: false,
      alert: false,
      alertText: "",
      wptTop: 0, wptLeft: 0, wptWidth: 0, wptHeight:0,
    }),
    watch: {
      stepCount: {
        handler: function() {

          if (this.stepCount == -1 || this.stepCount >= this.steps.length) {
            this.quit();
            return
          }
          
          // hide a tooltip before moving next
          this.showTooltip = false

          // since tooltip has a css fade-out transition for 100ms, wait until it's gone
          // before updating the tooltip appearance 
          setTimeout(function(){
            this.step = this.steps[this.stepCount]
            this.tour(this.step);
          }.bind(this), 150);
        },
        // deep: true
      }
    },
    computed: {
      
      tourInSession: function() {
        return this.stepCount >= 0 && this.stepCount < this.steps.length
      },
      wpTooltipText: function() {
        const tip = this.step.tooltip || {}
        return tip.content || "Default Text"
      },
      wpTooltipTitle: function() {
        const tip = this.step.tooltip || {}
        return tip.title || "Default Title"
      },
      wpHighlightText: function() {
        return this.step.content || ""
      },
      boundedStep: function() {
        let s = this.stepCount
        s = s > -1 ? s : 0
        s = s < this.steps.length ? s : 0
        return s
      },
      theme: function() {
        return this.$vuetify.theme.isDark ? "Light" : "Dark"
      },
    },
    
    methods: {

      highlightTarget: function(target) {
        let rect = target.getBoundingClientRect()
        let scrollTop = window.pageYOffset
        let pad = 4 // px
        this.wptTop = scrollTop + rect.top - pad + "px"
        this.wptLeft = rect.left - pad + "px"
        this.wptWidth = rect.width + 2 * pad + "px"
        this.wptHeight = rect.height + 2 * pad + "px"
      },

      isValidTarget: function(target) {
        return target !== null
      },

      createHighlight: function() {
        // Necessary to attach overlay to the main element for correct positioning
        const overlay = document.querySelector('.wpt-highlight');
        const main = document.querySelector('main')
        main.appendChild(overlay)
      },

      createTooltip: function() {
        const overlay = document.querySelector('.wpt-highlight');
        const tooltip = document.querySelector('.wpt-tooltip');
        this.tooltip = createPopper(overlay, tooltip, {
          //modifiers: [preventOverflow, flip],
          modifiers: [{
            name: 'offset',
            options: {
              offset: [0, 15],
            },
          }],
        });
        
        overlay.addEventListener(getTransitionEndEventName(), onTooltipFinishMoving.bind(this), {once: true});
      },

      destroyTooltip: function() {
        if (this.tooltip) {
          this.tooltip.destroy();
          this.tooltip = null;
        }
      },
      
      next: function() {
        this.stepCount++
      },

      prev: function() {
        this.stepCount--
      },

      init: function() {
        this.stepCount = 0
        this.showHighlight = true
        this.showTooltip = true
      },

      quit: function() {
        // Allow quit anytime if not modal or if is last step
        if (!(this.steps[this.boundedStep].modal || false) || this.stepCount == this.steps.length-1) {
          this.stepCount = -1
          this.destroyTooltip()
          this.showHighlight = false
          this.showTooltip = false
        }
      },

      tour: function(step) {

        if (typeof(step)==='undefined' || !this.isValidTarget(step.target)) {
          return
        }
        var target = document.querySelector(step.target)

        if (this.tooltip === null) {
          this.createTooltip()
          this.showTooltip = true
        }

        // If current step # is in bounds of steps array
        // if (this.stepCount >= 0 && this.stepCount <= this.steps.length - 1) {

          // Make highlight element visible (styled in css)
          this.showHighlight = true
          
          // Scroll window to put target element in view
          this.$vuetify.goTo(target, {
            duration: 500,
            offset: 10,
            easing: 'easeInOutCubic',
          })
          // Highlight target element
          this.highlightTarget(target)

          // If user specifies a 'handler' property as a function, evaluate it here
          let onStepChange = step.handler
          if (typeof(onStepChange) === 'function') {
            onStepChange = onStepChange.bind(this)
            onStepChange()
          }

      },
      toggleTheme: function() {
        this.$vuetify.theme.isDark = !this.$vuetify.theme.isDark
      },
    },

    mounted() {
      window.addEventListener('hashchange', onHashChange.bind(this))
      window.addEventListener("mouseup", onClick.bind(this))
      window.addEventListener("keydown", onKeyDown.bind(this))
      window.addEventListener("resize", onResize.bind(this))
      
      this.createHighlight()     
      this.init()
      //this.stepCount = 9
    }
  }



  // handle routing
  function onHashChange() {
    let route = window.location.hash.replace(/#\/?/, '')
    const isRoute = (element) => element.target === route
    let stepCountSelected = this.steps.findIndex(isRoute)

    if (stepCountSelected >= 0) {
      this.stepCount = stepCountSelected
    }
    
    window.location.hash = ''
  }

  function onKeyDown(e) {

    e = e || window.event;
    // Arrow or escape wil tour is in session
    if (this.tourInSession) {
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
      let step = this.steps[this.stepCount]
      this.tour(step)
    }
  }

  function onTooltipFinishMoving(e) {
  
    // Fire after tooltip has stopped moving
    setTimeout(function() {
      console.log(e.propertyName)
      // Cancel tooltip if not defined in props
      if (this.stepCount >=0 && typeof(this.steps[this.stepCount].tooltip) !== 'undefined') {
        this.showTooltip = true
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
      top 0.1s, 
      left 0.1s, 
      width 0.1s, 
      height 0.1s;
    transition-timing-function: ease-in-out;
  }

  .wpt-hidden {
    visibility: hidden;
    pointer-events: none;
  }

  .wpt-tooltip {
    z-index: 10003;
    /* margin-top: 0px !important; */
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
    background: inherit; /* ensures arrow matches tooltip with theme change */
    visibility: hidden; /* ensures arrow container is not visible */
  }

  div[data-popper-arrow]::before {
    visibility: visible; /* ensures arrow is visible */
    content: ''; 
    transform: rotate(45deg);
  }

  .wpt-tooltip[data-popper-reference-hidden] div[data-popper-arrow]::before {
    visibility: hidden;
  }

  .wpt-tooltip[data-popper-placement^='top'] > div[data-popper-arrow] {
    bottom: -4px;
  }

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