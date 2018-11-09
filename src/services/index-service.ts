import API from '@/config/API-config'
import store from '@/vuex/store'

interface StompClientConfigConfig {
    heartbeat?: {
        outgoing: number
        incoming: number
        [propName: string]: any
    }
    connect: Function
    disconnect: Function
    [propName: string]: any
}
interface MsgConfig {
    body: string
}

interface ResConfig {
    errMsg: string,
    code: number,
    data: any
}

class Sub {
    subs: Array<Function> = []
    addSub(sub) {
        this.subs.push(sub)
    }
    notify() {
        this.subs.forEach((sub) => {
            sub()
        })
    }
}

const sub = new Sub()

class Ws {
    stompClient: StompClientConfigConfig = null
    websocketUrl: string = API.WS_CONFIG.root
    timeSettimeout: number = null
    connectFlag: boolean = false

    constructor() {
        this.connect()
    }

    connect(): void {
        // if (this.stompClient) { return }
        let socket = new window['SockJS'](this.websocketUrl)
        this.stompClient = window['Stomp'].over(socket)
        this.stompClient.heartbeat.outgoing = 10000
        this.stompClient.heartbeat.incoming = 10000
        this.stompClient.connect({}, (frame) => {
            this.connectFlag = true
            console.log('Connected: ' + frame)
            sub.notify()
        }, (error) => {
            this.errorCallBack(error)
        })
    }

    //由于服务断开导致连接失败，客户端自动连接
    errorCallBack(error: any): void {
        //连接失败时，服务器响应的回调方法
        console.log('连接失败【' + error + '】')
        //连接失败后重新连接；设置延迟避免请求过多
        clearTimeout(this.timeSettimeout)
        this.timeSettimeout = setTimeout(() => {
            this.stompClient = null
            this.connectFlag = false
            this.connect()
        }, 5000)

    }
    //主动断开连接
    disconnect(): void {
        this.stompClient != null && this.stompClient.disconnect()
    }

}

class IndexService extends Ws {
    // chainId: string = store.state.common.chainId
    blackSubHandle: any = null
    updateBlackSubHandle: any = null
    transactionSubHandle: any = null
    updateTransactionSubHandle: any = null

    getChainId(): string {
        return store.state.common.chainId
    }
    static dealData(now: Array<object>, old) {
        if (now.length) {
            if (now.length === 10) {
                return now
            } else {
                if (old.length >= 10) { old.shift() }
                return old.concat(now)
            }
        } else {
            if (old.length >= 10) { old.shift() }
            return old.push(now)
        }
    }

    getChartData(): any {
        return new Promise((resolve, reject) => {
            sub.addSub(() => {
                this.stompClient.subscribe(API.WS_CONFIG.nodeInit + this.getChainId(), (msg: MsgConfig) => {
                    const res: ResConfig = JSON.parse(msg.body)
                    const { data, code } = res
                    console.log(`getChartData`, res)
                    if (code === 0) {
                        if (!data.length) { return [] }

                        let list: Array<Array<number>> = []
                        let arr: Array<number> = []

                        data.map(item => {
                            if (item.latitude && item.longitude) {
                                arr = [item.latitude, item.longitude]
                                list = list.concat(arr)
                            }
                        })

                        let newList: any = new Float32Array(list.length)
                        list.map((item, index) => {
                            newList[index] = item
                        })
                        console.log(`getChartData===`,newList)
                        return resolve(newList)
                    } else {
                        throw new Error(`todo`)
                    }
                })
            })
        })
    }

    updateChartData(): any {
        return new Promise((resolve, reject) => {
            sub.addSub(() => {
                this.stompClient.subscribe(API.WS_CONFIG.nodeUpdate + this.getChainId(), (msg: MsgConfig) => {
                    const res: ResConfig = JSON.parse(msg.body)
                    console.log(`updateChartData`, res)
                    if (res.code === 0) {
                        return resolve(res.data)
                    } else {
                        throw new Error(`todo`)
                    }
                })
            })
        })
    }

    getOverviewData(): any {
        return new Promise((resolve, reject) => {
            sub.addSub(() => {
                this.stompClient.subscribe(API.WS_CONFIG.indexInit + this.getChainId(), (msg: MsgConfig) => {
                    const res: ResConfig = JSON.parse(msg.body)
                    console.log(`getOverviewData`, res)
                    if (res.code === 0) {
                        (res.data.node === null) && (res.data.node = ' ')
                        return resolve(res.data)
                    } else {
                        throw new Error(`todo`)
                    }
                })
            })
        })
    }

