<template>
  <div class="contract-detail-wrap">
    <div class="content-top-white contract-detail-top content-padding">
      <div class="page-title fontSize34">
        {{ $t('tokens.tokenDetail') }}
      </div>

      <div class="detail-change">
        <div class="detail-copy">
          <span>{{ $t('menu.tokens') }} </span>
          <i>{{ `${detailInfo.name} (${detailInfo.symbol})` | sliceStr(50) }}</i>
        </div>
      </div>
      <el-row class="overview-wrap" type="flex" justify="space-between">
        <el-col :span="11">
          <!-- 概览 -->
          <div class="overview">
            <h3 class="Gilroy-Medium">
              {{ $t('contract.overview') }}
              <span class="token-type-name">{{ $t('tokens.erc721') }}</span>
            </h3>
            <ul>
              <li>
                <label class="Gilroy-Medium">
                  {{ $t('tokens.totalSupply_721') }}&nbsp;
                  <el-tooltip placement="bottom" class="item" effect="dark" :content="$t('tips.totalSupply_721')">
                    <i class="address-icon"></i>
                  </el-tooltip>
                </label>
                <div class="money">{{ detailInfo.totalSupply }}</div>
              </li>
              <li>
                <label class="Gilroy-Medium">{{ $t('tokens.holder') }}</label>
                <div class="money">{{ detailInfo.holder }}</div>
              </li>
              <li>
                <label class="Gilroy-Medium">{{
                  $t('tokens.transfers_721')
                }}</label>
                <div class="money">{{ detailInfo.txCount }}</div>
              </li>
              <!-- 状态 todo -->
              <li>
                <label class="Gilroy-Medium">{{
                  $t('contract.status.name')
                }}</label>
                <div v-if="detailInfo.isContractDestroy" class="red">{{ $t('contract.status.destructed') }}</div>
                <div v-else>{{ $t('contract.status.normal') }}</div>
              </li>
            </ul>
          </div>
        </el-col>
        <div class="overview-gap" style="width: 100px; flex-shrink: 0"></div>
        <!-- 地址其他 -->
        <el-col :span="11">
          <div class="others overview">
            <h3 class="Gilroy-Medium">{{ $t('contract.others') }}</h3>
            <ul>
              <li>
                <label class="Gilroy-Medium">{{ $t('tokens.contract') }}</label>
                <div class="money contract-create-info">
                  <router-link
                    class="normal"
                    :to="getContractUrl(detailInfo.address)"
                  >
                    <!-- {{ detailInfo.address | sliceStr(16) }} -->
                    {{ detailInfo.address }}
                  </router-link>
                  <div class="detail-copy" style="margin-left: 10px">
                    <b
                      class="cursor"
                      :class="{ copy: !isCopy }"
                      v-clipboard:copy="address"
                      v-clipboard:success="onCopy"
                      v-clipboard:error="onError"
                    >
                      <p v-show="isCopy">
                        <i class="el-icon-circle-check-outline"></i
                        ><span>{{ copyText }}</span>
                      </p>
                    </b>
                    <a class="code cursor">
                      <qriously
                        class="qr-code"
                        v-if="address"
                        :value="address"
                        :size="140"
                      />
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <label class="Gilroy-Medium">{{ $t('tokens.website') }}</label>
                <div class="money contract-create-info">
                  <a class="normal" :href="detailInfo.webSite">{{
                    detailInfo.webSite || 'N/A'
                  }}</a>
                </div>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="address-trade gray-content content-padding">
      <div class="tabs">
        <el-button
          size="medium"
          :class="{ active: activeTab == 1 }"
          @click="tabChange(1)"
          >{{ $t('contract.transactions') }}</el-button
        >
        <el-button
          size="medium"
          :class="{ active: activeTab == 2 }"
          @click="tabChange(2)"
          >{{ $t('tokens.holder') }}</el-button
        >
        <el-button
          size="medium"
          :class="{ active: activeTab == 3 }"
          @click="tabChange(3)"
          >{{ $t('tokens.inventory') }}</el-button
        >
      </div>
      <tokens-trade-list
        v-show="activeTab == 1"
        :address="address"
        :tradeCount="detailInfo"
        table-type="erc721"
      ></tokens-trade-list>
      <tokens-holder :address="address" v-show="activeTab == 2"></tokens-holder>
      <tokens-inventory
        v-show="activeTab == 3"
        :address="address"
      ></tokens-inventory>
    </div>
  </div>
</template>
<script>
import apiService from '@/services/API-services';

import tokensTradeList from '@/components/tokens/tokens-trade';
import tokensHolder from '@/components/tokens/tokens-holder';
import tokensInventory from '@/components/tokens/tokens-inventory';
export default {
  name: 'tokens721DetailComponent',
  data() {
    return {
      activeTab: 1,
      // address: '',
      detailInfo: {},
      isCopy: false,
      copyText: '',
    };
  },
  props: ['tokensDetail', 'address'],
  computed: {},
  watch: {},
  components: {
    tokensTradeList,
    tokensHolder,
    tokensInventory,
  },
  methods: {
    //获取地址信息详情
    getDetail() {
      let param = {
        address: this.address,
      };
      apiService.tokens
        .tokenDetail(param)
        .then((res) => {
          let { errMsg, code, data } = res;
          if (code == 0) {
            this.detailInfo = data;
          } else {
            this.$message.error(errMsg);
          }
        })
        .catch((error) => {
          this.$message.error(error);
        });
    },
    tabChange(index) {
      this.activeTab = index;
    },
    onCopy() {
      this.copyText = this.$t('modalInfo.copysuccess');
      this.isCopy = true;
      setTimeout(() => {
        this.isCopy = false;
        this.copyText = '';
      }, 2000);
    },
    onError() {
      this.copyText = this.$t('modalInfo.copyfail');
      this.isCopy = true;
      setTimeout(() => {
        this.isCopy = false;
        this.copyText = '';
      }, 2000);
    },
    goRestricte() {
      this.$router.push({
        path: '/restricting-info',
        query: {
          address: this.address,
        },
      });
    },
  },
  //生命周期函数
  created() {
    // this.address = this.$route.query.address.toLowerCase();
    if (this.tokensDetail) {
      this.detailInfo = this.tokensDetail;
    } else {
      this.getDetail();
    }
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.restricted {
  font-size: 12px;
  color: #999;
  line-height: 16px;
}
.money {
  color: #000;
  &.contract-create-info {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .normal {
      cursor: pointer;
    }
  }
}
.token-type-name {
  padding-left: 12px;
  font-size: 17px;
  color: #999;
}

.contract-detail-top {
  padding-bottom: 30px;
}
@media (max-width: 750px) {
  .overview-wrap {
    flex-direction: column;
    .overview-gap {
      height: 20px;
    }
    .el-col {
      width: 100%;
      .others.overview {
        ul {
          li {
            .money.contract-create-info {
              word-break: break-all;
              margin-left: 20px;
              .detail-copy {
                min-width: 55px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
