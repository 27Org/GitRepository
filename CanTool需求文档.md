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


2117218012 李向阳

上位机与CanTool装置之间的信息传送方式为：ASCLL码格式+\r
当信息正确接收后，CanTool装置返回\r，否则返回\BEL。

CanToolApp使用GUI界面对接受和发送的CAN信息进行显示。需要根据CAN信息及信号描述数据库对接收到的数据字符串进行解析，然后得到CAN信息中包含的各种CAN信号值，将此CAN信号值进一步进行计算，还原该信号所代表的物理量的信息，并显示在GUI界面上。要发送的CAN信息也采用同种方式将用户输入的物理值转换为CAN信号，并依据CAN信号描述数据库将属于同一个CANID的信号合成为字符串发送给CanTool装置。

CAN信息中DATA最长为8个字节。每个字节有8bit共64bit信息。这里的DATA是由多个CAN信号是组成的。CAN信号的长度最小是1bit,最长64bit。CAN信号的数值与实际它所代表的物理量的值通过phy=A*x+B来计算。其中phy代表物理量的值，A为1LSB（Least Significant Bit）代表的物理值大小，也称Factor，x是CAN信号的值，B是物理量的偏移量。


CAN信息Message描述数据库
CANmessagel类型为char[32]，固定为BO_
id类型为uint32，样例如下：100	十进制数值100转换为16进制为0x00000064，其中msb=bit31=0表示是CAN标准帧，bit10~bit0是实际的CANID值=0x013
MessageName类型为char[32],字符串最长32字节。
分隔符，固定为：
DLC，类型unsignedchar,范围：0-8，表示此CAN信息的DATA长度为8byte。
NodeNAme，类型为[32]，字符串，最长32字节,发送此信息的Node名。也是ECU名

CAN信息由ID、DLC、DATA构成。
CAN信息中Id:iii ，DLC:L 0x8，Data:DD…DD，则CanToll中接收到信息为tiiiLDDDDDDDDDDODDDDD\r，CanToolApp中要将接收到的信息解析为实际的CAN信号。解析过程中需要使用CAN信息及信号描述数据库。iii:为CAN标准ID的范围0-0x7FF. L:表示数据长度DLC，范围0..8，DD:表示1字节(8bit)16进制数据,DD的数量由L的数值决定。实例如下：
CAN信息：
id:0x123
DLC;0x08,
Data:0x00,0x11,0x12,
0x13,0x14,0x15,
0x16,0x17
CanTool：
t12380011121314151617\r
反过来，从CanToolApp向CAN总线发送信息，此命令发送一个扩展的29位CAN帧。只有控制器在命令“O1 \ r”后处于运行模式，才有效。
实例如下：
CanToolApp：
T1234567F811223344556677880000\r  CanTool：
T1234567F81122334455667788\r
CAN：
ID：1234567F
DLC:8
DATA: 11 22 33 44 55 66 77 88





