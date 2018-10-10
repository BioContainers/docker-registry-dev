import Vue from 'vue';
import Vuex from 'vuex';

//只要是plugin,都可以用这种use的方法去应用。
Vue.use(Vuex);

export default new Vuex.Store({
	state:{
		baseURL: location.hostname.match(/localhost/)?'':'/pride',
		baseApiURL: location.hostname.match(/localhost/)?'http://localhost:9999':'http://api.biocontainers.pro',  
		//baseApiURL:'http://api.biocontainers.pro'
	},
});