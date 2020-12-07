/*
 * @Description: 会员中心表格
 * @Author: rk
 * @Date: 2020-11-09 16:12:04
 */
//  页面表格columns
export const pageTableColumns = [
    {
        key: 1,
        title: "序号",
        dataIndex: "member_id",
        align: "center",
        width: "100px",
        scopedSlots: { customRender: "member_id" }
    },
    {
        key: 2,
        title: "商户名称",
        dataIndex: "member_name",
        align: "center",
        width: "160px",
        scopedSlots: { customRender: "member_name" }
    },
    {
        key: 3,
        title: "手机号",
        dataIndex: "telephone",
        align: "center",
        width: "160px",
        scopedSlots: { customRender: "telephone" }
    },
    {
        key: 4,
        title: "商户余额",
        dataIndex: "balance",
        align: "center",
        width: "160px",
        scopedSlots: { customRender: "balance" }
    },
    {
        key: 5,
        title: "项目类型",
        dataIndex: "merchant_type",
        align: "center",
        width: "160px",
        scopedSlots: { customRender: "merchant_type" }
    },
    {
        key: 6,
        title: "消费时间",
        dataIndex: "date",
        align: "center",
        width: "160px",
        scopedSlots: { customRender: "date" }
    },
    {
        key: 7,
        title: "操作",
        dataIndex: "operation",
        align: "center",
        width: "300px",
        scopedSlots: { customRender: "operation" }
    },
]
export default {
    pageTableColumns
};