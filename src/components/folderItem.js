import folderItemStyles from "./folderItem.module.css";
import ItemSection from "./itemSection.js";

function FolderItem(props) {

  let fileNameText = props.item["fileName"]
  let fileSizeText = props.item["fileSizeInMegabytes"] + " MB"
  let fileLastModified = new Date(props.item["fileLastModified"]);
  let fileLastModifiedText = fileLastModified.toLocaleString()

  return (
    <div className={folderItemStyles.itemContainer}>

      <ItemSection text={fileNameText} classNames={folderItemStyles.itemName} />
      <ItemSection text={fileSizeText} />
      <ItemSection text={fileLastModifiedText} />

      <div
        className={[
          folderItemStyles.itemSection,
          folderItemStyles.dirButton,
          "divButton",
        ].join(" ")}
        onClick={() => {
          props.handleDirChange(props.path + "/" + props.item["fileName"]);
        }}
        style={{ visibility: props.item["isDirectory"] ? "visible" : "hidden" }}
      >
        OPEN FOLDER
      </div>
    </div>
  );
}

export default FolderItem;
