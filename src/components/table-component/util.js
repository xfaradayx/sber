import { useState } from "react";

export default () => {
  const [editableCell, setEditableCell] = useState(null);
  const [editableInputVal, setEditableInputVal] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskDataToModal, setTaskDataToModal] = useState({});

  const handleDbClick = (key) => (e) => {
    setEditableCell(key);
  };

  const handleUpdateTask = (taskData, action) => (e) => {
    const { id } = taskData;
    const currInputVal = editableInputVal[id];
    console.log("currInputVal", { ...taskData, start: currInputVal });
    action({ ...taskData, start: currInputVal }, currInputVal);
    setEditableCell(null);
  };

  const handleChange = (taskId) => (e) => {
    setEditableInputVal((prev) => ({
      ...prev,
      [taskId]: e.target.value,
    }));
  };

  const handleClick = (taskData) => (e) => {
    setTaskDataToModal(taskData);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);

  const escapePress = (e) => {
    if (editableCell) e.keyCode === 27 && setEditableCell(null);
  };

  return {
    actions: {
      escapePress,
      handleCloseModal,
      handleClick,
      handleChange,
      handleUpdateTask,
      handleDbClick,
    },
    state: {
      taskDataToModal,
      isModalOpen,
      editableInputVal,
      editableCell,
    },
  };
};
