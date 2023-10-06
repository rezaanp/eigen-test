import React from "react";
import { Table, Button, Space } from "antd";

//TYPES
interface BookProps {
  uuid: string;
  code: string;
  title: string;
  author: string;
  stock: number;
}

interface TableBookProps {
  dataBooks: BookProps[];
  handleModalHistory: (uuid: string) => void;
  handleModalBorrow: (uuid: string) => void;
  handleModalReturn: (uuid: string) => void;
}

//COLUMNS
const columnMembers = (
  handleModalHistory: (uuid: string) => void,
  handleModalBorrow: (uuid: string) => void,
  handleModalReturn: (uuid: string) => void
) => [
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Author",
    dataIndex: "author",
    key: "author",
  },
  {
    title: "Stock",
    dataIndex: "stock",
    key: "stock",
  },
  {
    title: "Action",
    key: "action",
    render: (_: any, record: BookProps) => (
      <Space size="middle">
        <Button onClick={() => handleModalHistory(record?.uuid)}>
          Borrowed History
        </Button>
        <Button type="primary" onClick={() => handleModalBorrow(record?.uuid)}>
          Borrow
        </Button>
        <Button danger onClick={() => handleModalReturn(record?.uuid)}>
          Return
        </Button>
      </Space>
    ),
  },
];

const TableBooks: React.FC<TableBookProps> = ({
  handleModalHistory,
  handleModalBorrow,
  handleModalReturn,
  dataBooks,
}) => {
  return (
    <Table
      columns={columnMembers(
        handleModalHistory,
        handleModalBorrow,
        handleModalReturn
      )}
      dataSource={dataBooks}
    />
  );
};

export default TableBooks;
