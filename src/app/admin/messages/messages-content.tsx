"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Mail,
  MailOpen,
  Search,
  Loader2,
  Inbox,
  Archive,
  MoreHorizontal,
  Trash2,
  ArchiveRestore,
  CornerUpLeft,
  Copy,
  ExternalLink,
  CheckCircle2,
  Circle,
  ArrowLeft,
  X,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  message: string;
  isRead: boolean;
  isArchived: boolean;
  isReplied: boolean;
  createdAt: string;
}

type FilterType = "all" | "unread" | "read" | "archived";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60_000);
  const diffHours = Math.floor(diffMs / 3_600_000);
  const diffDays = Math.floor(diffMs / 86_400_000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

function formatFullDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

export function MessagesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>(
    (searchParams.get("filter") as FilterType) || "all"
  );
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });

  const fetchMessages = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        filter,
        search,
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      });
      const res = await fetch(`/api/messages?${params}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages);
        setPagination((prev) => ({ ...prev, ...data.pagination }));
      }
    } catch {
      toast({ title: "Error", description: "Failed to fetch messages", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [filter, search, pagination.page, pagination.limit]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    } else if (status === "authenticated") {
      fetchMessages();
    }
  }, [status, router, fetchMessages]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPagination((prev) => ({ ...prev, page: 1 }));
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
    setPagination((prev) => ({ ...prev, page: 1 }));
    setSelectedMessage(null);
  };

  const updateMessageInList = (id: string, updates: Partial<ContactMessage>) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, ...updates } : m)));
    if (selectedMessage?.id === id) {
      setSelectedMessage((prev) => (prev ? { ...prev, ...updates } : null));
    }
  };

  const removeMessageFromList = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }
    setPagination((prev) => ({ ...prev, total: prev.total - 1 }));
  };

  const handleMarkRead = async (id: string, isRead: boolean) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead }),
      });
      if (res.ok) {
        const updated = await res.json();
        updateMessageInList(id, { isRead: updated.isRead });
        toast({ title: "Success", description: `Marked as ${isRead ? "read" : "unread"}` });
      }
    } catch {
      toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
    } finally {
      setActionLoading(null);
    }
  };

  const handleArchive = async (id: string, isArchived: boolean) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isArchived }),
      });
      if (res.ok) {
        if (isArchived) {
          removeMessageFromList(id);
          toast({ title: "Success", description: "Message archived" });
        } else {
          const updated = await res.json();
          updateMessageInList(id, { isArchived: updated.isArchived });
          toast({ title: "Success", description: "Message unarchived" });
        }
      }
    } catch {
      toast({ title: "Error", description: "Failed to archive message", variant: "destructive" });
    } finally {
      setActionLoading(null);
    }
  };

  const handleMarkReplied = async (id: string) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isReplied: true }),
      });
      if (res.ok) {
        const updated = await res.json();
        updateMessageInList(id, { isReplied: updated.isReplied });
        toast({ title: "Success", description: "Marked as replied" });
      }
    } catch {
      toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/messages/${deleteId}`, { method: "DELETE" });
      if (res.ok) {
        removeMessageFromList(deleteId);
        toast({ title: "Success", description: "Message deleted" });
      }
    } catch {
      toast({ title: "Error", description: "Failed to delete message", variant: "destructive" });
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email).then(
      () => toast({ title: "Copied!", description: "Email address copied to clipboard" }),
      () => toast({ title: "Error", description: "Failed to copy email", variant: "destructive" })
    );
  };

  const handleReplyEmail = (email: string) => {
    window.open(`mailto:${email}`, "_blank");
  };

  const handleMessageClick = (message: ContactMessage) => {
    setSelectedMessage(message);
    // Auto mark as read
    if (!message.isRead) {
      handleMarkRead(message.id, true);
    }
  };

  const filterTabs: { key: FilterType; label: string; icon: React.ReactNode }[] = [
    { key: "all", label: "All", icon: <Inbox className="h-3.5 w-3.5" /> },
    { key: "unread", label: "Unread", icon: <Mail className="h-3.5 w-3.5" /> },
    { key: "read", label: "Read", icon: <MailOpen className="h-3.5 w-3.5" /> },
    { key: "archived", label: "Archived", icon: <Archive className="h-3.5 w-3.5" /> },
  ];

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-[#8b4049]" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-poppins)] text-foreground">
            Messages
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage contact form submissions
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          {pagination.total} message{pagination.total !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-border p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Filter Tabs */}
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleFilterChange(tab.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  filter === tab.key
                    ? "bg-white text-[#8b4049] shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or content..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-9 pr-8"
            />
            {searchInput && (
              <button
                onClick={() => { setSearchInput(""); setSearch(""); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Messages Content */}
      <div className="flex gap-6">
        {/* Message List */}
        <div className={`flex-1 ${selectedMessage ? "hidden lg:block" : ""}`}>
          {messages.length === 0 ? (
            <div className="bg-white rounded-xl border border-border p-12 text-center">
              <Inbox className="h-16 w-16 mx-auto text-muted-foreground/40" />
              <h3 className="mt-4 text-lg font-semibold">
                {search ? "No messages found" : filter === "archived" ? "No archived messages" : filter === "unread" ? "No unread messages" : filter === "read" ? "No read messages" : "No messages yet"}
              </h3>
              <p className="text-muted-foreground mt-2">
                {search
                  ? "Try adjusting your search terms."
                  : "Messages from the contact form will appear here."}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-border overflow-hidden divide-y divide-border">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => handleMessageClick(msg)}
                  className={`p-4 cursor-pointer transition-colors hover:bg-muted/50 ${
                    selectedMessage?.id === msg.id ? "bg-[#8b4049]/5 border-l-2 border-l-[#8b4049]" : ""
                  } ${!msg.isRead ? "bg-[#8b4049]/5" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    {/* Unread indicator */}
                    <div className="pt-1.5">
                      {!msg.isRead ? (
                        <Circle className="h-2.5 w-2.5 fill-[#8b4049] text-[#8b4049]" />
                      ) : (
                        <Circle className="h-2.5 w-2.5 text-transparent" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className={`text-sm truncate ${!msg.isRead ? "font-semibold" : "font-medium"}`}>
                            {msg.fullName}
                          </span>
                          <span className="text-xs text-muted-foreground truncate">
                            {msg.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {msg.isReplied && (
                            <Badge className="bg-green-50 text-green-700 border-green-200 text-[10px] h-5">
                              Replied
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {formatDate(msg.createdAt)}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {truncateText(msg.message, 120)}
                      </p>
                    </div>

                    {/* Actions dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 shrink-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {msg.isRead ? (
                          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleMarkRead(msg.id, false); }}>
                            <Mail className="h-4 w-4 mr-2" />
                            Mark as Unread
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleMarkRead(msg.id, true); }}>
                            <MailOpen className="h-4 w-4 mr-2" />
                            Mark as Read
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleCopyEmail(msg.email); }}>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Email
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleReplyEmail(msg.email); }}>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Reply via Email
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleMarkReplied(msg.id); }}>
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Mark as Replied
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleArchive(msg.id, !msg.isArchived); }}>
                          {msg.isArchived ? (
                            <>
                              <ArchiveRestore className="h-4 w-4 mr-2" />
                              Unarchive
                            </>
                          ) : (
                            <>
                              <Archive className="h-4 w-4 mr-2" />
                              Archive
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => { e.stopPropagation(); setDeleteId(msg.id); }}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.page <= 1}
                onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.page >= pagination.totalPages}
                onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
              >
                Next
              </Button>
            </div>
          )}
        </div>

        {/* Message Detail Panel */}
        {selectedMessage && (
          <div className="w-full lg:w-[440px] shrink-0">
            <div className="bg-white rounded-xl border border-border sticky top-24">
              {/* Detail Header */}
              <div className="p-5 border-b border-border">
                <div className="flex items-center justify-between mb-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedMessage(null)}
                    className="lg:hidden"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back
                  </Button>
                  <div className="flex items-center gap-2 ml-auto">
                    {/* Status Badges */}
                    {!selectedMessage.isRead && (
                      <Badge className="bg-[#8b4049]/10 text-[#8b4049] border-[#8b4049]/20 text-[10px]">
                        Unread
                      </Badge>
                    )}
                    {selectedMessage.isRead && !selectedMessage.isArchived && (
                      <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-[10px]">
                        Read
                      </Badge>
                    )}
                    {selectedMessage.isArchived && (
                      <Badge className="bg-gray-100 text-gray-600 border-gray-200 text-[10px]">
                        Archived
                      </Badge>
                    )}
                    {selectedMessage.isReplied && (
                      <Badge className="bg-green-50 text-green-700 border-green-200 text-[10px]">
                        Replied
                      </Badge>
                    )}
                  </div>
                </div>

                <h2 className="text-lg font-semibold">{selectedMessage.fullName}</h2>
                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="text-sm text-[#8b4049] hover:underline"
                >
                  {selectedMessage.email}
                </a>
              </div>

              {/* Detail Body */}
              <div className="p-5 max-h-[400px] overflow-y-auto">
                <div className="text-xs text-muted-foreground mb-3">
                  {formatFullDate(selectedMessage.createdAt)}
                </div>
                <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                  {selectedMessage.message}
                </div>
              </div>

              {/* Detail Actions */}
              <div className="p-5 border-t border-border">
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReplyEmail(selectedMessage.email)}
                    className="flex-1"
                  >
                    <CornerUpLeft className="h-4 w-4 mr-1" />
                    Reply
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyEmail(selectedMessage.email)}
                    title="Copy Email"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  {selectedMessage.isRead ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMarkRead(selectedMessage.id, false)}
                      disabled={actionLoading === selectedMessage.id}
                      title="Mark as Unread"
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMarkRead(selectedMessage.id, true)}
                      disabled={actionLoading === selectedMessage.id}
                      title="Mark as Read"
                    >
                      <MailOpen className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleArchive(selectedMessage.id, !selectedMessage.isArchived)}
                    disabled={actionLoading === selectedMessage.id}
                    title={selectedMessage.isArchived ? "Unarchive" : "Archive"}
                  >
                    {selectedMessage.isArchived ? (
                      <ArchiveRestore className="h-4 w-4" />
                    ) : (
                      <Archive className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeleteId(selectedMessage.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Message</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this message? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
