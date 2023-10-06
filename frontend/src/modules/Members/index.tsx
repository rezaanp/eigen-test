import { useCallback, useState } from "react";
import ModalHistory from "./components/ModalHistory";
import TableMembers from "./components/TableMembers";
import TableHistory from "./components/TableHistory";
import { useGetHistoryMember, useGetMembers } from "./hooks";

const Members = () => {
  //LOCAL STATE
  const [memberId, setMemberId] = useState<string>("");
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  //QUERY
  const { data: dataMembers, isLoading } = useGetMembers();
  const { data: dataHistory } = useGetHistoryMember({ memberId });

  //FUNCTIONS
  const handleModalHistory = useCallback((memberId: string) => {
    setMemberId(memberId);
    setModalIsOpen((current) => !current);
  }, []);

  const handleCancel = useCallback(() => {
    setModalIsOpen((current) => !current);
  }, []);

  if (isLoading) return <p>Loading..</p>;
  return (
    <>
      <h2>Members</h2>
      <TableMembers
        handleModalHistory={handleModalHistory}
        dataMembers={dataMembers?.data}
      />

      <ModalHistory modalIsOpen={modalIsOpen} handleCancel={handleCancel}>
        <h3>Total Member Borrowed: {dataHistory?.length}</h3>
        <TableHistory dataHistory={dataHistory} />
      </ModalHistory>
    </>
  );
};

export default Members;
