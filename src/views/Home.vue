<template>
  <div>
    <div class="container2">
      <div class="col-9">
        <b-carousel
          id="carousel-1"
          :interval="4000"
          controls
          indicators
          background="#ababab"
          img-width="1024"
          img-height="480"
          style="text-shadow: 1px 1px 2px #333;"
        >
          <b-carousel-slide v-for="banner in listBanner" :key="banner.id"
            :img-src="banner.image_url"
          ></b-carousel-slide>
        </b-carousel>
      </div>
    </div>
    <div class="container2 mt-4">
      <div class="col-9">
        <b-card class="text-center rounded1">
          <div class="bg-dark text-light mb-4">
            <h4>Categories</h4>
          </div>
          <div class="container2">
            <div class="col-sm">
              <b-card class="text-center rounded1">
                <img src="../assets/apparel.png" alt="" style="max-width: 10rem">
                <h5>Apparel</h5>
              </b-card>
            </div>
            <div class="col-sm">
              <b-card class="text-center rounded1">
                <img src="../assets/accessories.png" alt="" style="max-width: 10rem">
                <h5>Accessories</h5>
              </b-card>
            </div>
            <div class="col-sm">
              <b-card class="text-center rounded1">
                <img src="../assets/equipment.png" alt="" style="max-width: 10rem">
                <h5>Equipment</h5>
              </b-card>
            </div>
            <div class="col-sm">
              <b-card class="text-center rounded1">
                <img src="../assets/shoes.png" alt="" style="max-width: 10rem">
                <h5>Shoes</h5>
              </b-card>
            </div>
          </div>
        </b-card>
      </div>
    </div>
    <div class="container2 mt-4">
      <div class="col-9">
        <b-card class="text-center rounded1 p-0">
          <div class="bg-dark text-light">
            <h4>New Releases</h4>
          </div>
        </b-card>
      </div>
    </div>
    <div class="container2 mt-4">
      <div class="col-9">
        <div class="container">
          <div class="row" style="overflow: scroll;max-height: 100vh">
              <b-card
                no-body
                style="max-width: 19rem;max-height:33rem"
                :img-src="product.image_url"
                img-alt="Image"
                img-top
                class="text-center b-card"
                v-for="product in listProduct" :key="product.id"
              >
                <b-card-body>
                  <b-card-sub-title class="mb-4">{{product.name}}</b-card-sub-title>
                  <b-card-text>
                    <p>Price: {{convertToRupiah(product.price)}}</p>
                    <p>Category: {{product.Category.name}}</p>
                    <p>Stock: {{product.stock}}</p>
                    <a href="#" v-if="updateIsLogin === true" @click.prevent="postCart(product.id)"><img src="../assets/cart.png" alt="cart" width="25em" height="20em"></a>
                  </b-card-text>
                </b-card-body>
              </b-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      isLogin: false
    }
  },
  components: {
  },
  props: [ 'updateIsLogin' ],
  methods: {
    convertToRupiah (angka) {
      let rupiah = '';		
      let angkarev = angka.toString().split('').reverse().join('')
      for(let i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.'
      return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('')
    },
    postCart (id) {
      this.$store.dispatch('postCart', id)
      .then(({ data }) => {
        this.$swal.fire(
          'Added to cart!',
          data.productName,
          'success'
        )
      })
      .catch((error) => {
        console.log(error)
      })
    }
  },
  created () {
    this.$store.dispatch('fetchData')
    this.$store.dispatch('fetchBanner')
    this.$store.dispatch('fetchCart')
    if (localStorage.access_token) {
      this.isLogin = true
    } 
  },
  computed: {
    listProduct () {
      return this.$store.state.listProduct
    },
    listBanner () {
      return this.$store.state.listBanner
    }
  }
}
</script>

<style scoped>
.b-card {
  margin: 1.5em auto;
}
</style>
