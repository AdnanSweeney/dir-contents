import folderItemStyles from "./folderItem.module.css";

function FolderItem(props) {
  console.log("object.entries is");
  console.log(Object.entries(props));
  console.log("props is ");
  console.log(props);
  return (
    <div className={folderItemStyles.itemContainer}>

      <div
        className={[
          folderItemStyles.itemSection,
          folderItemStyles.itemInfo,
          folderItemStyles.itemName,
        ].join(" ")}
      >
        {props.item["fileName"]}
      </div>
      <div
        className={[
          folderItemStyles.itemSection,
          folderItemStyles.itemInfo,
        ].join(" ")}
      >
        {props.item["fileSizeInMegabytes"]} MB
      </div>
      <div
        className={[
          folderItemStyles.itemSection,
          folderItemStyles.itemInfo,
        ].join(" ")}
      >
        {Date(props.item["fileLastModified"])}
      </div>

      <div
        className={[
          folderItemStyles.itemSection,
          folderItemStyles.dirButton,
          "divButton"
        ].join(" ")}
        onClick={() => {
          props.handleDirChange(props.path + "/" + props.item["fileName"]);
        }}
        style={{visibility: props.item["isDirectory"] ? "visible" : "hidden" }}
      >
        OPEN FOLDER
      </div>
    </div>
  );
}

export default FolderItem;
