<template>
    <Menu mode="horizontal" active-name="1" @on-select="menuSlect">
        <a class="logo"><img src="static/logo/biocontainers-logo.png" width="40" height="40">BioContainers Registry UI</a>
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
            <MenuItem name="bithub">
                <Icon type="social-github"></Icon>
                GitHub
            </MenuItem>
        </div>
    </Menu>
</template>
<script>
    export default {
        data () {
            return {
               
            }
        },
    methods:{
            menuSlect(name){
                switch(name){
                  case 'statslink':
                    this.$router.push({name:'index'});
                    //this.activeName = 'index';
                  break;

                  case 'multipackage':
                    window.open('https://github.com/BioContainers/multi-package-containers');
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


