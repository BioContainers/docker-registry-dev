<template>
  <div class="index-container">
    <div class="banner">
          <div class="content-wrapper">
              <h1 class="title">Bio Containers</h1>
              <p class="description">subtiltle</p> 
          </div>
      </div>




      <div class="search-wrapper">
        <Input v-model="keywords" icon="ios-search" placeholder="Search" style="width:100%"></Input>
      </div>





<div class="container-wrapper">
              <Card style="width:100%" class="card">
                  <p slot="title">Containers Update Statistics</p>
                  <p slot="extra">
                    <Tooltip>
                        <Icon type="ios-film-outline"></Icon>
                        <div class="tooltip-content" slot="content">
                            Species distribution for all the PSMs within the cluster.
                        </div>
                    </Tooltip>
                  </p>
                  <div class="description-wrapper">
                    XXXX XXXXXX XXXXX XXXX XXXX XXXX  XXXX XX
                  </div>
                  <div class="tag-wrapper">
                      <Tag color="default">default</Tag>
                      <Tag color="default">default</Tag>
                      <Tag color="default">default</Tag>
                  </div>
                  <div class="statue-wrapper">
                      Not yet
                  </div>
              </Card>
              <Card style="width:100%" class="card">
                  <p slot="title">Containers Update Statistics</p>
                  <p slot="extra">
                    <Tooltip>
                        <Icon type="ios-film-outline"></Icon>
                        <div class="tooltip-content" slot="content">
                            Species distribution for all the PSMs within the cluster.
                        </div>
                    </Tooltip>
                  </p>
                  <div class="description-wrapper">
                    XXXX XXXXXX XXXXX XXXX XXXX XXXX  XXXX XX
                  </div>
                  <div class="tag-wrapper">
                      <Tag color="default">default</Tag>
                      <Tag color="default">default</Tag>
                      <Tag color="default">default</Tag>
                  </div>
                  <div class="statue-wrapper">
                      Not yet
                  </div>
              </Card>
              <Card style="width:100%" class="card">
                  <p slot="title">Containers Update Statistics</p>
                  <p slot="extra">
                    <Tooltip>
                        <Icon type="ios-film-outline"></Icon>
                        <div class="tooltip-content" slot="content">
                            Species distribution for all the PSMs within the cluster.
                        </div>
                    </Tooltip>
                  </p>
                  <div class="description-wrapper">
                    XXXX XXXXXX XXXXX XXXX XXXX XXXX  XXXX XX
                  </div>
                  <div class="tag-wrapper">
                      <Tag color="default">default</Tag>
                      <Tag color="default">default</Tag>
                      <Tag color="default">default</Tag>
                  </div>
                  <div class="statue-wrapper">
                      Not yet
                  </div>
              </Card>
          </div>
          
     




      <div class="results-wrapper">
          <Table stripe :columns="resultsTableCol" :data="resutls" @on-row-click="rowClick"></Table>
      </div>
      <div class="update-statistics">
          <Card style="width:100%" class="update-statistics-card">
              <p slot="title">Containers Update Statistics</p>
          </Card>
      </div>
      <div class="issue-statistics">
          <Card style="width:100%" class="issue-statistics-card">
              <p slot="title">GitHub Issues Statistics</p>
          </Card>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
        keywords:'',
        resultsTableCol:[
            {
                title: 'Name',
                key: 'name'
            },
            {
                title: 'Age',
                key: 'age'
            },
            {
                title: 'Address',
                key: 'address'
            }
        ],
        resutls:[
            {
                name: 'John Brown',
                age: 28,
                address: 'New York No. 1 Lake Park',
                date: '2016-10-03'
            },
            {
                name: 'Jim Green',
                age: 24,
                address: 'London No. 1 Lake Park',
                date: '2016-10-01'
            },
            {
                name: 'Joe Black',
                age: 34,
                address: 'Sydney No. 1 Lake Park',
                date: '2016-10-02'
            },
            {
                name: 'Jon Snow',
                age: 26,
                address: 'Ottawa No. 2 Lake Park',
                date: '2016-10-04'
            }
        ]
    }
  },
  methods:{
  	rowClick(){
      this.$router.push({name:'Containerdetails'})
    },
    test(){
      this.$http
            .get('http://api.biocontainers.pro/api/v2/tools')
            .then(function(res){
              console.log(res.body);
              
            },function(err){

            });
    }
  },
  mounted(){
    this.test();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .search-wrapper{
      width: 80%;
      text-align: center;
      margin: 50px auto 0 auto;
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
    .content-wrapper{
      width: 100%;
      padding-right: 15px;
      padding-left: 15px;
      margin-right: auto;
      margin-left: auto;
    }
    .banner{
      background-color: #eb8c1f;
      color: #ffffff;
      padding: 3rem 0;
    }
    .description{
      font-size: 1.25rem;
      font-weight: 300;
    }
    .title{
      font-size: 4.5rem;
      font-weight: 300;
      line-height: 1.2;
    }

    @media (min-width: 576px){
      .content-wrapper {
          max-width: 540px;
      }
    }
    @media (min-width: 768px){
      .content-wrapper {
          max-width: 720px;
      }
    }
    @media (min-width: 992px){
      .content-wrapper {
          max-width: 960px;
      }
    }
    @media (min-width: 1200px){
      .content-wrapper {
          max-width: 1140px;
      }
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
