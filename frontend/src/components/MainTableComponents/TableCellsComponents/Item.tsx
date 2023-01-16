import { createStyles } from "@mantine/core";
import { useState } from "react";

interface ItemProps {
  itemId: number;
  groupId: number;
  itemName: string;
  onItemRename: (groupId: number, itemId: number, name: string) => void;
}

const useStyle = createStyles((theme) => ({
  itemContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "0 20px",
  },
  itemName: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "text",
    border: "1px solid transparent",
    borderRadius: 5,
    padding: "0 5px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",

    "&:hover": {
      border: `1px solid ${theme.colors.borderColor[0]}`,
    },
  },
  itemNameInput: {
    width: "100%",
    transition: "0.5s",
    outline: "none",
    border: "1px solid",
    borderRadius: 5,
    boxSizing: "border-box",
    height: 12,
    color: "inherit",
    fontSize: "inherit",
    fontFamily: "inherit",
    fontWeight: "inherit",
    borderColor: theme.colors.itemInputBorderColor[0],
    padding: "0 5px",

    "&:focus": {
      width: "100%",
      transition: "0.5s",
      outline: "none",
      border: "1px solid",
      borderRadius: 5,
      minHeight: 30,
      boxSizing: "border-box",
      height: 12,
      borderColor: theme.colors.itemInputBorderColor[0],
    },
  },
}));

export function Item({ itemId, groupId, itemName, onItemRename }: ItemProps) {
  const [selectedItemNameInput, setSelectedItemNameInput] = useState(false);
  const [itemNameInput, setItemNameInput] = useState(itemName);

  const { classes } = useStyle();

  const deselectItemNameInput = () => {
    if (itemNameInput !== itemName) {
      if (itemNameInput.length) {
        onItemRename(groupId, itemId, itemNameInput);
      } else {
        setItemNameInput(itemName);
      }
    }
    setSelectedItemNameInput(false);
  };

  const handleItemNameInputKeyDown = (key: string) => {
    if (key === "Enter") {
      deselectItemNameInput();
    }
  };

  const onSelectItemNameInput = () => {
    setSelectedItemNameInput(true);
  };

  return (
    <div className={classes.itemContainer}>
      {selectedItemNameInput ? (
        <input
          onBlur={deselectItemNameInput}
          type="text"
          autoFocus
          className={classes.itemNameInput}
          value={itemNameInput}
          onKeyDown={(e) => handleItemNameInputKeyDown(e.key)}
          onChange={(e) => setItemNameInput(e.target.value)}
        ></input>
      ) : (
        <span className={classes.itemName} onClick={onSelectItemNameInput}>
          {itemName}
        </span>
      )}
    </div>
  );
}
