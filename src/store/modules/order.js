import * as types from '../mutation-types'
import router from '../../router';

const state = {
  offer_list: [],
  offer_list_ajax: false,
  public_list: [],
  public_list_ajax: false,
  not_involved_list: [],
  not_involved_list_ajax: false,
  all_list: [],
  all_list_ajax: false,
  offer_count: '',
  public_count: '',
  not_involved_count: '',
  detail: {},
  simple_offer_detail: {
    spofferviewbean: {},
    fabric: {}
  },
  // 复杂报价
  complex: {
    offerId: '',
    reqOfferCategoryId: '',
    count: '',
    // 生产周期
    productionCycle: '',
    fabric: [], // 面料列表
    fabricPrice: '', // 面料成本总和
    accessories: [], // 辅料列表
    accessoriesPrice: '', // 辅料总和
    // 这里开始是其他页的数据
    fee: '', // 加工费
    taxation: '', // 税费
    profit: '', // 利润
    freight: '', // 运费
    specialTechnics: '', // 特殊工艺
    othersPrice: '',
    // 这里 结束
    description: ''
  }
}

const mapState = {
  offer_list: {
    id: 0,
    type: types.GET_OFFER_LIST_SUCCESS
  },
  public_list: {
    id: 1,
    type: types.GET_PUBLIC_LIST_SUCCESS
  },
  not_involved_list: {
    id: -1,
    type: types.GET_INVOLVED_LIST_SUCCESS
  },
  all_list: {
    id: -2,
    type: types.GET_ALL_LIST_SUCCESS
  }
}

const getters = {

}

const GetList = (dispatch, state, length, mutation) => {
  const size = 10;
  dispatch('AJAX', {
    method: 'get',
    url: '/api/offer/list',
    mutation: 'order/' + mutation,
    params: {
      pageNo: Math.floor(length / 10) + 1,
      pageSize: size,
      state: state
    }
  }, {
    root: true
  })
}

const actions = {
  getList({
    dispatch,
    state,
    commit
  }, prop) {
    const target = mapState[prop];
    commit(types.GET_LIST_CHANGE_AJAX_STATE, {
      name: prop + '_ajax',
      state: true
    })
    GetList(dispatch, target.id, state[prop].length, target.type)
  },
  getStatistic({
    dispatch
  }) {
    dispatch('AJAX', {
      method: 'get',
      url: '/api/offer/list/count',
      mutation: 'order/' + types.GET_ORDER_STATISTIC_SUCCESS
    }, {
      root: true
    })
  },
  getDetail({
    dispatch
  }, id) {
    dispatch('AJAX', {
      method: 'get',
      url: '/api/offer/detail',
      params: {
        id
      },
      mutation: 'order/' + types.GET_ORDER_DETAIL_SUCCESS
    }, {
      root: true
    })
  },
  setDetailSizeTable({dispatch}, data) {
    // attach
    dispatch('AJAX', {
      method: 'get',
      url: '/api/offer/upload/size',
      params: {
        sizePic: data.sizePic,
        type: data.type,
        id: data.sp_id
      },
      attach: {
        id: data.sp_id,
        sizePic: data.sizePic
      },
      actions: [
        {
          name: 'reset_toast_message',
          data: '上传成功'
        }
      ],
      mutation: 'order/' + types.SET_ORDER_DETAIL_SIZE_TABLE
    }, {
      root: true
    })
  },
  getSimpleOfferDetail({
    dispatch
  }, params) {
    dispatch('AJAX', {
      method: 'get',
      url: '/api/offer/clothing/detail',
      params: {
        offerId: params.id,
        reqOfferCategoryId: params.c_id
      },
      mutation: 'order/' + types.GET_SIMPLE_OFFER_DETAIL_SUCEESS
    }, {
      root: true
    })
  },
  submitSimpleOffer({
    dispatch
  }, data) {
    dispatch('AJAX', {
      method: 'post',
      url: '/api/offer/demand/saveSpOffer',
      data,
      mutation: 'order/' + types.SUBMIT_SIMPLE_OFFER_PRICE,
      attach: {
        id: data.offerId
      }
    }, {
      root: true
    })
  },
  getComplexOfferDetail({
    dispatch
  }, params) {
    dispatch('AJAX', {
      method: 'get',
      url: '/api/offer/produce/detail',
      params: params,
      mutation: 'order/' + types.GET_COMPLEX_OFFER_SUCCESS
    }, {
      root: true
    })
  },
  saveComplexOffer({dispatch}, data) {
    dispatch('AJAX', {
      method: 'post',
      url: '/api/offer/produce',
      data,
      attach: {
        id: data.offerId
      },
      mutation: 'order/' + types.SAVE_COMPLEX_OFFER
    }, {
      root: true
    })
  }
}

