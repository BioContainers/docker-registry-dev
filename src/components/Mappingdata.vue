<template>
  <div class="index-container">
      <div class="banner">
          <div class="content-wrapper">
              <h1 class="title">Bio Containers</h1>
              <p class="description">Statistics, GitHub Issues, and BioCotnainers usage</p> 
          </div>
      </div>
      <div class="triangle triangle-down"></div>
      <div class="content">
         <Card class="card">
              <p slot="title">GitHub Issues Statistics</p>
              <Heatmap></Heatmap>
        </Card>
        
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
import Heatmap from '@/components/charts/Heatmap.vue'

export default {
  name: 'MappingData',
  data () {
    return {
        QUAY_ORGANIZATION:"https://quay.io/api/v1/repository?namespace=biocontainers&popularity=true&last_modified=true",
        RetrieveGitHubIssuesAPI1:"https://api.github.com/repos/biocontainers/containers/issues?state=all&per_page=100",
        RetrieveGitHubIssuesAPI2:"https://api.github.com/repos/biocontainers/specs/issues?state=all&per_page=100",
        RetrieveGitHubIssuesAPI3:"https://api.github.com/repos/biocontainers/specs/issues/comments?per_page=100",
        RetrieveGitHubIssuesAPI4:"https://api.github.com/repos/biocontainers/containers/issues/comments?per_page=100",
        dates:{},
        keywords:'',
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
                name:'Cancel',
                type:'default',
            },
            {
                name:'Confirm',
                type:'default',
            },
            {
                name:'Confirm',
                type:'default',
            },
            {
                name:'Confirm',
                type:'default',
            }
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
  components: {
      Heatmap,
  },
  methods:{
    test(){
      this.$http
            .get('/api/get')
            .then(function(res){
              console.log(res);
                console.log(123);
            },function(err){

            });
    },
    retrieveGitHubIssues(){
      let promise1 = this.$http.get(this.RetrieveGitHubIssuesAPI1);
      let promise2 = this.$http.get(this.RetrieveGitHubIssuesAPI2)
      let promise3 = this.$http.get(this.RetrieveGitHubIssuesAPI3)
      let promise4 = this.$http.get(this.RetrieveGitHubIssuesAPI4)
           
      Promise.all([promise1, promise2, promise3, promise4]).then(([v1,v2,v3,v4]) => {
        console.log('v1',v1);
        console.log('v2',v2);
        console.log('v3',v3);
        console.log('v4',v4);

        // Process of merging results v1 and v2 together here
      })
    },
    retrieveQuayIO(){
      this.$http
            .get(this.QUAY_ORGANIZATION,{headers: {'X-Requested-With' :'XMLHttpRequest','Authorization': "Bearer "+ "XRYLsxvQqmQLpP7RrajpFdiZntveNEyiffXyibK0"}})
            .then(function(res){
              console.log('retrieveQuayIO',res);
              let repositories = res.body.repositories
                for(let i in repositories){
                   let item = {
                      domain: "quay.io/biocontainers/",
                      name: repositories[i].name, 
                      description: repositories[i].description, 
                      lastModified: repositories[i].last_modified, 
                      number_pull: [repositories[i].popularity, 50], 
                      start_count:repositories[i].is_starred
                   }

                   let num = Math.floor(repositories[i].last_modified/1000)
                   if(!isNaN(num))
                      this.dates[num.toString()] = this.dates[num.toString()] ? this.dates[num.toString()]+1:1;
                }

              

                console.log('this.dates',this.dates);
            },function(err){
              console.log('err',err);
            });
    },
    search(){
        console.log('search');
        
    }
  },
  mounted(){

    this.retrieveQuayIO();
    this.retrieveGitHubIssues();
    //this.test();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
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
      min-height: 300px;
      margin-bottom: 6rem;
      font-size: 1.1rem;
      line-height: 1.6;
      width: 80%;
      margin-right: auto;
      margin-left: auto;
    }
    .content h1{
      border-bottom: 1px solid #e4973e;
      font-weight: 500;
      padding-top: 60px;
      color: #eb8c1f;
    }
</style>


