<template>
	<div class="row">
		<div class="col-sm-12 col-md-8">
			<!-- new pizza -->
			<app-new-pizza></app-new-pizza>
		</div>
		<div class="col-sm-12 col-md-4">
			<!-- 品种展示 -->
			<h3 class="text-muted my-5">Menu</h3>
			<table class="table">
				<thead class="table table-default">
					<tr>
						<th>品种</th>
						<th>删除</th>
					</tr>
				</thead>
				<tbody v-for="item in getMenuItem" :key="item.name">
					<tr>
						<td>{{item.name}}</td>
						<td><button @click="deleteDate(item)" class="btn btn-outline-danger btn-sm">✖</button></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
<script>
import NewPizza from "./NewPizza.vue";
export default {
  data() {
    return {
      //getMenuItem:[]
    };
  },
  components: {
    "app-new-pizza": NewPizza
  },
  computed: {
    getMenuItem:{
	  get(){
      // return this.$store.state.menuItems;
      return this.$store.getters.getMenuItems
	  },
	  set(){

	  }
    }
  },
  created() {
    fetch("https://wd1053239395jirkbf.wilddogio.com/menu.json")
      .then(res => {
        return res.json();
      })
      .then(data => {
        //console.log(data)
        let menuArry = [];
        for (let key in data) {
          // console.log(key)
          //console.log(data[key])
          data[key].id = key;
          menuArry.push(data[key]);
        }
		// 数据同步
		this.$store.commit('setMenuItems',menuArry)
      });
  },
  methods: {
    deleteDate(item) {
      fetch(
        "https://wd1053239395jirkbf.wilddogio.com/menu/" + item.id + "/.json",
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json"
          }
        }
      )
        .then(res => res.json())
        .then(data => {
			this.$store.commit('removeMenuItems',item)
		})
        .catch(err => console.log(err));
    }
  }
};
</script>