const mutations = {
  [types.GET_OFFER_LIST_SUCCESS](state, result) {
    result.forEach((data) => {
      state.offer_list.push(data);
    })
    state.offer_list_ajax = false;
  },
  [types.GET_PUBLIC_LIST_SUCCESS](state, result) {
    result.forEach((data) => {
      state.public_list.push(data);
    })
    state.public_list_ajax = false;
  },
  [types.GET_INVOLVED_LIST_SUCCESS](state, result) {
    result.forEach((data) => {
      state.not_involved_list.push(data);
    })
    state.not_involved_list_ajax = false;
  },
  [types.GET_ALL_LIST_SUCCESS](state, result) {
    result.forEach((data) => {
      state.all_list.push(data);
    })
    state.all_list_ajax = false;
  },
  // 统计
  [types.GET_ORDER_STATISTIC_SUCCESS](state, result) {
    state.offer_count = String(result.wfd)
    state.public_count = String(result.wfr)
    state.not_involved_count = String(result.wstate)
  },
  // 请求状态改变
  [types.GET_LIST_CHANGE_AJAX_STATE](state, options) {
    state[options.name] = options.state;
  },
  // 获取报价单详情成功
  [types.GET_ORDER_DETAIL_SUCCESS](state, result) {
    state.detail = result;
  },
  // 报价单尺寸图添加
  [types.SET_ORDER_DETAIL_SIZE_TABLE](state, result) {
    // TODO 优化的时候再说吧
    state.detail.categorys.forEach(item => {
      if (item.spRequirementOffer.id === result.id) {
        item.spRequirementOffer.sizePic = result.sizePic
      }
    })
  },
  // 获取简单报价详情
  [types.GET_SIMPLE_OFFER_DETAIL_SUCEESS](state, result) {
    state.simple_offer_detail = result;
  },
  // 提交简单报价
  [types.SUBMIT_SIMPLE_OFFER_PRICE](state, result) {
    router.replace({
      path: '/order/detail',
      query: {
        id: result.id
      }
    })
  },
  // 这里获取复杂报价历史
  [types.GET_COMPLEX_OFFER_SUCCESS](state, result) {
    const c_id = result.spReqOffer.offerCategoryId
    // 计算面料列表
    let total_fabric = 0;
    const fabric_list = result.fabricLst.map(item => {
      total_fabric += item.fabricRate * item.unitPrice;
      return {
        fabricDesc: item.fabricDesc,
        fabricRate: item.fabricRate,
        unitPrice: item.unitPrice,
        reqOfferCategoryId: c_id
      }
    });
    // 计算辅料价格
    let total_accessories = 0;
    const accessories_list = result.accessoriesLst.map(item => {
      total_accessories += item.accessoriesPrice;
      return {
        accessoriesName: item.accessoriesName,
        accessoriesPrice: item.accessoriesPrice,
        reqOfferCategoryId: c_id
      }
    })
    // 计算其他成本
    let other_price = result.surcharge.fee + result.surcharge.profit + result.surcharge.taxation + result.surcharge.freight + (result.surcharge.specialTechnics || 0);
    state.complex = {
      offerId: result.offerId,
      reqOfferCategoryId: result.reqOfferCategoryId,
      count: result.spReqOffer.customizedNum,
      // 生产周期
      productionCycle: result.spReqOffer.productionCycle,
      fabric: fabric_list, // 面料列表
      fabricPrice: total_fabric, // 面料成本总和
      accessories: accessories_list, // 辅料列表
      accessoriesPrice: total_accessories, // 辅料总和
      // 这里开始是其他页的数据
      fee: result.surcharge.fee, // 加工费
      taxation: result.surcharge.taxation, // 税费
      profit: result.surcharge.profit, // 利润
      freight: result.surcharge.freight, // 运费
      specialTechnics: result.surcharge.specialTechnics, // 特殊工艺
      othersPrice: other_price,
      // 这里 结束
      description: result.spReqOffer.description
    }
  },
  [types.SET_COMPLEX_OFFER_FABRIC](state, list) {
    // 计算面料列表
    let total_fabric = 0;
    list.forEach(item => {
      total_fabric += item.fabricRate * item.unitPrice;
    });
    state.complex.fabric = list;
    state.complex.fabricPrice = total_fabric;
  },
  [types.SET_COMPLEX_OFFER_ACCESSORIES](state, list) {
    // 计算辅料列表
    let total = 0;
    list.forEach(item => {
      total += Number(item.accessoriesPrice) || 0;
    });
    state.complex.accessories = list;
    state.complex.accessoriesPrice = total;
  },
  // 设置其他值
  [types.SET_COMPLEX_OFFER_OTHER](state, data) {
    state.complex.fee = +data.fee; // 加工费
    state.complex.taxation = +data.taxation; // 税费
    state.complex.profit = +data.profit; // 利润
    state.complex.freight = +data.freight; // 运费
    state.complex.specialTechnics = +data.specialTechnics || 0; // 特殊工艺
    state.complex.othersPrice = (+data.fee) + +(data.taxation) + (+data.profit) + (+data.freight) + (+data.specialTechnics || 0);
  },
  [types.SAVE_COMPLEX_OFFER](state, result) {
    router.replace({
      path: '/order/detail',
      query: {
        id: result.id
      }
    })
  },
  [types.CLEAR_ALL_LISTS](state) {
    state.offer_list = [];
    state.offer_list_ajax = false;
    state.public_list = [];
    state.public_list_ajax = false;
    state.not_involved_list = [];
    state.not_involved_list_ajax = false;
    state.all_list = [];
    state.all_list_ajax = false;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
