<template>
  <div class="multipackage-container">
      <div class="banner">
          <div class="content-wrapper">
              <h1 class="title">Multi-package Containers</h1>
              <p class="description">Combine several conda packages into one Docker container.</p> 
          </div>
      </div>
      <div class="content-container">
          <div class="packages-wrapper">
              <Card class="card">
                  <p slot="title">Packages</p>
                  <div class="search-wrapper">
                    <Input v-model="keywords" icon="ios-search" placeholder="Search" style="width:100%"></Input>
                  </div>
                  <Table stripe :columns="resultsTableCol" :data="resutls"></Table>
                  <div class="page-wrapper">
                      <Page :total="total" :current="current" :page-size="pageSize" size="small" show-elevator show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange"/>
                  </div>
              </Card>
          </div>
         
      </div>
      <!--<iframe class="lorikeet-iframe" src="http://biocontainers.pro/multi-package-containers/" scrolling="no"></iframe>-->
  </div>

</template>

<script>
export default {
  name: 'ContainerDetails',
  data () {
    return {
        keywords:'',
        total:5598,
        current:1,
        pageSize:20, 
        containerRepeated:false,
        containerRepaetedName:'',
        createContainerValue: '2pg_cartesian=1.0.1,_license=1.1,_nb_ext_conf=0.3.0,abawaca=1.00,abricate=0.4,abstract-rendering=0.5.1,abundancebin=1.0.1',
        containerNameValue:'quay.io/biocontainers/mulled-v2-87f6cdd7eada4e4f6f2fc092e7820d826d5aeeaa:5b8a8a59d2a5385e45cbe82909bf44e7544071f1',
        resultsTableCol:[
            {
                title: 'Name',
                key: 'Name'
            },
            {
                title: 'Version',
                key: 'Version'
            },
            {
                title: 'Channel',
                key: 'Channel'
            },
            {
                title: '',
                key: 'action',
                align:'center',
                width:100,
                render: (h, params) => {
                    return h('div', [
                        /*
                        h('Button', {
                           
                            on: {
                                click: () => {
                                    this.gotoBlast(params);
                                }
                            }
                        }, 'Blast'),
                        */
                        h('Icon', {
                            props: {
                                type: 'checkmark-round',
                            },
                            style: {
                                marginLeft: '5px'
                            },
                            on: {
                                click: () => {
                                    this.packagesRowClick(params.row);
                                }
                            }
                        }),
                    ]);
                }
            }
        ],
        resutls:[
            {
                Name: '2pg_cartesian',
                Version: '1.0.1',
                Channel: 'bioconda',
            },
            {
                Name: '_license',
                Version: '1.1',
                Channel: 'anaconda',
            },
            {
                Name: '_nb_ext_conf',
                Version: '0.3.0',
                Channel: 'anaconda',
            },
            {
                Name: 'abawaca',
                Version: '1.00',
                Channel: 'bioconda',
            },
            {
                Name: 'abricate',
                Version: '0.4',
                Channel: 'bioconda',
            },
            {
                Name: 'abstract-rendering',
                Version: '0.5.1',
                Channel: 'anaconda',
            },
            {
                Name: 'abundancebin',
                Version: '1.0.1',
                Channel: 'bioconda',
            },
            {
                Name: 'abyss',
                Version: '2.0.1',
                Channel: 'bioconda',
            },
            {
                Name: 'abyss-k128',
                Version: '2.0.1',
                Channel: 'bioconda',
            },
            {
                Name: 'addict',
                Version: '2.1.0',
                Channel: 'conda-forge',
            },
        ],
        selectedPackagesTableCol:[
            {
                title: 'Name',
                key: 'Name'
            },
            {
                title: 'Version',
                key: 'Version'
            },
            {
                title: '',
                key: 'action',
                align:'center',
                width:100,
                render: (h, params) => {
                    return h('div', [
                        /*
                        h('Button', {
                           
                            on: {
                                click: () => {
                                    this.gotoBlast(params);
                                }
                            }
                        }, 'Blast'),
                        */
                        h('Icon', {
                            props: {
                                type: 'checkmark-round',
                            },
                            style: {
                                marginLeft: '5px'
                            },
                            on: {
                                click: () => {
                                    this.selectedPackagesRowClick(params.row);
                                }
                            }
                        }),
                    ]);
                }
            }
        ],
        selectedPackagesResutls:[],
    }
  },
  methods:{
    packagesRowClick(rowItem){
        console.log('add colum');
        var found = false;
        for(let i in this.selectedPackagesResutls){
          if(this.selectedPackagesResutls[i]&&this.selectedPackagesResutls[i].Name.match(rowItem.Name)){
              found=true;
              this.containerRepaetedName=rowItem.Name;
              break;
          }
        }
        if(!found){
            var item={
                Name:rowItem.Name,
                Version:rowItem.Version
            }
            this.selectedPackagesResutls.push(item);
        }
        else{
          this.containerRepeated=true;
          setTimeout(()=>{
            this.containerRepeated=false;
            this.containerRepaetedName='';
          },1500)
        }
        
        
    },
    selectedPackagesRowClick(rowItem){
      this.selectedPackagesResutls.splice(rowItem._index, 1);
    },
    test(){
        this.$http
            .get('/api/get')
            .then(function(res){
              console.log(res);
                console.log(123);
            },function(err){

            });
    },
    pageChange(){

    },
    pageSizeChange(){

    }
  },
  mounted(){
    //console.log('receive id',this.$route.params.id);
    //this.test();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .multipackage-container{
         width: 100%;
         height: 100%;

    }
    .lorikeet-iframe{
        width: 100%;
        height: 100%;
        border-width:0;
    }
    .banner{
      background-color: #eb8c1f;
      color: #ffffff;
      padding: 3rem 0;
    }
    .search-wrapper{
      width: 100%;
      text-align: center;
      margin: 0 auto 10px auto;
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
    .content-container{
      width: 90%;
      text-align: center;
      margin: 30px auto;
      display: flex;
    }
    .selected-packages{
      margin-left: 10px !important;
    }
    .packages-wrapper{
      width: 50%;
      margin: 0 auto;
      display: inline-block;
    }
    .title{
      font-size: 4.5rem;
      font-weight: 300;
      line-height: 1.2;
    }
    .page-wrapper{
      margin-top: 10px;
    }
    .card p{
      text-align: left;
    }
    .button-wrapper{
      margin:20px auto;
    }
    .textarea-wrapper{
      margin: 5px 0;
      white-space: nowrap;
    }
</style>

