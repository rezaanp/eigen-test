import React from "react";
import { Table, Button } from "antd";

//TYPES
interface MemberProps {
  uuid: string;
  code: string;
  name: string;
}

interface TableMemberProps {
  handleModalHistory: (uuid: string) => void;
  dataMembers: MemberProps[];
}

//COLUMNS
const columnMembers = (handleModalHistory: (uuid: string) => void) => [
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Action",
    key: "action",
    render: (_: any, record: MemberProps) => (
      <Button onClick={() => handleModalHistory(record?.uuid)}>
        Borrowed History
      </Button>
    ),
  },
];

const TableMembers: React.FC<TableMemberProps> = ({
  handleModalHistory,
  dataMembers,
}) => {
  return (
    <>
      <Table
        columns={columnMembers(handleModalHistory)}
        dataSource={dataMembers}
      />
    </>
  );
};

export default TableMembers;
