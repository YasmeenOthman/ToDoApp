import "./Attachments.css";

function AttachmentsList() {
  function addNewAttachment() {}
  return (
    <div>
      <div className="attachment-input">
        <input
          onChange={addNewAttachment}
          type="text"
          placeholder="Attach resources ..."
        />
      </div>
      <div>
        <ul>
          <li>attachment1</li>
          <li>attachment2</li>
          <li>attachment3</li>
        </ul>
      </div>
    </div>
  );
}

export default AttachmentsList;
