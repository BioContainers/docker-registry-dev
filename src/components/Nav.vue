<template>
    <div class="nav-container">
        <Menu mode="horizontal" active-name="1" @on-select="menuSlect">
            <a class="logo" @click="gotoHome"><img src="static/logo/biocontainers-logo.png" width="40" height="40">BioContainers Registry UI</a>
            <div class="menu">
                <MenuItem name="statslink">
                   <Icon type="ios-home-outline"></Icon>
                    Stats Link
                </MenuItem>
                <MenuItem name="multipackage">
                    <Icon type="ios-home-outline"></Icon>
                    Multi-package
                </MenuItem>
                <MenuItem name="biocontainers">
                    <Icon type="ios-home-outline"></Icon>
                    BioContainers
                </MenuItem>
                <MenuItem name="github">
                    <Icon type="social-github"></Icon>
                    GitHub
                </MenuItem>
            </div>
        </Menu>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                
            }
        },
        methods:{
            gotoHome(){
                this.$router.push({name:'Index'});
            },
            menuSlect(name){
                switch(name){
                  case 'statslink':
                    console.log(123);
                    this.$router.push({name:'MappingData'});
                    //this.activeName = 'index';
                  break;

                  case 'multipackage':
                    window.open('http://biocontainers.pro/multi-package-containers/');
                    //this.activeName = 'discover';
                  break;
                  case 'biocontainers':
                    //this.$router.push({ name: 'discover', params: { category: '全部'},query:{sort: "popular"}});
                    //this.activeName = 'discover';
                  break;
                  case 'github':
                    //this.$router.push({ name: 'discover', params: { category: '全部'},query:{sort: "popular"}});
                    //this.activeName = 'discover';
                  break;
                }
            } 
        }
        
    }
</script>
<style scoped>
    .nav-container{
        background-color: rgba(240,240,240,.95);
    }
    .logo{
        float: left;
        color: #495060;
        text-decoration: none;
        display: flex;
        align-items: center;
        padding-left:10px;
        font-size: 16px;
        font-weight: bold;
    }
    .logo img{
        margin-right: 10px;
    }
    .menu{
        float: right;
    }
</style>
<style>
    .nav-container .ivu-menu-light{
        background: rgba(240,240,240,.95) !important;
    }
</style>

