<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" type="light" variant="light" fixed="top">
        <b-navbar-brand>
          <img src="./assets/logo.png" alt="" width="75" height="30" class="d-inline-block align-text-top">
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#" @click.prevent="showHome">Home</b-nav-item>
            <!-- <b-nav-item href="#">Apparel</b-nav-item>
            <b-nav-item href="#">Accessories</b-nav-item>
            <b-nav-item href="#">Equipment</b-nav-item> -->
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-navbar-nav>
              <b-nav-item href="#" v-if="isLogin">
                <img src="./assets/cart.png" alt="" width="25" 
                  height="20" 
                  class="d-inline-block align-text-top"
                  @click.prevent="showCart"
                >
              </b-nav-item>
              <div v-if="!isLogin">
                <b-button variant="outline-success" size="sm" @click.prevent="showLogin">Login</b-button>
                <b-button variant="success" size="sm" @click.prevent="showRegister">Register</b-button>
              </div>
            </b-navbar-nav>
            <b-nav-item-dropdown right v-if="isLogin">
              <!-- Using 'button-content' slot -->
              <template #button-content>
                {{user}}
              </template>
              <b-dropdown-item href="#" @click.prevent="logout">Logout</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view @isLogin="setIsLogin" :updateIsLogin="isLogin"/>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      isLogin: false
    }
  },
  methods: {
    showLogin () {
      this.$router.push({ name: 'Login' }).catch(()=>{})
    },
    showHome () {
      this.$router.push({ name: 'Home' }).catch(()=>{})
    },
    showRegister () {
      this.$router.push({ name: 'Register' }).catch(()=>{})
    },
    showCart () {
      this.$store.dispatch('fetchCart')
      this.$router.push({ name: 'Carts' }).catch(()=>{})
    },
    logout () {
      localStorage.clear()
      this.isLogin = false
      this.$router.push({ name: 'Home' }).catch(()=>{})
      this.$swal.fire(
        'See you!',
        this.user,
        'success'
      )
    },
    setIsLogin (val) {
      this.isLogin = val
    }
  },
  created () {
    if (localStorage.email) {
      this.$store.commit('setDataLogin', localStorage.email)
      this.isLogin = true
    } 
  },
  computed: {
    user () {
      return this.$store.state.dataLogin
    }
  }
}
</script>

<style>
@import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css);
@import url(https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.4.3/css/mdb.min.css);

*{
    margin: 0;
    padding: 0;
}

body{
    background-color: #fff;
}

.card:hover {
    box-shadow: 0 0 11px rgba(33,33,33,.2);
}

.container2{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    max-width: 100vw;

}

.rounded1{
    border-radius: 0.8rem;
}

.hm-gradient {
    background-image: linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);
}

.darken-grey-text {
    color: #2E2E2E;
}

.navbar .dropdown-menu a:hover {
    color: #616161 !important;
}

.darken-grey-text {
    color: #2E2E2E;
}

.carousel-item h1
{
color:#fff;
font-size: 20px;
    margin: 75px auto;
    text-align: center;
}
.login-block
{
    width: 50%;
    margin: 0 auto;
    position: absolute;
    top: 20%;
    left: 25%;

}
.signup__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.76);
    background-color: rgba(0, 0, 0, 0.33);
}
.login_sec {

    padding: 0px;
    background-color: #f8fafb;

}
.login_sec img {

    margin: 24px auto;

}
.banner-sec {
    background: url(./assets/banner.jpeg) no-repeat center;
    background-size: cover;
    min-height: 500px;
    border-radius: 0 10px 10px 0;
    padding: 0;
}

.carousel-fade .carousel-item {
    opacity: 0;
    transition-duration: .6s;
    transition-property: opacity;
}

.carousel-indicators {

    bottom: -41px;
}

.carousel-indicators .active {
    background-color: #fff;
}

.carousel-fade .carousel-item.active,
.carousel-fade .carousel-item-next.carousel-item-left,
.carousel-fade .carousel-item-prev.carousel-item-right {
    opacity: 1;
}

.carousel-fade .active.carousel-item-left,
.carousel-fade .active.carousel-item-right {
    opacity: 0;
}

.carousel-fade .carousel-item-next,
.carousel-fade .carousel-item-prev,
.carousel-fade .carousel-item.active,
.carousel-fade .active.carousel-item-left,
.carousel-fade .active.carousel-item-prev {
    transform: translateX(0);
    transform: translate3d(0, 0, 0);
}

.container1 {

-webkit-box-shadow: 0 0.1875rem 1.5rem rgba(0, 0, 0, 0.2);
box-shadow: 0 0.1875rem 1.5rem rgba(0, 0, 0, 0.2);
border-radius: 0.375rem;
margin-bottom: 5%;

}

.carousel-inner {
    border-radius: 0 10px 10px 0;
}

.carousel-caption {
    text-align: left;
    left: 5%;
}

</style>
