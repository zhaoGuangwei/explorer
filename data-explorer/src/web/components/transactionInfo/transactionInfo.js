import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { observable, computed, toJS } from 'mobx';
import { observer, inject } from 'mobx-react';
import nj from 'nornj';
import { registerTmpl } from 'nornj-react';
import { autobind } from 'core-decorators';
import { Drawer} from 'antd';
import {tranBase58,stringToBase58,byteToLong,byteToString,Bytes2Str,Int32ToStr} from '../../../utils/util';
import { BlockCollapse,BlockCollapseSmall,BlockCollapsePanel } from '../../components/blockCollapse';
import styles from './transactionInfo.m.scss';
import tmpls from './transactionInfo.t.html';
import moment from 'moment';

//页面容器组件
@registerTmpl('TransactionInfo')
@inject('store')
@observer
export default class TransactionInfo extends Component {

  // 关闭
  @autobind
  onCloseblockDetails(){
    return this.props.onClose(!this.props.visible);
  }

  
  formatData(type,data){
    data=data&&data.value&&data.value||'';
    let result='';
    switch (type.toUpperCase()) {
      case 'INT64':
        let int64=stringToBase58(data);
        result=byteToLong(int64);
        break;
      case 'TEXT':
        let text=stringToBase58(data);
        result=byteToString(text);
        break;
      case 'JSON':
        let json=stringToBase58(data);
        result=byteToString(json);
        break;
      case 'BYTES':
        let hex=stringToBase58(data);
        result=Bytes2Str(hex);
        break;  
      case 'INT32':
        let int32=stringToBase58(data);
        result=Int32ToStr(int32);
        break; 
      default:
        result=data;
        break;
    }
    return result;
  }

  argsToList(data){
    let json=[];
    if(data&&data.values&&data.values.length>0){
      for (let i = 0; i < data.values.length; i++) {
        json.push({
          type:data.values[i].type,
          value:this.formatData(data.values[i].type,data.values[i].value),
        });
        
      }
      var str = JSON.stringify(json);
      return str;
    }
  }

  render() {
    const { data,visible} = this.props;
    return tmpls.container({
      components: {
        'ant-Drawer': Drawer,
        'BlockCollapse':BlockCollapse,
        'BlockCollapseSmall':BlockCollapseSmall,
        'BlockCollapsePanel':BlockCollapsePanel,
      }
    },this.props, this, {
      styles,
      data,
      visible,
      tranBase58,
      moment: moment
    });
  }
}