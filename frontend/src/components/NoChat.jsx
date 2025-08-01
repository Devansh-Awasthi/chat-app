import { MessageSquare } from "lucide-react";
import React from "react";

function NoChat() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-2 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center gap-4 mb-4">
          <div
            className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce"
          >
            <MessageSquare className="w-8 h-8 text-primary " />
          </div>
        </div>
        <h2 className="text-2xl font-bold">Welcome to Chatty!</h2>
        <p className="text-base-content/60">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
}

export default NoChat;
