import React from "react";
import { Table } from "antd";
import { dateConverse } from "@/utils/commonFn";
import type { ColumnsType } from "antd/es/table";

//TYPES
interface HistoryProps {
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  book: {
    bookCode: string;
    title: string;
  };
}

interface TableMemberProps {
  dataHistory: HistoryProps[];
}

//COLUMNS
const columnHistory: ColumnsType<HistoryProps> = [
  {
    title: "Book Code",
    dataIndex: "bookCode",
    key: "bookCode",
    render: (_, record) => <p>{record?.book?.bookCode}</p>,
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render: (_, record) => <p>{record?.book?.title}</p>,
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

const TableHistory: React.FC<TableMemberProps> = ({ dataHistory }) => {
  return (
    <>
      <Table columns={columnHistory} dataSource={dataHistory} />
    </>
  );
};

export default TableHistory;
