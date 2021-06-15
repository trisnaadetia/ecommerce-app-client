<template>
  <div>
    <div class="container2 mt-4">
      <div class="col-9">
        <div class="bg-dark text-light text-center mb-4">
          <h3 class="mt-5">Your Cart</h3>
        </div>
        <div class="container2" v-if="listCart">
          <div class="col-sm">
            <b-card class="text-center rounded1 mt-2" v-for="product in listCart.Products" :key="product.id">
              <div class="container2">
                <div class="col-sm">
                  <img :src="product.image_url" alt="" style="width:8em;">
                </div>
                <div class="col-sm">
                  <h5>{{product.name}}</h5>
                </div>
                <div class="col-sm">
                  <label for="qty" class="m-2">qty:</label>
                  <input name="qty" type="number" class="w-25 text-center" 
                  v-model="product.CartProduct.quantity"
                  min="1"
                  :max="product.stock"
                >
                </div>
                <div class="col-sm">
                  <h5 v-text="convertToRupiah(product.price)"></h5>
                </div>
                <div class="col-sm">
                  <h5 v-text="convertToRupiah(product.price * product.CartProduct.quantity)"></h5>
                </div>
                <div class="col-1">
                  <a href="#" @click.prevent="delCartProduct(listCart.id, product.id)"><img src="../assets/cancel.png" alt="cancel" width="40rem" height="40rem"></a>
                </div>
              </div>
            </b-card>
          </div>
        </div>
        <div class="container2 mt-5 text-center">
          <div class="col-3 offset-6">
            <h3>TOTAL</h3>
          </div>
          <div class="col-3">
            <h3>{{convertToRupiah(totalPrice) || 'Rp. 0'}}</h3>
          </div>
        </div>
        <div class="container2 mt-2 text-center">
          <div class="col-3 offset-9">
            <b-button variant="dark" class="w-100" @click.prevent="checkout()">Checkout</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Carts',
  data () {
    return {
    }
  },
  created () {
    this.$store.dispatch('fetchCart')
  },
  methods: {
    convertToRupiah (angka) {
      if (angka) {
        let rupiah = '';		
        let angkarev = angka.toString().split('').reverse().join('')
        for(let i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.'
        return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('')
      }
    },
    checkout () {
      this.$store.dispatch('checkout')
      .then(() => {
        this.$swal.fire(
          'Success paid!',
          'Thanks for shopping',
          'success'
        )
        this.$router.push({ name: 'Home' })
      })
      .catch((error) => {
        console.log(error)
      })
    },
    delCartProduct (CartId, ProductId) {
      const data = {
        CartId,
        ProductId
      }
      this.$store.dispatch('delCartProduct', data)
      .then(() => {
        this.$store.dispatch('fetchCart')
        this.$swal.fire(
          'Cart Product Deleted!',
          '',
          'success'
        )
      })
      .catch((error) => {
        console.log(error)
      })
    }
  },
  computed: {
    listCart () {
      return this.$store.state.listCart
    },
    totalPrice () {
      if (this.$store.state.listCart) {
        const cartProduct = this.$store.state.listCart.Products
        let totalPrice = 0
        cartProduct.forEach(element => {
          totalPrice += (element.price * element.CartProduct.quantity)
        })
        return totalPrice
      }
    }
  }
}
</script>

<style>

</style>