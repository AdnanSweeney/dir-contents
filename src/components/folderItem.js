import folderItemStyles from "./folderItem.module.css";

function FolderItem(props) {
  console.log("object.entries is");
  console.log(Object.entries(props));
  console.log("props is ");
  console.log(props);
  return (
    <div className={folderItemStyles.itemContainer}>
      <div className={folderItemStyles.itemKeyWrapper}>
        <p> {props.item["fileName"]}</p>
      </div>
      <div className={folderItemStyles.itemInfoWrapper}>
        <p> {props.item["fileSizeInMegabytes"]} MB </p>
        <p> {Date(props.item["fileLastModified"])} </p>
      </div>
    </div>
  );
}

export default FolderItem;