    updateOverviewData(): any {
        return new Promise((resolve, reject) => {
            sub.addSub(() => {
                this.stompClient.subscribe(API.WS_CONFIG.indexUpdate + this.getChainId(), (msg: MsgConfig) => {
                    const res: ResConfig = JSON.parse(msg.body)
                    console.log(`updateOverviewData`, res)
                    if (res.code === 0) {
                        return resolve(res.data)
                    } else {
                        throw new Error(`todo`)
                    }
                })
            })
        })
    }

    getSecondFloorData(): any {
        return new Promise((resolve, reject) => {
            sub.addSub(() => {
                this.stompClient.subscribe(API.WS_CONFIG.secondInit + this.getChainId(), (msg: MsgConfig) => {
                    const res: ResConfig = JSON.parse(msg.body)
                    console.log(`getSecondFloorData`, res)
                    if (res.code === 0) {
                        return resolve(res.data)
                    } else {
                        throw new Error(`todo`)
                    }
                })
            })
        })
    }

    updateSecondFloorData() {
        return new Promise((resolve, reject) => {
            sub.addSub(() => {
                this.stompClient.subscribe(API.WS_CONFIG.secondUpdate + this.getChainId(), (msg: MsgConfig) => {
                    const res: ResConfig = JSON.parse(msg.body)
                    console.log(`updateSecondFloorData`, res)
                    if (res.code === 0) {
                        return resolve(res.data)
                    } else {
                        throw new Error(`todo`)
                    }

                })
            })
        })

    }

    getBlockData() {
        return new Promise((resolve, reject) => {
            const fn = () => {
                this.blackSubHandle = this.stompClient.subscribe(API.WS_CONFIG.blockInit + this.getChainId(), (msg: MsgConfig) => {
                    const res: ResConfig = JSON.parse(msg.body)
                    console.log(`getBlockData`, res)
                    if (res.code === 0) {
                        return resolve(res.data)
                    } else {
                        throw new Error(`todo`)
                    }

                })
            }
            this.connectFlag ? fn() : sub.addSub(fn)
        })
    }

    updateBlockData(list: Array<any>) {
        return new Promise((resolve, reject) => {
            const fn = () => {
                this.updateBlackSubHandle = this.stompClient.subscribe(API.WS_CONFIG.blockUpdate + this.getChainId(), (msg: MsgConfig) => {
                    const res: ResConfig = JSON.parse(msg.body)
                    //data为对象
                    const { data, code } = res
                    console.log(`updateBlockData`, res)
                    if (code === 0) {
                        return resolve(IndexService.dealData(data, list))
                    } else {
                        throw new Error(`todo`)
                    }
                })
            }

            this.connectFlag ? fn() : sub.addSub(fn)
        })
    }

    getTransactionData() {
        return new Promise((resolve, reject) => {
            const fn = () => {
                this.transactionSubHandle = this.stompClient.subscribe(API.WS_CONFIG.transactionInit + this.getChainId(), (msg: MsgConfig) => {
                    const res: ResConfig = JSON.parse(msg.body)
                    const { data, code } = res
                    console.log(`getTransactionData`, res)
                    if (code === 0) {
                        return resolve(data)
                    } else {
                        throw new Error(`todo`)
                    }

                })
            }
            this.connectFlag ? fn() : sub.addSub(fn)
        })
    }

    updateTransactionData(list: Array<any>) {
        return new Promise((resolve, reject) => {
            const fn = () => {
                this.updateTransactionSubHandle = this.stompClient.subscribe(API.WS_CONFIG.transactionUpdate + this.getChainId(), (msg: MsgConfig) => {
                    const res: ResConfig = JSON.parse(msg.body)
                    //data为数组
                    const { data, code } = res
                    console.log(`updateTransactionData`, res)
                    if (code === 0) {
                        return resolve(IndexService.dealData(data, list))
                    } else {
                        throw new Error(`todo`)
                    }

                })
            }
            this.connectFlag ? fn() : sub.addSub(fn)
        })
    }

    unsubBlock() {
        this.blackSubHandle.unsubscribe()
        this.updateBlackSubHandle.unsubscribe()
    }
    unsubTransaction() {
        this.transactionSubHandle.unsubscribe()
        this.updateTransactionSubHandle.unsubscribe()
    }


}

export default IndexService
