﻿import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import nj from 'nornj';
import { registerTmpl } from 'nornj-react';
import '../../common/containerConfig';
import 'flarej/lib/components/antd/button';
import 'flarej/lib/components/antd/breadcrumb';
import 'flarej/lib/components/antd/table';
import { Message } from 'flarej/lib/components/antd/message';
import { autobind } from 'core-decorators';
import '../../components/header';
import '../../components/sider';
import ContainerHoc from '../../components/higherOrders/container';
import styles from './ledgers.m.less';
import tmpls from './ledgers.t.html';
import LedgersStore from '../../stores/LedgersStore';
const ledgersStore = new LedgersStore();

//页面容器组件
@inject('store')
@observer
class Container extends Component {
  componentDidMount() {
    // const closeLoading = Message.loading('正在加载数据...', 0);
    // this.props.store.getTableData(1, this.props.store.pageSize).then(() => closeLoading());
  }

  render() {
    return this.props.tmpls[0](this, {
      styles
    });
  }
}
ContainerHoc('Container', Container, ledgersStore); 

@registerTmpl('DataTable')
@inject('store')
@observer
class DataTable extends Component {

  render() {
    return tmpls.dataTable(this.state, this.props, this, {
      styles
    });
  }
}

if (module.hot) {
  module.hot.accept();
  njr.renderTmplTag({ target: '#container' });
}