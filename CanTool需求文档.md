CanTool需求文档

2117218005 高毅

Canbus 中有CAN
Cantool: 负责canbus中can信息的 收集 和发送
Cantoolapp: 用于pc和cantool进行通信, 并完成can信息,信号的显示和设定

CAN message 由CAN id，dlc，data构成
Can Signal是分布在CANmessage中的CAN信号。具有一定物理意义。
Little endian / Big Endian:数据在存储空间中保存的方式。

如果 CanTool装置与上位机连接异常，CanToolApp应该检出异常并提醒信息.
使用蓝牙方式的RFCOMM连接时，应提供蓝牙配对功能
主要功能函数需要有单元测试验证，需要有测试用例及测试结果
多用户使用
源代码的评论不得少于总代码行的1/4

WebAPI系统必须防止任何未经授权的人员更改任何数据
Web API系统，只允许注册商更改任何信息。