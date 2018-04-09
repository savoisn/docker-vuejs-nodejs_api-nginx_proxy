<template>
  <div class="header">
    <ul>
      <li>
        <router-link :to="{name:'Home'}">Home</router-link>
      </li>
      <li>
        <router-link :to="{name:'Protected'}">Protected</router-link>
      </li>
      <li>
        <router-link :to="{name:'RoleProtected'}">Role Protected</router-link>
      </li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld'
console.log("header hello");
export default {
  name: 'AppHeader',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
