"use client";

import { useState, type FC } from "react";

import type { User } from "firebase/auth";

import SigninWithGoogle from "@app/(public)/signin/_page/SigninWithGoogle";
import {
  BasicButton,
  SelectManyButton,
  SelectOneButton,
} from "@components/Button";
import InputBox from "@components/InputBox";
import InputTable from "@components/InputTable";
import Modal, { useModalState } from "@components/Modal";
import AppTemplate from "@components/Template";

const SigninPage: FC = () => {
  const [key, setKey] = useState<"a" | "b" | "c">("a");
  const [keySet, setKeySet] = useState<Set<"a" | "b" | "c">>(new Set());
  const [value, setValue] = useState<string>("");

  const [tableData, setTableData] = useState<Record<string, string | number>[]>(
    Array.from({ length: 30 }, (_, i) => ({ name: "Alice", age: i }))
  );

  const addRow = () => {
    setTableData([...tableData, {}]);
  };

  const [rawIdxToDelete, setRawIdxToDelete] = useState<number | null>(null);

  const confirmDeleteRaw = useModalState();

  const handleDeleteRow = (idx: number) => {
    confirmDeleteRaw.setIsOpen(true);
    setRawIdxToDelete(idx);
  };

  const deleteRow = () => {
    if (rawIdxToDelete === null) return;
    setTableData(tableData.filter((_, i) => i !== rawIdxToDelete));
    setRawIdxToDelete(null);
    confirmDeleteRaw.setIsOpen(false);
  };

  const setValues = (idx: number, key: string, value: string | number) => {
    const newTableData = [...tableData];
    const raw = newTableData[idx];
    if (raw === undefined) return;
    raw[key] = value;
    setTableData(newTableData);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // const router = useRouter();
  // const [fireUser, setFireUser] = useAtom(fireUserAtom);

  // useEffect(() => {
  //   console.log("fireUser", fireUser);
  //   if (fireUser !== null) {
  //     router.push("/");
  //   }
  // }, [fireUser]);

  return (
    <AppTemplate>
      <div>
        <h1>SigninPage</h1>
        <InputBox
          value={value}
          onChange={(v) => setValue(v)}
          placeholder="テスト"
          classNames="m-2"
        />
        <InputTable
          keys={["name", "age"]}
          keyLabels={null}
          values={tableData}
          setValues={setValues}
          addRow={addRow}
          deleteRow={handleDeleteRow}
          classNames="m-2"
        />
        <BasicButton
          size="md"
          fill
          border
          onClick={() => console.log("Signin")}
          value="Signin"
          classNames="m-2"
        />
        <BasicButton
          size="md"
          fill={false}
          border
          onClick={() => console.log("Signin")}
          value="Signin"
          classNames="m-2"
        />
        <SelectOneButton<"a" | "b" | "c">
          size="md"
          onSelect={(k) => setKey(k)}
          selected={key}
          values={{ a: "A", b: "B", c: "C" }}
          classNames="m-2"
        />
        <SelectManyButton<"a" | "b" | "c">
          size="md"
          onSelect={(k) => {
            if (keySet.has(k)) {
              keySet.delete(k);
            } else {
              keySet.add(k);
            }
            setKeySet(new Set(keySet));
          }}
          selected={keySet}
          values={{ a: "A", b: "B", c: "C" }}
          classNames="m-2"
        />
        <SigninWithGoogle
          setFireUser={(user: User | null) => {
            console.log("user", user);
          }}
        />
        <BasicButton
          size="md"
          fill
          border
          onClick={() => setIsOpen(true)}
          value="Open Modal"
          classNames="m-2"
        />
        <BasicButton
          size="md"
          fill
          border
          onClick={() => setIsConfirmed(true)}
          value="Open Confirm"
          classNames="m-2"
        />
        <Modal
          title="モーダル1"
          size="md"
          isOpen={isOpen}
          type="readonly"
          onClose={() => setIsOpen(false)}
          classNames=""
        >
          <p>モーダル1の中身</p>
        </Modal>
        <Modal
          title="確認"
          size="md"
          isOpen={isConfirmed}
          type="editable"
          onSubmit={() => {
            setIsConfirmed(false);
            console.log("Confirmed");
          }}
          onCancel={() => {
            setIsConfirmed(false);
            console.log("Canceled");
          }}
          onSubmitLabel="OK"
          onCancelLabel="Cancel"
          classNames=""
        >
          <p>本当に実行しますか？</p>
        </Modal>
        <Modal
          title="削除確認"
          size="md"
          isOpen={confirmDeleteRaw.isOpen}
          type="editable"
          onSubmit={() => {
            deleteRow();
          }}
          onCancel={() => {
            confirmDeleteRaw.setIsOpen(false);
          }}
          onSubmitLabel="削除"
          onCancelLabel="キャンセル"
          classNames=""
        >
          <p>本当に削除しますか？</p>
        </Modal>
      </div>
    </AppTemplate>
  );
};

export default SigninPage;
