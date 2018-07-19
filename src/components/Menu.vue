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
				<button class="btn btn-succesee btn-block">提交</button>
			</div>
			<div v-else>购物车没有商品</div>
		</div>
	</div>  
</template>
<script>
export default {
  data() {
    return {
		baskets:[],
      getMenuItems: {
        1: {
          name: "榴莲pizza",
          description: "这是喜欢吃榴莲朋友的最佳选择",
          options: [
            {
              size: 9,
              price: 38
            },
            {
              size: 12,
              price: 48
            }
          ]
        },
        2: {
          name: "芝士pizza",
          description: "芝士杀手,浓浓的芝士丝, 食欲瞬间爆棚",
          options: [
            {
              size: 9,
              price: 38
            },
            {
              size: 12,
              price: 48
            }
          ]
        },
        3: {
          name: "夏威夷pizza",
          description: "众多人的默认选择",
          options: [
            {
              size: 9,
              price: 36
            },
            {
              size: 12,
              price: 46
            }
          ]
        }
      }
    };
  },
	computed: {
		total(){
			let totalCost = 0
			for(let index in this.baskets){
				let indivdualItem = this.baskets[index]
				totalCost += indivdualItem.quanity * indivdualItem.price
			}
			return totalCost
		}
	},
  methods: {
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
