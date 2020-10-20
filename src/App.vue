<template>
  <v-app>
    <!-- app bar -->
      <v-app-bar app color="primary" dark>
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
      <Waypoint/>
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
    //
  }),
};
</script>

<style>
  .wpt-slant {
    transform: rotate(5deg);
  }
  .wpt-shift {
    margin-left: -25px !important;
  }
</style>
