import { useState, useRef } from "react";

// MUI
import { Popover, TextField, Box } from "@mui/material";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";

function SelectTree({
  placeholder,
  categories,
  subcategories,
  value,
  onChange,
}) {
  // control popover state
  const [anchorEl, setAnchorEl] = useState(null);
  const inputRef = useRef();

  // handle click and close popover
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  // get label from value
  // If value is a subcategory ID, then the corresponding subcategory name is returned
  const getLabel = () => {
    if (!value || !Array.isArray(subcategories)) return "";
    const sub = subcategories.find((sub) => String(sub.id) === String(value));
    return sub?.name || "";
  };

  // handle item selection toggle
  const handleItemSelectionToggle = (event, itemId, isSelected) => {
    if (isSelected && itemId.startsWith("sub-")) {
      const pureId = itemId.replace("sub-", "");
      console.log("✅ 子分類 ID:", pureId);
      onChange(parseInt(pureId));
      handleClose();
    }
  };

  return (
    <>
      <TextField
        placeholder={placeholder}
        value={getLabel()}
        inputRef={inputRef}
        onClick={handleClick}
        fullWidth
        readOnly
        slotProps={{
          input: {
            readOnly: true,
          },
        }}
        sx={{
          "& .MuiInputBase-root": {
            height: "32px", // 控制輸入框總高度
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#f8f7cf", // 邊框色
          },
          "& .MuiInputBase-input": {
            paddingLeft: "8px",
            color: "#f8f7cf", // 實際輸入文字顏色
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#f8f7cf", // hover 邊框色
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#f8f7cf", // ✅ 聚焦時邊框色
          },
          "& .MuiOutlinedInput-root": {
            outlineStyle: "none", // ✅ 去除瀏覽器預設藍框
          },
          "& .MuiOutlinedInput-root.Mui-focused": {
            outlineStyle: "none", // 聚焦時也移除
          },
        }}
      />

      {/* 讓 TreeItem 在 TextField 外展開 */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Box sx={{ maxHeight: 300, minWidth: 250, overflowY: "auto", p: 1 }}>
          <SimpleTreeView
            selectedItems={value ? [`sub-${value}`] : []}
            onItemSelectionToggle={handleItemSelectionToggle}
          >
            {Array.isArray(categories) &&
              categories.map((cat) => (
                <TreeItem
                  key={`cat-${cat.id}`}
                  itemId={`cat-${cat.id}`}
                  label={cat.name}
                >
                  {Array.isArray(subcategories) &&
                    subcategories
                      .filter((sub) => sub.parentId === cat.id)
                      .map((sub) => (
                        <TreeItem
                          key={`sub-${sub.id}`}
                          itemId={`sub-${sub.id}`}
                          label={sub.name}
                        />
                      ))}
                </TreeItem>
              ))}
          </SimpleTreeView>
        </Box>
      </Popover>
    </>
  );
}

export default SelectTree;
