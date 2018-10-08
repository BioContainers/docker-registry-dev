<template>
  <div class="index-container">
    <div class="banner">
          <div class="content-wrapper">
              <h1 class="title">Bio Containers</h1>
              <p class="description">subtiltle</p> 
          </div>
      </div>



  <div class="content">
          <h1>Search Engine</h1>
          <div class="search-wrapper">
             <Input v-model="keywords" icon="ios-search" placeholder="Search" style="width:100%"></Input>
             
           </div>


      <div class="search-options-wrapper">
            <div class="filter-sort-wrapper">

              <div class="filter">
                    <span class="name">Filters:</span>
                    <ButtonGroup>
                        <Button v-for="(item ,index) in filters" :type="item.type" :key="index" @click="filterClick(index)">{{item.name}}</Button>
                    </ButtonGroup>
              </div>
              <div class="sort">
                    <span class="name">Sort:</span>
                    <ButtonGroup>
                        <Button v-for="(item ,index) in sorts" :type="item.type" :key="index" @click="sortClick(index)">{{item.name}}</Button>
                    </ButtonGroup>
              </div>

            </div>

               <div class="search-button-wrapper">
                  <Button type="primary" @click="search">Search</Button>
              </div>
              </div>
          </div>


          <div class="container-wrapper">
              <Card class="card">
                  <p slot="title">Card Title</p>
                  <p slot="extra">
                    <Tooltip>
                        <Icon type="ios-film-outline"></Icon>
                        <div class="tooltip-content" slot="content">
                            Species distribution for all the PSMs within the cluster.
                        </div>
                    </Tooltip>
                  </p>
                  <div class="description-wrapper">
                    descriptions draft of title
                  </div>
                  <div class="tag-wrapper">
                      <Tag color="default">default-tag</Tag>
                      <Tag color="default">default-tag</Tag>
                      <Tag color="default">default-tag</Tag>
                  </div>
                  <div class="statue-wrapper">
                      Not yet
                  </div>
              </Card>
              <Card class="card">
                  <p slot="title">Card Title 2</p>
                  <p slot="extra">
                    <Tooltip>
                        <Icon type="ios-film-outline"></Icon>
                        <div class="tooltip-content" slot="content">
                            Species distribution for all the PSMs within the cluster.
                        </div>
                    </Tooltip>
                  </p>
                  <div class="description-wrapper">
                    title description
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
              <Card class="card">
                  <p slot="title">Card Title 3</p>
                  <p slot="extra">
                    <Tooltip>
                        <Icon type="ios-film-outline"></Icon>
                        <div class="tooltip-content" slot="content">
                            Species distribution for all the PSMs within the cluster.
                        </div>
                    </Tooltip>
                  </p>
                  <div class="description-wrapper">
                   contents of descriptions
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
          <div class="page-wrapper">
              <Page :total="40" size="small" show-elevator show-sizer />
          </div>
          </div>
     



<!--
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
-->

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
                name:'All',
                type:'primary',
            },
            {
                name:'sorts',
                type:'default',
            },
            {
                name:'sorts2',
                type:'default',
            },
            {
                name:'sorts3',
                type:'default',
            },
            {
                name:'sorts4',
                type:'default',
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
    },
    filterClick(index){
        if(index == 0){
          for(let i in this.filters){
              if(i == index)
                this.filters[i].type = 'primary';
              else
                this.filters[i].type = 'default';
          }
        }
        else{
            this.filters[0].type = 'default';
            this.filters[index].type = this.filters[index].type == 'primary' ? 'default' : 'primary';
        }
    },
    sortClick(index){
        if(index == 0){
          for(let i in this.sorts){
              if(i == index)
                this.sorts[i].type = 'primary';
              else
                this.sorts[i].type = 'default';
          }
        }
        else{
            this.sorts[0].type = 'default';
            this.sorts[index].type = this.sorts[index].type == 'primary' ? 'default' : 'primary';
        }
    },
    search(){
        console.log('search');
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
      width: 100%;
      text-align: center;
      margin: 50px auto 0 auto;
    }
    .results-wrapper{
      width: 80%;
      margin: 30px auto 0 auto;
    }


    .search-options-wrapper{
      margin: 20px auto 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .filter-sort-wrapper{
      display: flex;
    }
    .filter-wrapper .sort{
      margin-left: 10px;
    }
    .filter-wrapper .name{
      font-size: 0.875rem
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
    
    .container-wrapper{
      margin-top: 50px;
    }
    .description-wrapper{
      margin-bottom: 5px;
    }
    .tag-wrapper{
      margin-bottom: 5px;
    }
    .card{
      display: inline-block;
      margin: 0 15px;
      margin-bottom: 30px;
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
    .update-statistics{
      width: 80%;
      margin: 30px auto 0 auto;
    }
    .issue-statistics{
      width: 80%;
      margin: 30px auto 0 auto;
    }
    .content-wrapper{
      width: 80%;
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

    @media (max-width: 700px) { 
      .card{ 
        width: calc((100% - 0px) / 1 - 3px);
        margin-left: 0 !important;
        margin-right: 0 !important;
      }
    }

    @media (max-width: 1015px) and (min-width: 701px){ 
       .card{ 
         width: calc((100% - 60px) / 2 - 3px);
       }
      .container-wrapper{
        margin-left: -15px;
        margin-right: -15px;
      }
    }


    @media (max-width: 1510px) and (min-width: 1016px){ 
      .card{ 
        width: calc((100% - 90px) / 3 - 4px);
      }
      .container-wrapper{
        margin-left: -15px;
        margin-right: -15px;
      }
    }

    @media (max-width: 3910px) and (min-width: 1511px){ 
      .card{ 
        width: calc((100% - 120px) / 4 - 4px);
      }
      .container-wrapper{
        margin-left: -15px;
        margin-right: -15px;
      }
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
    
    /*
    table tr:last-child td:first-child {
        border-bottom-left-radius: 10px;
    }

    table tr:last-child td:last-child {
        border-bottom-right-radius: 10px;
    }
    */
</style>
