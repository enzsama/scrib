"use client";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/lib/auth-client";
import { useEffect, useRef, useState } from "react";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";
import NoteTitle from "./NoteTitle";
const Blocknote = dynamic(() => import("./Blocknote"), {
  ssr: false,
  loading: () => (
    <div className="mx-13">
      <Skeleton className="h-8 w-full" />
    </div>
  ),
});

const Editor = ({ roomId }: { roomId: string }) => {
  const { data, isPending } = useSession();
  const token = data?.session?.token;
  const WS_URL = process.env.NEXT_PUBLIC_WS_URL!;
  const docRef = useRef(new Y.Doc());
  const [provider, setProvider] = useState<WebsocketProvider | null>(null);
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    if (!token) return;
    const wsProvider = new WebsocketProvider(WS_URL, roomId, docRef.current, {
      params: { token },
    });
    wsProvider.once("sync", (isSynced) => {
      if (isSynced) setSynced(isSynced);
    });
    setProvider(wsProvider);
    return () => {
      wsProvider?.destroy();
      docRef.current?.destroy();
    };
  }, [token, roomId]);

  if (isPending || !provider || !synced)
    return <Skeleton className="h-8 w-full" />;
  if (!data || !data.session) return null;

  const userInfo = {
    name: data.user.name,
    email: data.user.email,
  };

  return (
    <>
      <div className="mx-13 flex flex-col justify-center">
        <NoteTitle doc={docRef.current} />
      </div>
      <Blocknote doc={docRef.current} provider={provider} userInfo={userInfo} />
    </>
  );
};

export default Editor;
