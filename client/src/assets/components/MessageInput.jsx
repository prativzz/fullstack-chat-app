import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file?.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 w-full bg-white/90 border-t border-gray-200">
      {/* Image preview section */}
      {imagePreview && (
        <div className="mb-3 flex items-center gap-3">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-xl border border-gray-300 shadow-sm"
            />
            <button
              onClick={removeImage}
              type="button"
              className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow-sm"
            >
              <X className="w-3 h-3 text-gray-500" />
            </button>
          </div>
        </div>
      )}

      {/* Input & buttons */}
      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-2 bg-gray-100 rounded-2xl px-3 py-2 shadow-inner"
      >
        {/* Text input */}
        <input
          type="text"
          className="flex-1 bg-transparent focus:outline-none text-sm placeholder-gray-500"
          placeholder="Message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageChange}
        />

        {/* Image upload button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-1 rounded-full hover:bg-white/60 transition"
        >
          <Image size={18} className="text-blue-500" />
        </button>

        {/* Send button */}
        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="p-1.5 rounded-full bg-blue-500 disabled:bg-gray-300 text-white transition"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
