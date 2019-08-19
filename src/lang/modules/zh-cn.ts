import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
export default {
    menu: { // 菜单
        home: '首页',
        block: '区块',
        transaction: '交易',
        validator: '验证人',
        proposal: '提案',
        comesoon:'敬请期待',
        goole:'Google reCAPTCHA无法获取！'
    },
    search: {
        searchBtn: '查询',
        placeHolder: ' 请输入区块高度/地址/块哈希/交易哈希'
    },
    footer: {
        desc: 'PlatScan是PlatON区块链资源管理与分析平台',
        links: '链接',
        help: '开发帮助',
        wallet: '钱包',
        officialWebsite: 'PlatON官网',
        whitePaper: '白皮书',
        community: '社区'
    },
    common:{
        time:'时间',
        serialnumber:'序号'
    },
    tradeAbout:{
        foundTransactions:'交易',
        showingLast:'(仅显示最新500k记录)',
        transactionUp:'交易',
        morethen:'总共寻获超过',
        tradeDetail:'交易详情',

        status:'状态',
        txhash:'交易哈希',
        timeStamp:'时间戳',
        blockHeight:'区块',
        gasLimit:'燃料限制',
        gasUsed:'燃料消耗',
        gasPrice:'燃料价格',
        rawData:'交易数据',

        sender:'发送方',
        recipient:'接收方',
        amount:'数额',
        transactionFee:'交易手续费',

        restrictedAccount:'锁仓地址',
        restrictedAmount:'锁仓数量',
        restrictedPlan:'锁仓计划',

        delegator:'委托人',
        validator:'验证人',
        delegationAmount:'委托数量',

        proposer:'提案人',
        operatorAddress:'操作地址',
        proposalType:'提案类型',
        proposalID:'提案ID',
        proposalStatus:'状态',
        PIPSN:'PIP编号',
        proposalTitle:'标题',
        proposalEndBlock:'投票结束区块',
        proposalTime:'提案时间',
        vote:'投票',
        version:'声明版本',

        identity:'身份认证ID',
        rewardAddress:'奖励账户',
        website:'官网',
        introduction:'描述',
        stakeAmount:'质押数量',
        returnAmount:'预计到账区块',
        reporter:'举报人',
        reportType:'举报类型',
        reportEvidence:'举报证据',
        reportResult:'举报结果',
        returnBlock:'预计到账区块',
        reportReward:'举报奖励',

        transactions:'交易',
        transactions1:'交易',
        record:'显示最新500k记录',
        hash:'交易哈希值',
        block:'区块',
        age:'块龄',
        from:'发送方',
        to:'接收方',
        toA:'接收地址',
        value:'数额',
        fee:'交易费用(LAT)',
        before:'前',
        txInfo:'交易信息',
        viewLeft:'查看前一个交易',
        viewRight:'查看后一个交易',
        information:'Transaction Information',
        timestamp:'时间戳',
        txHash:'交易hash',
        txReceiptStatus:'状态',
        actualTxCost:'交易费用',
        energonLimit:'能量限制',
        energonUsed:'消耗的能量',
        energonPrice:'能量价格',
        inputData:'发出数据',
        confirmNum:'区块确认',
        success:'成功',
        fail:'失败',
        type:'交易类型',
        voteStaked:'投票质押',
        votefor:'投票给',
        tickets:'票数',
        nodeID:'节点ID',
        reduction:'减持',
        withdraw:'提取',
        tradein:'总共寻获 {count} 交易',
        moretradein:'总共寻获超过> {count} 交易'
    },
    contract:{
        contractDetail:'合约详情',
        contract: '合约',
        overview: '概览',
        balance: '余额',
        others: '其他',
        totxn:'于交易',
        all:'所有',
        contractName: '合约名称',
        transactions: '交易',
        contractCreator: '合约创建信息',
        showingLast: '仅显示最新5k记录',
        delegationsTxns:'委托交易',
        transfers:'转账',
        validatorTxns:'验证人交易',
        governanceTxns:'治理交易',

        addressDetail:'地址详情',
        restricted: '锁仓',
        Address: '地址',
        delegations: '委托',
        staking: '质押',
        inRedemption: '赎回中',

        restrictedBalance: '锁仓余额',
        forDelegations: '锁仓质押\\委托',
        slash: '惩罚数量',
        debt: '欠释放',
        totalRestricted: '总计锁仓',
        released: '已释放',
        epoch: '锁仓周期',
        estimatedTime: '预计时间',
        unlocksNumber:'解锁数量'
    },
    deleget:{
        validators: '已委托验证人',
        lockedDelegate: '已锁定委托',
        unlockedDelegate: '未锁定委托',
        releasedDelegate: '已解锁委托',
        undelegating: '赎回中委托',
        unlocked: '未锁定委托',
        released: '已解锁委托',
        delegationAmount: '委托数量',
        locked: '已锁定委托',
        percentage: '占比',
        delegations: '委托',
        delegators: '委托者',
    },
    blockAbout: {
        morethen: '总共',
        blockH: '区块',
        interval:'间隔',
        blockReward:'出块奖励',
        size:'区块大小',
        producer:'出块节点',
        blockHash:'区块哈希',
        parentHash:'上一区块哈希',
        extraData:'额外数据',
        blockDetail:'区块详情',
        operatorAddress:'操作地址'
    },
    download:{
        info:'下载数据',
        title:'下载当前地址的交易\\投票\\声明记录，在下载之前，请验证您是否是机器人！(请确保当前VPN可用)',
        date:'数据日期',
        placeholder:'选择日期',
        download:'下载',
        placeholder1:'请选择日期',
        robot:'请验证您是否是机器人！',
        googleAPINotAvailable:'Google reCAPTCHA无法获取！',
        downloadTip:'（最多支持下载3万条数据）'
    },
    modalInfo:{
        copysuccess:'已复制',
        copyfail:'复制失败'
    },
    indexInfo:{
        WelcomeToPlatON:'欢迎来到PlatON 区块链浏览器',
        LIVEBLOCKTIME:'实时出块时长',
        LIVEBLOCKTRANSACTIONS:'实时区块交易数',
        LIVEBLOCKHEIGHT:'当前区块高度',
        CIRCULATINGSUPPLY:'流通量',
        LIVETRANSACTIONS:'实时交易笔数',
        CURRNTMAXTPS:'当前/最大交易',
        LIVEADDRESS:'地址数',
        PENDINGTOTAL:'进行中提案/总提案',
        currentValidators:'当前轮验证人',
        viewAll: '查看所有',

        txn:'交易数',
        searchno:'查询无结果！',
    },
    nodeInfo:{
        validator:'验证节点',
        createdat:'创建时间',
        electedRoundValidator:'当选当前轮验证人',
        blocks:'累计出块',
        blockRate:'出块率',
        totalStakePower:'总质押\\权重',
        totalReward:'累计奖励',
        yield:'预计年化收益率',
        stability:'稳定性',
        selfstake:'自有质押',
        nodeInfo:'节点信息',
        producedBlocks:'已出区块',
        validatorActions:'验证人操作',
        lowBlockRate:'低出块率处罚次数',
        twoSignNum:'双签处罚次数',

        nodeID:'节点ID',
        actions:'操作',
        inBlock:'所属区块',
        inTxHash:'所属交易',

        liveStakingInfo:'实时质押信息',
        currentPeriodReward:'本周期奖励',
        nextEpoch:'下个结算周期',
        totalDelegations:'接受委托',
        stakeRate:'质押率',
        stakingReward:'质押奖励',
        nextRewardAdjustment:'下个奖励调整期',
        updateEpoch:'每个结算周期更新一次验证人状态',

        searchValidator:'输入验证人名称查询',
        historicalValidators:'历史验证人',
        rank:'排名',
        validatorName:'验证人',
        delegationsDelegators:'委托数\\委托者',
        producedBlock:'已产生区块数',
        exitTime:'退出时间',
        pendingDelegations:'待提取委托数'
    },
    nodeStatus:{
        1:'活跃中',
        2:'出块中...',
        3:'候选中',
        4:'已退出',
        5:'退出中',
    },
    ...zhLocale
}
