import API from "@/utils/API";
import { Select } from "antd";
import { useGetBooks, useGetHistoryBooks, useGetMembers } from "./hooks";
import { useCallback, useState } from "react";
import ModalHistory from "./components/ModalHistory";
import ModalConfirm from "./components/ModalConfirm";
import TableBooks from "./components/TableBooks";
import TableHistory from "./components/TableHistory";

const Books = () => {
  //LOCAL STATE
  const [bookId, setBookId] = useState<string>("");
  const [memberId, setMemberId] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [modalHistoryIsOpen, setModalHistoryIsOpen] = useState<boolean>(false);
  const [modalBorrowIsOpen, setModalBorrowIsOpen] = useState<boolean>(false);
  const [modalReturnIsOpen, setModalReturnIsOpen] = useState<boolean>(false);

  //QUERY
  const { data: dataBooks, isLoading, mutate: refetchBooks } = useGetBooks();
  const { data: dataHistory, mutate: refetchHistory } = useGetHistoryBooks({
    bookId,
  });
  const { data: dataMember } = useGetMembers();

  //FUNCTIONS
  const handleModalHistory = useCallback((uuid: string) => {
    setBookId(uuid);
    setErrorMessage("");
    setModalHistoryIsOpen((current) => !current);
  }, []);

  const handleModalBorrow = useCallback((uuid: string) => {
    setBookId(uuid);
    setErrorMessage("");
    setModalBorrowIsOpen((current) => !current);
  }, []);

  const handleModalReturn = useCallback((uuid: string) => {
    setBookId(uuid);
    setErrorMessage("");
    setModalReturnIsOpen((current) => !current);
  }, []);

  const handleCancel = useCallback(() => {
    setModalHistoryIsOpen(false);
    setModalBorrowIsOpen(false);
    setModalReturnIsOpen(false);
  }, []);

  const handleBorrow = useCallback(async () => {
    try {
      if (!memberId) return setErrorMessage("Please Select Member Code");
      const response = await API.post(`book/borrow/${bookId}/${memberId}`);

      if (response.status !== 200) {
        setErrorMessage(response?.data?.message);
      } else {
        refetchBooks();
        refetchHistory();
        setModalBorrowIsOpen(false);
      }
    } catch (error: any) {
      setErrorMessage(error?.response?.data?.message);
    }
  }, [bookId, memberId, refetchBooks, refetchHistory]);

  const handleReturn = useCallback(async () => {
    try {
      if (!memberId) return setErrorMessage("Please Select Member Code");
      const response = await API.post(`book/return/${bookId}/${memberId}`);

      if (response.status !== 200) {
        setErrorMessage(response?.data?.message);
      } else {
        refetchBooks();
        refetchHistory();
        setModalReturnIsOpen(false);
      }
    } catch (error: any) {
      setErrorMessage(error?.response?.data?.message);
    }
  }, [bookId, memberId, refetchBooks, refetchHistory]);

  //RENDER MAIN
  if (isLoading) return <p>Loading..</p>;
  return (
    <>
      <h2>Members</h2>
      <TableBooks
        dataBooks={dataBooks?.data}
        handleModalHistory={handleModalHistory}
        handleModalBorrow={handleModalBorrow}
        handleModalReturn={handleModalReturn}
      />

      <ModalHistory
        modalIsOpen={modalHistoryIsOpen}
        handleCancel={handleCancel}
      >
        <h3>Total Book Borrowed: {dataHistory?.length}</h3>
        <TableHistory dataHistory={dataHistory} />
      </ModalHistory>

      <ModalConfirm
        errorMessage={errorMessage}
        modalIsOpen={modalBorrowIsOpen}
        handleConfirm={handleBorrow}
        handleCancel={handleCancel}
      >
        <h3>Select Member Code Who Will Borrow</h3>
        <Select
          placeholder="Choose Member Code"
          style={{ width: "100%" }}
          onChange={(uuid) => setMemberId(uuid)}
          options={dataMember?.data?.map((data: any) => ({
            label: data?.code,
            value: data?.uuid,
          }))}
        />
      </ModalConfirm>

      <ModalConfirm
        errorMessage={errorMessage}
        modalIsOpen={modalReturnIsOpen}
        handleConfirm={handleReturn}
        handleCancel={handleCancel}
      >
        <h3>Select Member Code Who Has an Active Borrowed</h3>
        <Select
          placeholder="Choose Member Code"
          style={{ width: "100%" }}
          onChange={(uuid) => setMemberId(uuid)}
          options={dataHistory
            ?.filter((data: any) => Boolean(data?.isActive))
            ?.map((data: any) => ({
              label: data?.member?.memberCode,
              value: data?.member?.uuid,
            }))}
        />
      </ModalConfirm>
    </>
  );
};

export default Books;
