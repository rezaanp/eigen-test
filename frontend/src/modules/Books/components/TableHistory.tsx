import React from "react";
import type { ColumnsType } from "antd/es/table";
import { dateConverse } from "@/utils/commonFn";
import { Table } from "antd";

//TYPES
interface historyProps {
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  member: {
    memberCode: string;
    name: string;
  };
}

interface TableHistoryProps {
  dataHistory: historyProps[];
}

//COLUMNS
const columnHistory: ColumnsType<historyProps> = [
  {
    title: "Member Code",
    dataIndex: "bookCode",
    key: "bookCode",
    render: (_, record) => <p>{record?.member?.memberCode}</p>,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (_, record) => <p>{record?.member?.name}</p>,
  },
  {
    title: "Borrow Date",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (_, record) => <p>{dateConverse(record?.createdAt)}</p>,
  },
  {
    title: "Return Date",
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (_, record) => (
      <p>{record?.isActive ? "-" : dateConverse(record?.updatedAt)}</p>
    ),
  },
  {
    title: "Status",
    key: "isActive",
    render: (_, record) => <p>{record?.isActive ? "Active" : "Deactive"}</p>,
  },
];

const TableHistory: React.FC<TableHistoryProps> = ({ dataHistory }) => {
  return <Table columns={columnHistory} dataSource={dataHistory} />;
};

export default TableHistory;
