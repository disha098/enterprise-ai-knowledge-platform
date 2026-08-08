import { useEffect, useRef, useState } from "react";
import {
  Bot,
  FileText,
  MessageSquare,
  Paperclip,
  Plus,
  Send,
  Sparkles,
} from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isThinking]);

  const sendMessage = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || isThinking) {
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: trimmedMessage,
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
    ]);

    setMessage("");
    setIsThinking(true);

    // Temporary simulated response.
    // This will be replaced by the real RAG API later.
    setTimeout(() => {
      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content:
          "I found information related to your request in the enterprise knowledge base. Once the RAG backend is connected, this response will be generated directly from your uploaded documents.",
      };

      setMessages((previousMessages) => [
        ...previousMessages,
        assistantMessage,
      ]);

      setIsThinking(false);
    }, 1500);
  };

  const copyResponse = async (
    content: string,
    messageId: number
  ) => {
    try {
      await navigator.clipboard.writeText(content);

      setCopiedMessageId(messageId);

      setTimeout(() => {
        setCopiedMessageId(null);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy response:", error);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const startPrompt = (prompt: string) => {
    setMessage(prompt);
  };

  const startNewChat = () => {
    setMessages([]);
    setMessage("");
    setIsThinking(false);
    setCopiedMessageId(null);
  };

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-120px)] min-h-[620px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* =====================================================
            CHAT HEADER
        ====================================================== */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">

          <div className="flex items-center gap-3">

            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <Bot
                size={21}
                className="text-blue-600"
              />

              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-slate-900">
                  AI Knowledge Assistant
                </h2>

                <span className="rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-medium text-green-700">
                  Online
                </span>
              </div>

              <p className="text-xs text-slate-500">
                Enterprise knowledge assistant
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={startNewChat}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <Plus size={17} />
            New Chat
          </button>

        </div>

        {/* =====================================================
            CHAT CONTENT
        ====================================================== */}
        <div className="flex-1 overflow-y-auto">

          {messages.length === 0 ? (

            /* =================================================
               EMPTY STATE
            ================================================== */
            <div className="flex min-h-full items-center justify-center px-6 py-10">

              <div className="w-full max-w-3xl">

                <div className="text-center">

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
                    <Sparkles
                      size={30}
                      className="text-blue-600"
                    />
                  </div>

                  <h1 className="mt-5 text-2xl font-semibold tracking-tight text-slate-900">
                    How can I help you?
                  </h1>

                  <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
                    Ask questions about your enterprise documents,
                    summarize information, or find specific details
                    from your knowledge base.
                  </p>

                  <div className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-600">
                    <span className="h-2 w-2 rounded-full bg-green-500" />

                    Knowledge base ready

                    <span className="text-slate-400">
                      •
                    </span>

                    <span>
                      0 documents
                    </span>
                  </div>

                </div>

                {/* Suggested Prompts */}
                <div className="mt-10 grid gap-3 sm:grid-cols-3">

                  <button
                    type="button"
                    onClick={() =>
                      startPrompt(
                        "Tell me about this document"
                      )
                    }
                    className="group rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-blue-200 hover:bg-blue-50/40"
                  >
                    <MessageSquare
                      size={19}
                      className="text-blue-600"
                    />

                    <p className="mt-3 text-sm font-medium text-slate-800">
                      Ask about a document
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Find specific information in your knowledge base.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      startPrompt(
                        "Summarize my documents"
                      )
                    }
                    className="group rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-blue-200 hover:bg-blue-50/40"
                  >
                    <FileText
                      size={19}
                      className="text-blue-600"
                    />

                    <p className="mt-3 text-sm font-medium text-slate-800">
                      Summarize content
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Get a concise summary of a document or topic.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      startPrompt(
                        "Find important information"
                      )
                    }
                    className="group rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-blue-200 hover:bg-blue-50/40"
                  >
                    <Sparkles
                      size={19}
                      className="text-blue-600"
                    />

                    <p className="mt-3 text-sm font-medium text-slate-800">
                      Find information
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Search across your enterprise knowledge.
                    </p>
                  </button>

                </div>

              </div>

            </div>

          ) : (

            /* =================================================
               CONVERSATION
            ================================================== */
            <div className="mx-auto w-full max-w-4xl space-y-6 px-6 py-8">

              {messages.map((msg) => (

                <div
                  key={msg.id}
                  className={
                    msg.role === "user"
                      ? "flex justify-end"
                      : "flex items-start gap-3"
                  }
                >

                  {/* ================================
                      USER MESSAGE
                  ================================= */}
                  {msg.role === "user" && (
                    <div className="max-w-[75%]">

                      <div className="mb-1 text-right text-xs font-medium text-slate-400">
                        You
                      </div>

                      <div className="rounded-2xl rounded-br-md bg-blue-600 px-4 py-3 text-sm leading-6 text-white shadow-sm">
                        {msg.content}
                      </div>

                    </div>
                  )}

                  {/* ================================
                      AI MESSAGE
                  ================================= */}
                  {msg.role === "assistant" && (
                    <>
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                        <Bot
                          size={18}
                          className="text-blue-600"
                        />
                      </div>

                      <div className="max-w-[80%]">

                        <div className="mb-1 text-xs font-medium text-slate-400">
                          AI Assistant
                        </div>

                        <div className="rounded-2xl rounded-tl-md border border-slate-200 bg-slate-50 px-4 py-3">
                          <p className="text-sm leading-6 text-slate-700">
                            {msg.content}
                          </p>
                        </div>

                        <div className="mt-2">
                          <button
                            type="button"
                            onClick={() =>
                              copyResponse(
                                msg.content,
                                msg.id
                              )
                            }
                            className="rounded-lg px-2.5 py-1.5 text-xs text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                          >
                            {copiedMessageId === msg.id
                              ? "Copied"
                              : "Copy"}
                          </button>
                        </div>

                      </div>
                    </>
                  )}

                </div>

              ))}

              {/* =================================================
                  THINKING INDICATOR
              ================================================== */}
              {isThinking && (
                <div className="flex items-start gap-3">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                    <Bot
                      size={18}
                      className="text-blue-600"
                    />
                  </div>

                  <div>

                    <div className="mb-1 text-xs font-medium text-slate-400">
                      AI Assistant
                    </div>

                    <div className="flex items-center gap-1 rounded-2xl rounded-tl-md border border-slate-200 bg-slate-50 px-4 py-3">

                      <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />

                      <span
                        className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                        style={{
                          animationDelay: "150ms",
                        }}
                      />

                      <span
                        className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                        style={{
                          animationDelay: "300ms",
                        }}
                      />

                      <span className="ml-2 text-sm text-slate-500">
                        Thinking...
                      </span>

                    </div>

                  </div>

                </div>
              )}

              <div ref={messagesEndRef} />

            </div>
          )}

        </div>

        {/* =====================================================
            MESSAGE COMPOSER
        ====================================================== */}
        <div className="border-t border-slate-200 bg-white px-5 py-4">

          <div className="mx-auto max-w-4xl">

            <div className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2 transition focus-within:border-blue-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">

              <button
                type="button"
                className="mb-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                aria-label="Attach document"
              >
                <Paperclip size={19} />
              </button>

              <textarea
                value={message}
                onChange={(event) =>
                  setMessage(event.target.value)
                }
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Ask anything about your knowledge base..."
                className="max-h-32 min-h-[42px] flex-1 resize-none bg-transparent px-2 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />

              <button
                type="button"
                onClick={sendMessage}
                disabled={!message.trim() || isThinking}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>

            </div>

            <div className="mt-2 flex items-center justify-between px-1">

              <p className="text-[11px] text-slate-400">
                AI responses are generated from your enterprise knowledge base.
              </p>

              <p className="hidden text-[11px] text-slate-400 sm:block">
                Enter to send • Shift + Enter for new line
              </p>

            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}