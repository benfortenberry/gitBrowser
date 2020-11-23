<template>
  <div id="app">
    <b-container>
      <b-row
        ><b-col
          ><h1>
            <router-link to="/"
              ><font-awesome-icon :icon="['fab', 'github']" /> Git
              Browser</router-link
            >
          </h1></b-col
        ></b-row
      >
      <b-row>
        <b-col> <router-view /></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style lang="scss">
$body-bg: #ccc;
$primary: #111;
$secondary: #c6c8ca;
@import "~bootstrap/scss/bootstrap.scss";
@import "~bootstrap-vue/src/index.scss";
</style>
