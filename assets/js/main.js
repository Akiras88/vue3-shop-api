
const app = Vue.createApp({
        template: `
        <div class="container text-center">
            <div class="select-input">
                <ul class="list-inline">
                    <li @click="getApi('new_arrivals.json')" class="list-inline-item disabled">New Arrivals</li>
                    <li @click="getApi('best_seller.json')" class="list-inline-item disabled">Best Seller</li>
                    <li @click="getApi('most_view.json')" class="list-inline-item disabled">Most View</li>
                </ul>
            </div>
            <div v-if="products === null">Loading...</div>
            <div v-else class="container display">
                <div class="card-item" v-for="product in products">
                    <cards-product :product="product" :pathImages="pathImages"></cards-product>
                </div>
            </div>
        </div>
    `,
        data() {
            return {
                products: null,
                color: null,
                pathImages: 'http://127.0.0.1:5500',
                imageProducts: null,
                api: 'http://127.0.0.1:5500/assets/data/',
                activeColor: 'black',
                defaultUrl: 'new_arrivals.json'
            }
    },
    methods: {
        getApi(url) {
            const ctx = this;
            axios.get(ctx.api + url)
                .then(function (response){
                    ctx.products = response.data
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
    },
    mounted() {
        this.getApi(this.defaultUrl);
    }
});

app.component('cards-product', {
        template: `
            <div class="card">
                <img :src="pathImages + product.image_thumb" class="card-img-top" :alt="product.name">
                <div class="card-body">
                    <h5 class="card-title">{{ product.name }}</h5>
                    <p class="card-text">{{ product.description }}</p>
                    <p class="card-text"><span class="text-black-50"><del>{{ product.old_price }}</del></span> {{ product.price }}</p>
                </div>
            </div>
        `,
        props: { 
            product: {
                type: Object,
                required: true
            },
            pathImages: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                priceDiscuont: null
            }
        }
});


app.mount('#app');
