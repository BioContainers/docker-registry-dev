<template>
  <div class="index-container">
      <div class="banner">
          <div class="content-wrapper">
              <h1 class="title">Bio Containers</h1>
              <p class="description">Bioinformatics more accessible and reproducible</p> 
          </div>
      </div>
      <div class="triangle triangle-down"></div>
      <div class="content">
          <h1>Search</h1>
          <div class="search-wrapper">
            <Input v-model="keywords" icon="ios-search" placeholder="Search" style="width:100%"></Input>
          </div>
          <div class="search-options-wrapper">
              <div class="filter-wrapper">
                  <div class="filter">
                        <span class="name">Filters:</span>
                        <ButtonGroup>
                            <Button class="filter-button" v-for="(item ,index) in filters" :type="item.type" :key="index" @click="filterClick(index)">{{item.name}}</Button>
                        </ButtonGroup>
                  </div>
                  <!--
                  <div class="sort">
                        <span class="name">Sort:</span>
                        <ButtonGroup>
                            <Button v-for="(item ,index) in sorts" :type="item.type" :key="index" @click="sortClick(index)">{{item.name}}</Button>
                        </ButtonGroup>
                  </div>
                  -->
              </div>
              <div class="search-button-wrapper">
                  <Button type="primary" @click="search">Search</Button>
              </div>
          </div>
          <div class="container-wrapper">
            <div class="title-container">
                  <div class="title-wrapper">
                      <div class="card-title">
                        <span>Name:{{containerObj.name}}</span>
                        <span>Version:{{containerObj.version}}</span>
                      </div>
                  </div>
                  <!--
                  <div class="title-wrapper">
                      <div class="card-title">
                        <span>Images</span>
                      </div>
                  </div>
                  -->   
            </div>
            <div class="card-content-wrapper">
                      <Card dis-hover v-for="item in containerObj.images" class="card">
                            <p slot="title">Container Images</p>
                            <div>
                                <span>Tag: </span><span>{{item.tag}}</span>
                            </div>
                            <div>
                                <span>FullTag: </span><span>{{item.fullTag}}</span>
                            </div>
                            <div>
                                <span>Size: </span><span>{{item.size}}</span>
                            </div>
                      </Card>
                  </div>
          </div>
          
      </div>
      <!--
      <div class="results-wrapper">
          <Table stripe :columns="resultsTableCol" :data="resutls" @on-row-click="rowClick"></Table>
      </div>
      <div class="update-statistics">
          <Card style="width:100%" class="">
              <p slot="title">Containers Update Statistics</p>
          </Card>
          <Card style="width:100%" class="">
              <p slot="title">Containers Update Statistics</p>
          </Card>
      </div>
      -->
      <!--
      <div class="issue-statistics">
          <Card style="width:100%" class="issue-statistics-card">
              <p slot="title">GitHub Issues Statistics </p>
          </Card>
      </div>
      -->
  </div>
</template>

