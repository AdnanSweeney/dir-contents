import folderItemStyles from "./folderItem.module.css";

function ItemSection(props) {

  return (
    <div
      className={[
        folderItemStyles.itemSection,
        folderItemStyles.itemInfo,
        props.classNames,
      ].join(" ")}
    >
      {props.text}
    </div>
  );
}

export default ItemSection;
