<template>
	<div class="row">
		<!-- 菜单 -->
		<div class="col-sm-12 col-md-8">
			<table class="table">
				<thead class="thead-default">
					<tr>
						<th>尺寸</th>
						<th>价格</th>
						<th>加入</th>
					</tr>
				</thead>
				<tbody v-for="item in getMenuItems" :key="item.name">
					<tr>
						<td><strong>{{item.name}}</strong></td>
					</tr>
					<tr v-for="option in item.options" :key="option.size">
						<td>{{option.size}}</td>
						<td>{{option.price}}</td>
						<td><button class="btn btn-sm btn-outline-success" @click="addToBasket(item,option)">+</button></td>
					</tr>
				</tbody>
			</table>
		</div>
		<!-- 购物车 -->
		<div class="col-md-4 col-sm-12">
			<div v-if="baskets.length > 0">
				<table class="table">
					<thead class="thead-default">
						<tr>
							<th>数量</th>
							<th>品种</th>
							<th>价格</th>
						</tr>
					</thead>
					<tbody v-for="item in baskets" :key="item.price">
						<tr>
							<td>
								<button class="btn btn-sm btn-outline-success" @click="deleTo(item)">-</button>
								<span>{{item.quanity}}</span>
								<button class="btn btn-sm btn-outline-success" @click="addTo(item)">+</button>
							</td>
							<td>{{item.name}}{{item.size}}寸</td>
							<td>{{item.price*item.quanity}}</td>
						</tr>
					</tbody>
				</table>
				<p>总价：{{total+ 'RMB'}}</p>
				<button class="btn btn-success btn-block">提交</button>
			</div>
			<div v-else>购物车没有商品</div>
		</div>
	</div>  
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
		baskets:[],
    };
  },
	computed: {
		getMenuItems(){
			//return this.$store.state.menuItems
			//通过getters获取数据
			return this.$store.getters.getMenuItems
		},
		total(){
			let totalCost = 0
			for(let index in this.baskets){
				let indivdualItem = this.baskets[index]
				totalCost += indivdualItem.quanity * indivdualItem.price
			}
			return totalCost
		}
	},
	created () {
		this.fetchData()
	},
  methods: {
		fetchData(){
			// fetch('https://wd1053239395jirkbf.wilddogio.com/menu.json')
			// 	.then(res=>{
			// 		return res.json()
			// 	})
			// 	.then(data=>{
			// 		console.log(data)
			// 	})
			
			// axios.get('menu.json')
			// 	.then(res=>{
			// 		this.getMenuItems = res.data
			// 	})

			// this.http.get('menu.json')
			// 	.then(res=>{
			// 		this.getMenuItems = res.data
			// 	})
		
			this.http.get("menu.json")
                 .then(res => this.$store.commit("setMenuItems",res.data))
				
			
		},
	  addToBasket(item,option){
			let basket = {
			  name:item.name,
			  size:option.size,
			  price:option.price,
			  quanity:1
		  }

			if(this.baskets.length>0){
				//过滤
				let result = this.baskets.filter((basket) => {
					return basket.name === item.name&&basket.price === option.price
				})
				if(result != null && result.length > 0){
					result[0].quanity++
				}else{
					this.baskets.push(basket);
				}
			}else{
				this.baskets.push(basket);
			}		  
		},
		deleTo(item){
			item.quanity --;
			if(item.quanity<=0){
				this.removebasket(item)
			}
		},
		addTo(item){
			item.quanity ++;
		},
		removebasket(item){
			this.baskets.splice(this.baskets.indexOf(item),1)
		}
  }
};
</script>
