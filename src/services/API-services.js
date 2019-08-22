//
//  API-servies.js
//  <project>
//
//  Created by yann_liang on 2017-05-25.
//  Copyright 2017 yann_liang. All rights reserved.
//

import Http from "axios";
import API from "@/config/API-config";
import store from "@/vuex/store";
import mock from "./mock";
Http.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
// Http.defaults.headers.get['Access-Control-Allow-Origin'] = "*"
// Http.defaults.headers.post['Accept-Language'] = localStorage.getItem('i18nLocale') ? localStorage.getItem('i18nLocale') : navigator.language.toLowerCase()

console.warn(localStorage.getItem("i18nLocale"));

const encodeParams = params => {
  let r = "?",
    p = [];
  for (let key in params) {
    p.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  }
  return r + p.join("&");
};

//请求类
class ApiService {
  constructor() {
    this.block = {
      blockList: this.post.bind(this, API.BLOCK.blockList),
      blockDetails: this.post.bind(this, API.BLOCK.blockDetails),
      blockDetailNavigate: this.post.bind(this, API.BLOCK.blockDetailNavigate),
      blockListByNodeId: this.post.bind(this, API.BLOCK.blockListByNodeId),
      blockListByNodeIdDownload: this.post.bind(this, API.BLOCK.blockListByNodeIdDownload)
    };
    this.search = {
      query: this.post.bind(this, API.SEARCH.query)
    };
    this.trade = {
      transactionList: this.post.bind(this, API.TRADE.transactionList),
      transactionDetails: this.post.bind(this, API.TRADE.transactionDetails),
      transactionListByBlock: this.post.bind(this, API.TRADE.transactionListByBlock),
      transactionListByAddress: this.post.bind(this, API.TRADE.transactionListByAddress),
      addressTransactionDownload: this.post.bind(this, API.TRADE.addressTransactionDownload),
      transactionDetailNavigate: this.post.bind(this, API.TRADE.transactionDetailNavigate),
    };
    this.proposal = {
      // proposalList: this.post.bind(this, API.PROPOSAL.proposalList),
      // proposalDetails: this.post.bind(this, API.PROPOSAL.proposalDetails),
      // voteList: this.post.bind(this, API.PROPOSAL.voteList),
      proposalList: function() {
        mock.proposalList.code = 0; //Math.random() >= 0.5 ? 0 : 1;
        let proposal = mock.proposalList.data[0];
        let i = 1;
        while (i++ <= mock.proposalList.totalCount) {
          let newProposal = JSON.parse(JSON.stringify(proposal));
          newProposal.url = "PIP" + i;
          newProposal.type = String((i % 3) + 1);
          newProposal.status = String((i % 5) + 1);
          mock.proposalList.data.push(newProposal);
        }
        return mock.proposalList.code ? Promise.reject(mock.proposalList) : Promise.resolve(mock.proposalList);
      },
      proposalDetails: function() {
        mock.proposalDetails.code = 0;
        return mock.proposalDetails.code ? Promise.reject(mock.proposalDetails) : Promise.resolve(mock.proposalDetails);
      },
      voteList: function() {
        mock.voteList.code = 0; //Math.random() >= 0.5 ? 0 : 1;
        let vote = mock.voteList.data[0];
        let i = 1;
        while (i++ <= mock.voteList.totalCount) {
          let newVote = JSON.parse(JSON.stringify(vote));
          mock.vote.data.push(newVote);
        }
        return mock.voteList.code ? Promise.reject(mock.voteList) : Promise.resolve(mock.voteList);
      }
    };
    this.account = {
      details: this.post.bind(this, API.ACCOUNT.details),
    };
    this.node = {
      aliveStakingList: this.post.bind(this, API.NODE.aliveStakingList),
      historyStakingList: this.post.bind(this, API.NODE.historyStakingList),
      detail: this.post.bind(this, API.NODE.detail),
      stakingOptRecordList: this.post.bind(this, API.NODE.stakingOptRecordList),
      delegationListByStaking: this.post.bind(this, API.NODE.delegationListByStaking),
      delegationListByAddress: this.post.bind(this, API.NODE.delegationListByAddress)
    };
    this.interceptorsOfReq();
    this.interceptorsOfRes();
  }
  get(url, params) {
    if (params) {
      url += encodeParams(params);
    }
    return Http.get(url).then(res => res.data);
  }
  put(url, params) {
    //
    typeof params === "undefined" ? (params = {}) : "";
    return Http.put(url, params).then(res => res.data);
  }
    post(url, params) {
        typeof params === 'undefined' ? params = {} : '';
        localStorage.sessionid ? params.sessionid = localStorage.sessionid : ''
        // params.userID = localStorage.user ? JSON.parse(localStorage.user).userID : ''
        // params.cid = 1
        // params.cid = sessionStorage.getItem('commandId') ? sessionStorage.getItem('commandId') : store.state.common.chainId
        // params.cid = sessionStorage.getItem('commandId') ? sessionStorage.getItem('commandId') : localStorage.getItem('cid')
        return Http.post(url, params).then(res => res.data)
    }
    encodeParams(url,params){
        let r = '?',
        p = [];
        for(let key in params) {
            p.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        }
        console.warn('url>>>',url)
        console.warn('r>>>',r)
        console.warn('p>>>',p)
        let arr=url.split('//');
        console.warn(arr)
        //本地调试
         let arr1=arr[1].split('/');
         console.warn(arr1)
         let url1=arr[0]+'//'+arr1[0]+'/'+sessionStorage.getItem('commandContext')+'/'+arr1[1]+'/'+arr1[2];
        //测试环境
        // let url1='/'+sessionStorage.getItem('commandContext')+arr[0];
        return url1 + r + p.join('&')
    }
    /**
     * 上传文件
     * @param url -上传的url
     * @param fileObject -文件对象
     * @returns {Promise.<TResult>}
     */
    uploadFile(url, params) {
        let formData = new FormData();
        formData.append("file",params.file,params.fileName)
        return Http({
            url:url+"?fileName=" + params.fileName+"&fileSize="+ params.fileSize+"&policy="+params.policy,
            // url:url,
            method:'POST',
            data:formData,
            headers: {'Content-Type': 'multipart/form-data'}
        }).then((res) => res.data)
    }
    interceptorsOfReq() {
        return Http.interceptors.request.use(
            config => {
                const language = navigator.language || navigator.browserLanguage;
                config.headers['Accept-Language'] = localStorage.getItem('i18nLocale') ? localStorage.getItem('i18nLocale') : language.toLowerCase();
                console.log('请求URL== ' + config.url)
                // if(config.url.indexOf('json')!==-1 || config.url.indexOf('recaptcha')!==-1){
                //     console.log('json数据请求',config.url);
                //     // return config;
                // }else{
                //     console.log('常规请求',config.url);
                //     let arr=config.url.split('//');
                //     console.log(arr)
                //     //本地调试
                //      let arr1=arr[1].split('/');
                //      console.log(arr1)
                //      let url=arr[0]+'//'+arr1[0]+'/'+sessionStorage.getItem('commandContext')+'/'+arr1[1]+'/'+arr1[2];
                //     //测试环境
                //     // let url='/'+sessionStorage.getItem('commandContext')+arr[0];
                //     config.url=url
                //     console.log(url)
                // }
                return config;
            },
            err => {
                return Promise.reject(err)
            })
    }
    interceptorsOfRes() {
        Http.interceptors.response.use(function(response) {
            console.log(response.config.url + '的响应数据↓↓↓\n', response.data);
            if(response.data.errorCode == 4) {
                localStorage.removeItem('sessionid')
                localStorage.removeItem('user')
                vueVm.loginPopFlag=true
            }
            return response
        }, function(error) {
            return Promise.reject(error)
        })
    }
}
//导出一个对象
export default new ApiService();
