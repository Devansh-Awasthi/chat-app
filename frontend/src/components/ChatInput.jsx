import React, { useRef, useState } from "react";
import { useMessageStore } from "../store/useMessageStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
function ChatInput() {
  const [Preview, setPreview] = useState(null);
  const [Text, setText] = useState("");
  const { sendMessage } = useMessageStore();
  const fileRef = useRef(null);
  const handleImageChange = (e) => {
  const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const removeImage = () => {
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };
  const handelSendMessage = async(e) => {
    e.preventDefault();
    if (!Text.trim() && !Preview) return;

    try {
      await sendMessage({
        text: Text.trim(),
        image: Preview,
      });

      // Clear form
      setText("");
      setPreview(null);
      if (fileRef.current) fileRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="w-full p-4 ">
      {
        <div className="flex items-center mb-3">
          <div className="relative">
            <img
              src={Preview || "/avatar.png"}
              className="size-20 rounded-lg object-cover border border-zinc-700"
            ></img>
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 flex items-center justify-center "
              type="button"
            >
              <X className="size-5 bg-base-300 rounded-4xl p-1" />
            </button>
          </div>
        </div>
      }
      <form onSubmit={handelSendMessage} className="flex  items-center ">
        <div className="flex flex-1 gap-2">
      <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={Text}
            onChange={(e) => setText(e.target.value)}
          />
 <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${Preview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>

 <button
          type="submit"
          className="btn btn-sm btn-circle flex items-center justify-center"
          disabled={!Text.trim() && !Preview}
        >
          <Send size={22} />
        </button>
      </form>
      
    </div>
  );
}

export default ChatInput;
