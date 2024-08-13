<script setup>
// import HelloWorld from './components/HelloWorld.vue'
// import TheWelcome from './components/TheWelcome.vue'
// import MyName from './components/MyName.vue'
// import JSON from './components/JSON.vue'
// import { Button } from 'bootstrap';
import Form from './components/Form.vue';
import Button from './components/Button.vue';
import Form_Zod from './components/Form_Zod.vue';
import Form_blur_function from './components/Form_blur_function.vue';
import Form_Veevalidate from './components/Form_Veevalidate.vue'


</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>

    <div class="wrapper">
      <MyName msg="Zexin!" />
    </div>

  </header>

  <main>
    <TheWelcome />
  </main> -->

  <!-- <main>
    <JSON/>
  </main> -->
  <Form></Form>
  This is challenge task 1, by using Zod library to do validation
  <Form_Zod></Form_Zod>


  This is challenge task 2, by using blur function
  <Form_blur_function />

  This is challenge task 3, by using vee-validate library to do validation 
<Form_Veevalidate></Form_Veevalidate>
  <!-- <Button></Button> -->

  <!-- <div id="app">
    <P>This is challenge task's button </P>
    <Button
      label="Submit"
      color="primary"
      size="small"
      :disabled="false"
      @click="handleButtonClick"
      style="outlined"
    />
  </div> -->

</template>

<script>
export default {
  name: 'App',
  components: {
    Button
  },
  methods: {
    handleButtonClick() {
      console.log('Button clicked');
    }
  }
}
</script>

<!-- <style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style> -->