<script>
import store from "@/store/store.js"
export default {
  name: 'ContainerDetails',
  data () {
    return {
        keywords:'',
        total:1000,
        current:1,
        pageSize:30,
        containerObj:{
            name:'',
            version:'',
            images:[]
        },
        loading:true,
        dataFound:false,
        filter:'All',
        resultsTableCol:[
            {
                title: 'Container',
                key: 'container'
            },
            {
                title: 'Description',
                key: 'description'
            },
            {
                title: 'Real Name',
                key: 'realname'
            },
            {
                title: 'Last Modified',
                key: 'lastmodified'
            },
            {
                title: 'Starred/Starts',
                key: 'starredstarts'
            },
            {
                title: 'Popularity',
                key: 'popularity'
            },
            {
                title: 'Registry Link',
                key: 'registrylink'
            },
        ],
        resutls:[
            {
                container: 'John Brown',
                description: 18,
                realname: 'New York No. 1 Lake Park',
                lastmodified: '2016-10-03',
                starredstarts:'test',
                popularity:'test',
                registrylink:'test'
            },
            {
                container: 'John Brown',
                description: 18,
                realname: 'New York No. 1 Lake Park',
                lastmodified: '2016-10-03',
                starredstarts:'test',
                popularity:'test',
                registrylink:'test'
            },
            {
                container: 'John Brown',
                description: 18,
                realname: 'New York No. 1 Lake Park',
                lastmodified: '2016-10-03',
                starredstarts:'test',
                popularity:'test',
                registrylink:'test'
            },
            {
                container: 'John Brown',
                description: 18,
                realname: 'New York No. 1 Lake Park',
                lastmodified: '2016-10-03',
                starredstarts:'test',
                popularity:'test',
                registrylink:'test'
            },
        ],
        filters:[
            {
                name:'All',
                type:'primary',
            },
            {
                name:'ID',
                type:'default',
            },
            {
                name:'Name',
                type:'default',
            },
            {
                name:'Description',
                type:'default',
            },
        ],
        sorts:[
            {
                name:'sort1',
                type:'primary',
            },
            {
                name:'sort2',
                type:'default',
            },
            {
                name:'sort3',
                type:'default',
            }
        ],
    }
  },
  methods:{
    rowClick(row){
      console.log('row',row);
        this.$router.push({name:'Containerdetails',params:{id:row.ID}});
    },
    filterClick(index){
        if(index == 0){
          for(let i in this.filters){
              if(i == index){
                this.filter = this.filters[i].name;
                this.filters[i].type = 'primary';
              }
              else
                this.filters[i].type = 'default';
          }
        }
        else{
            this.filters[0].type = 'default';
            if(this.filters[index].type == 'primary')
                this.filters[index].type = 'default';
            else{ 
                this.filter = this.filters[index].name;
                this.filters[index].type = 'primary';
            } 
        }
    },
    sortClick(index){
          for(let i in this.sorts){
              if(i == index)
                this.sorts[i].type = 'primary';
              else
                this.sorts[i].type = 'default';
          }
    },
    search(){
        this.loading=true;
        this.dataFound=false;
        this.cardList=[];
        var query={};
        if(this.filter == 'Description')
         query.description = this.keywords;
        else if(this.filter == 'ID')
          query.id = this.keywords;
        else if(this.filter == 'Name')
          query.toolname = this.keywords;
        else if(this.filter == 'All')
          query={}

        this.$http
            .get(this.$store.state.baseApiURL + '/api/v2/tools',{params:query})
            .then(function(res){
              //this.total = res.body.length;
              console.log(res);
              console.log('this.cardList.length',this.cardList.length);
              this.total = 1000;
              let tempLength = res.body.length>30?30:res.body.length;
              if(tempLength > 0){
                  for(let i=0; i<tempLength; i++){
                      console.log(res.body[i])
                      var item = {
                        toolname:res.body[i].toolname.toUpperCase(),
                        description:res.body[i].description,
                        tags:['tag1','tag2','tag2'],
                        state:'Not yet',
                        color:res.body[i].verified ? '#19be6b': '#c5c8ce',
                      }
                      this.cardList.push(item);
                      
                  }
                  this.dataFound=true;
              }
              else{
                this.dataFound=false;
              }
              this.loading=false;
            },function(err){
                console.log('err',err);
                this.dataFound=false;
                this.loading=false;
                this.$Notice.error({
                    title: 'Server Error',
                    desc: err.body.error
                });
            });
    },
    containerID(){
            console.log('this.$router.params.id',this.$route.params.id);
         this.$http
            .get(this.$store.state.baseApiURL + '/api/v2/tools/'+ this.$route.params.id+'/versions')
            .then(function(res){
                      console.log('res.body',res.body);
                      let resbody=res.body[0];
                      this.containerObj = {
                        name:resbody.name.toUpperCase(),
                        version:resbody.meta_version,
                        images:[]
                      }
                      for(let i=0; i<resbody.container_images.length; i++){
                        var item = {
                            tag:resbody.container_images[i].tag,
                            fullTag:resbody.container_images[i].fullTag,
                            size: Math.round(resbody.container_images[i].size/1024/1024),
                        }
                        this.containerObj.images.push(item);
                      }
              //this.total = res.body.length;
              /*console.log(res);
              console.log('this.cardList.length',this.cardList.length);
              this.total = 1000;
              let tempLength = res.body.length>30?30:res.body.length;
              if(tempLength > 0){
                  for(let i=0; i<tempLength; i++){
                      console.log(res.body[i])
                      var item = {
                        toolname:res.body[i].toolname.toUpperCase(),
                        description:res.body[i].description,
                        tags:['tag1','tag2','tag2'],
                        state:'Not yet',
                        color:res.body[i].verified ? '#19be6b': '#c5c8ce',
                      }
                      this.cardList.push(item);
                      
                  }
                  this.dataFound=true;
              }
              else{
                this.dataFound=false;
              }
              this.loading=false;*/
            },function(err){
                console.log('err',err);
                this.dataFound=false;
                this.loading=false;
                this.$Notice.error({
                    title: 'Server Error',
                    desc: err.body.error
                });
            });
    },
    containerVersion(){

    }
  },
  mounted(){
    this.containerID();
    this.containerVersion();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .search-wrapper{
      width: 100%;
      text-align: center;
      margin: 50px auto 0 auto;
    }
    .search-options-wrapper{
      margin: 20px auto 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .filter-wrapper{
      display: flex;
    }
    .filter-wrapper .sort{
      margin-left: 10px;
    }
    .filter-wrapper .name{
      font-size: 0.875rem
    }
    .results-wrapper{
      width: 80%;
      margin: 30px auto 0 auto;
    }
    .update-statistics{
      width: 80%;
      margin: 30px auto 0 auto;
    }
    .issue-statistics{
      width: 80%;
      margin: 30px auto 0 auto;
    }
    .banner{
      background-color: #eb8c1f;
      color: #ffffff;
      padding: 3rem 0;
    }
    .triangle-down:before{
     
      /*background-image:url('static/triangle.svg');*/
    }
    .triangle:before{
      background-repeat: no-repeat;
      background-size: 100% 100%;
      content: '';
      display: block;
      width: 100%;
      left: 0;
      height: 30px;
      /*background-image:url('static/triangle.svg');*/
    }
    .spin-container{
      display: inline-block;
      width: 100%;
      height: 100px;
      position: relative;
    }
    .no-data-container{
      width: 100%;
      text-align: center;
      font-size: 14px;
    }
    .title-container{
        width: 100%;
        margin: 0 auto 10px auto;
        display: flex;
        justify-content: space-between;
    }
    .title-wrapper{
        border: 1px solid #eee;
        border-left-width: 4px;
        border-radius: 4px;
        margin-bottom: 4px;
        padding: 7px 15px;
        display: inline-block;
        width: 100%;
    }
    .card-title{
        margin:0 5px;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
    }
    .content-wrapper{
      width: 80%;
      padding-right: 15px;
      padding-left: 15px;
      margin-right: auto;
      margin-left: auto;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      -ms-flex-wrap: wrap;
    }
    .title{
      font-size: 4.5rem;
      font-weight: 300;
      line-height: 1.2;
    }
    .description{
      font-size: 1.25rem;
      font-weight: 300;
    }
    .content{
      position: relative;
      min-height: 300px;
      margin-bottom: 6rem;
      font-size: 1.1rem;
      line-height: 1.6;
      width: 80%;
      margin-right: auto;
      margin-left: auto;

    }
    .card-content-wrapper{
      display: flex;
      justify-content: space-between;
    }
    .card-content-wrapper .right{
      display: flex;
      align-items: end;
      font-size: 30px;
    }
    .content h1{
      border-bottom: 1px solid #e4973e;
      font-weight: 500;
      padding-top: 60px;
      color: #eb8c1f;
    }
    .container-wrapper{
      margin-top: 50px;
    }
    .description-wrapper{
      margin-bottom: 5px;
      white-space: normal;
    }
    .tag-wrapper{
      margin-bottom: 5px;
      display: inline-block;
    }
    .card{
      width: 100%;
      margin-bottom: 30px;
      min-height: 100px;
      overflow: hidden;
      transition: all 0.15s ease-out;
      -webkit-transition: all 0.15s ease-out;
    }
    .tooltip-content{
        white-space: normal;
        width: 200px;
    }
    .page-wrapper{
      text-align: center;
      font-size: 12px;
    }
    .filter-button{
      min-width: 70px;
    }
    /*
    @media (max-width: 840px) { 
      .card{ 
        width: calc((100% - 0px) / 1 - 3px);
       
      }
    }
    @media (max-width: 1015px) and (min-width: 841px){ 
      .card{ 
        width: calc((100% - 60px) / 2 - 3px);

      }
      .container-wrapper{
       
      }
    }
    @media (max-width: 1510px) and (min-width: 1016px){ 
      .card{ 
        width: calc((100% - 90px) / 3 - 4px);
      }
      .container-wrapper{
        
      }
    }
    @media (max-width: 3910px) and (min-width: 1511px){ 
      .card{ 
        width: calc((100% - 120px) / 4 - 4px);
      }
      .container-wrapper{
        
      }
    }*/
   
</style>

<style>
    .update-statistics .ivu-card-head{
      background-color: #d9edf7 !important;
    }
    .update-statistics .ivu-card-bordered{
      border: 1px solid #bce8f1 !important;
      border-color: #bce8f1 !important;
    }
    .issue-statistics .ivu-card-head{
      background-color: #dff0d8 !important;
    }
    .issue-statistics .ivu-card-bordered{
      border: 1px solid #d6e9c6 !important;
      border-color: #d6e9c6 !important;
    }
    /*
    table tr:last-child td:first-child {
        border-bottom-left-radius: 10px;
    }

    table tr:last-child td:last-child {
        border-bottom-right-radius: 10px;
    }
    */
</style>
